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
    width: 300px;
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
    align-items: center;
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

export const ModalButton = styled.button`
    display: flex;
    justify-content: center;
    background-color: #ff9e0d;
    border: 0;
    border-radius: 3px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.25);
    cursor: pointer;
    font-weight: 600;

    margin-bottom: 10px;

    padding: 8px 16px;

    transition: ease-in-out, background-color 0.1s;

    &:hover {
        background-color: #ff9e0dcf;
    }

    &:active {
        box-shadow: inset 0px 0px 8px 1px rgba(66, 68, 90, 0.3), 0px 4px 6px rgba(0, 0, 0, 0.25);
    }
`;

function DetailsModal({
    id,
    showDeleteModal,
    setShowDeleteModal,
    handleDelete,
}: {
    id: string;
    showDeleteModal: boolean;
    setShowDeleteModal: Function;
    handleDelete: Function;
}) {
    return showDeleteModal && id ? (
        <ModalBlur onClick={() => setShowDeleteModal(false)}>
            <ModalContainer onClick={(e) => e.stopPropagation()}>
                <ModalHeader>
                    <span>Usuwanie książki</span>
                    <span
                        onClick={() => setShowDeleteModal(false)}
                        style={{ float: "right", fontSize: "32px", cursor: "pointer" }}
                    >
                        &times;
                    </span>
                </ModalHeader>
                <ModalContent>
                    <div>
                        <span>Potwierdź usunięcie książki</span>
                    </div>
                    <div style={{ width: "100%", display: "flex", justifyContent: "space-evenly" }}>
                        <ModalButton onClick={() => handleDelete(id)}>TAK</ModalButton>
                        <ModalButton onClick={() => setShowDeleteModal(false)}>NIE</ModalButton>
                    </div>
                </ModalContent>
            </ModalContainer>
        </ModalBlur>
    ) : null;
}

export default DetailsModal;
