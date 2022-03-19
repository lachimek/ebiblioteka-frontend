import { IAuthor, IBook, IGenre, ILanguage, IPublisher } from "interfaces/IBook";
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

const Row = styled.div``;

function DetailsModal({
    details,
    showModal,
    setShowModal,
}: {
    details: IBook | null;
    showModal: boolean;
    setShowModal: Function;
}) {
    return showModal && details ? (
        <ModalBlur onClick={() => setShowModal(false)}>
            <ModalContainer onClick={(e) => e.stopPropagation()}>
                <ModalHeader>
                    <span>Szczegóły książki</span>
                    <span
                        onClick={() => setShowModal(false)}
                        style={{ float: "right", fontSize: "32px", cursor: "pointer" }}
                    >
                        &times;
                    </span>
                </ModalHeader>
                <ModalContent>
                    <div>
                        <span>ISBN: </span>
                        <span
                            onClick={() => {
                                navigator.clipboard.writeText(details.isbn);
                                toast.success("Skopiowano ISBN do schowka");
                            }}
                            style={{ cursor: "pointer" }}
                        >
                            {details.isbn} 📋
                        </span>
                    </div>
                    <div>
                        <span>Tytuł: </span>
                        <span>{details.title}</span>
                    </div>
                    <div>
                        <span>Autor: </span>
                        <span>{(details.author as IAuthor).name}</span>
                    </div>
                    <div>
                        <span>Wydawnictwo: </span>
                        <span>{(details.publisher as IPublisher).name}</span>
                    </div>
                    <div>
                        <span>Data wydania: </span>
                        <span>{details.publicationDate.split("T")[0]}</span>
                    </div>
                    <div>
                        <span>Język: </span>
                        <span>{(details.language as ILanguage).language}</span>
                    </div>
                    <div>
                        <span>Gatunki: </span>
                        <span>{details.genres.map((g) => (g as IGenre).name + " ")}</span>
                    </div>
                    <div>
                        <span>Opis: </span>
                        <span style={{ maxWidth: "70%", textAlign: "justify" }}>{details.description}</span>
                    </div>
                </ModalContent>
            </ModalContainer>
        </ModalBlur>
    ) : null;
}

export default DetailsModal;
