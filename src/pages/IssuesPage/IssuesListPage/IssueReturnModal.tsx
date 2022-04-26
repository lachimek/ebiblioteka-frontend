import { api, API_ROUTES } from "api";
import IIssuesTableData from "interfaces/IIssuesTableData";
import toast from "react-hot-toast";
import styled from "styled-components";

const ModalBlur = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.4);
    z-index: 100;
`;

const ModalContainer = styled.div`
    position: fixed; /* Stay in place */
    z-index: 500; /* Sit on top */
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #f9f9f9;
    width: 600px;
    max-width: 100%;
    padding: 10px 20px 20px 20px;

    box-shadow: 8px 8px 24px 0px rgba(66, 68, 90, 1);
    border-radius: 10px;

    /* let it scroll */
    overflow: auto;
`;

const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 24px;
`;

const ModalContent = styled.div`
    display: flex;
    flex-direction: column;
    padding-top: 20px;
    div {
        padding-top: 10px;

        span:nth-child(even) {
            float: right;
        }
        span:nth-child(odd) {
            float: left;
        }
    }
`;

const ModalButtonsContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
    margin-top: 30px;
`;

const ModalButton = styled.button<{ danger?: boolean }>`
    border: none;
    color: white;
    padding: 1em 2em;
    background-color: ${(props) => (props.danger ? "#c70505" : "#0f920f")};
    text-align: center;
    text-decoration: none;
    display: inline-block;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    border-radius: 5px;

    &:hover {
        background-color: ${(props) => (props.danger ? "#c70505df" : "#0f920fdf")};
    }
`;

const handleReturn = async (issueId: string, callback: Function) => {
    const {
        data: { issue },
    } = await api.post(API_ROUTES.RETURN_ISSUE, {
        issueId: issueId,
    });
    if (!issue.id) toast.error("Błąd przy zatwierdzaniu zwrotu");
    else {
        toast.success("Zwrot zatwierdzony");
        callback();
    }
};

function IssueReturnModal({
    issue,
    showModal,
    setShowModal,
    reloadTable,
}: {
    issue: IIssuesTableData | undefined;
    showModal: boolean;
    setShowModal: Function;
    reloadTable: Function;
}) {
    return showModal && issue ? (
        <ModalBlur onClick={() => setShowModal(false)}>
            <ModalContainer onClick={(e: any) => e.stopPropagation()}>
                <ModalHeader>
                    <span>Czy chcesz zatwierdzić ten zwrot?</span>
                    <span
                        onClick={() => setShowModal(false)}
                        style={{ float: "right", fontSize: "32px", cursor: "pointer" }}
                    >
                        &times;
                    </span>
                </ModalHeader>
                <ModalContent>
                    <div>
                        <span>Uczeń:</span>
                        <span>
                            {issue.member.firstName} {issue.member.lastName} | {issue.member.groupName}
                        </span>
                    </div>
                    <div>
                        <span>Książka:</span>
                        <span>
                            {issue.book.title} | {issue.book.isbn}
                        </span>
                    </div>
                    <div>
                        <span>Wypożyczenie:</span>
                        <span>
                            {issue.issueDate.split("T")[0]} --- {issue.expectedReturnDate.split("T")[0]}
                        </span>
                    </div>
                    <ModalButtonsContainer>
                        <ModalButton type="button" danger onClick={() => setShowModal(false)}>
                            NIE
                        </ModalButton>
                        <ModalButton
                            type="button"
                            onClick={() => {
                                handleReturn(issue.id, reloadTable);
                                setShowModal(false);
                            }}
                        >
                            TAK
                        </ModalButton>
                    </ModalButtonsContainer>
                </ModalContent>
            </ModalContainer>
        </ModalBlur>
    ) : null;
}

export default IssueReturnModal;
