import IMember from "interfaces/IMember";
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

function MemberDetailsModal({
    details,
    showModal,
    setShowModal,
}: {
    details: IMember | null;
    showModal: boolean;
    setShowModal: Function;
}) {
    return showModal && details ? (
        <ModalBlur onClick={() => setShowModal(false)}>
            <ModalContainer onClick={(e: any) => e.stopPropagation()}>
                <ModalHeader>
                    <span>Szczegóły ucznia</span>
                    <span
                        onClick={() => setShowModal(false)}
                        style={{ float: "right", fontSize: "32px", cursor: "pointer" }}
                    >
                        &times;
                    </span>
                </ModalHeader>
                <ModalContent>
                    <div>
                        <span>Imię i nazwisko:</span>
                        <span>
                            {details.firstName} {details.lastName}
                        </span>
                    </div>
                    <div>
                        <span>Klasa:</span>
                        <span>{details.groupName}</span>
                    </div>
                    <div>
                        <span>Ilość wypożyczonych książek:</span>
                        <span>{details.issuanceCount}</span>
                    </div>
                    <div>
                        <span>Email:</span>
                        <span>{details.email}</span>
                    </div>
                    <div>
                        <span>Telefon:</span>
                        <span>{details.phone}</span>
                    </div>
                    <div>
                        <span>Miasto:</span>
                        <span>
                            {details.city} {details.postalCode}
                        </span>
                    </div>
                    <div>
                        <span>Ulica i Nr. domu:</span>
                        <span>{details.streetAddress}</span>
                    </div>
                </ModalContent>
            </ModalContainer>
        </ModalBlur>
    ) : null;
}

export default MemberDetailsModal;
