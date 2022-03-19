import BooksTable from "components/BooksTable/BooksTable";
import { StyledButton } from "components/BooksTable/BooksTableStyles";
import { IAuthor, IBook, IGenre, IPublisher } from "interfaces/IBook";
import IBooksTableData from "interfaces/IBooksTableData";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Paginize } from "utils/Paginize";
import { PaginationButton, SearchContainer, SearchInput, SearchSelect } from "./BooksListPageStyles";
import { fetchAllBooks, listBookSelector, deleteBook } from "./BooksListSlice";
import DeleteModal from "./DeleteModal";
import DetailsModal from "./DetailsModal";

export default function BooksListPage() {
    const dispatch = useDispatch();
    const { error, loading, loadingDelete, books } = useSelector(listBookSelector);
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [paginizedData, setPaginizedData] = useState<Array<any>>([]);

    const [details, setDetails] = useState<IBook>();
    const [showModal, setShowModal] = useState<boolean>(false);

    const [deleteId, setDeleteId] = useState<string>("");
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

    const [searchString, setSearchString] = useState<string>("");
    const [searchColumn, setSearchColumn] = useState<string>("");

    useEffect(() => {
        dispatch(fetchAllBooks());
    }, []);

    useEffect(() => {
        dispatch(fetchAllBooks());
    }, [loadingDelete]);

    useEffect(() => {
        const tableData = convertDataToTable();
        setPaginizedData(Paginize(tableData, 10));
    }, [books]);

    useEffect(() => {
        if (error === "Invalid token") {
            toast.error("Błędny token sesji.");
            navigate("/books");
        }
    }, [error]);

    function convertDataToTable() {
        let tableData: IBooksTableData[] = books.map((book, index) => {
            let curGenres = (book.genres as IGenre[]).map((genre) => {
                return genre.name + " ";
            });
            return {
                id: book.id!,
                lp: index + 1,
                title: book.title,
                author: (book.author as IAuthor).name,
                genre: curGenres,
                isbn: book.isbn,
                available: true,
                description: book.description,
            };
        });

        return tableData;
    }

    function nextPage() {
        if (currentPage + 1 <= paginizedData.length - 1) setCurrentPage(currentPage + 1);
    }

    function prevPage() {
        if (currentPage - 1 >= 0) setCurrentPage(currentPage - 1);
    }

    function detailsModal(id: string) {
        setDetails(books.filter((book) => book.id === id)[0]);
        setShowModal(true);
    }

    function deleteModal(id: string) {
        setDeleteId(id);
        setShowDeleteModal(true);
    }

    function editRedirect(isbn: string) {
        navigate("/books/edit/" + isbn);
    }

    function availableToBoolean(text: string): boolean {
        if (text.toLocaleLowerCase() === "tak") return true;
        else if (text.toLocaleLowerCase() === "false") return true;
        else return false;
    }

    function handleSearch(clear: boolean = false) {
        const tableData = convertDataToTable();
        if (clear) {
            setSearchColumn("");
            setSearchString("");
            setPaginizedData(Paginize(tableData, 10));
            return;
        }

        let filteredData = tableData.filter((row) => {
            switch (searchColumn) {
                case "isbn":
                    return row.isbn.match(new RegExp(searchString, "i"));
                case "title":
                    return row.title.match(new RegExp(searchString, "i"));
                case "author":
                    return row.author.match(new RegExp(searchString, "i"));
                case "genre":
                    return row.genre.join(" ").match(new RegExp(searchString, "i"));
                case "available":
                    return row.available === availableToBoolean(searchString);
                case "description":
                    return row.description.match(new RegExp(searchString, "i"));
                case "":
                    return tableData;
                default:
                    return tableData;
            }
        });

        console.log({ filteredData, searchString, searchColumn });

        setCurrentPage(0);
        setPaginizedData(Paginize(filteredData, 10));
    }

    function handleDelete(id: string) {
        dispatch(deleteBook(id));
        toast.success("Pomyślnie usunięto książkę");
        setShowDeleteModal(false);
    }

    return (
        <div style={{ width: "1200px" }}>
            <SearchContainer>
                <StyledButton onClick={() => navigate("/books")} style={{ marginRight: "auto" }}>
                    Powrót
                </StyledButton>
                <SearchInput
                    type="text"
                    placeholder="Szukana fraza"
                    value={searchString}
                    onChange={(e) => setSearchString(e.currentTarget.value)}
                    required
                />
                <SearchSelect required value={searchColumn} onChange={(e) => setSearchColumn(e.currentTarget.value)}>
                    <option value="">- Wybierz kategorię -</option>
                    <option value="isbn">ISBN</option>
                    <option value="title">Tytuł</option>
                    <option value="author">Autor</option>
                    <option value="genre">Gatunek</option>
                    <option value="available">Dostępne (tak/nie)</option>
                    <option value="description">Opis</option>
                </SearchSelect>
                <StyledButton onClick={() => handleSearch()}>Szukaj</StyledButton>
                <StyledButton onClick={() => handleSearch(true)} style={{ marginLeft: "8px" }}>
                    Wyczyść
                </StyledButton>
            </SearchContainer>
            <DetailsModal details={details || null} showModal={showModal} setShowModal={setShowModal} />
            <DeleteModal
                id={deleteId}
                showDeleteModal={showDeleteModal}
                setShowDeleteModal={setShowDeleteModal}
                handleDelete={handleDelete}
            />
            {loading ? (
                <div>Loading...</div>
            ) : paginizedData[currentPage] ? (
                <div>
                    <BooksTable
                        tableData={paginizedData[currentPage]}
                        detailsFn={detailsModal}
                        deleteFn={deleteModal}
                        editFn={editRedirect}
                    />
                </div>
            ) : (
                <div>Brak danych</div>
            )}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "10px" }}>
                <PaginationButton type="button" onClick={prevPage} disabled={currentPage === 0}>
                    &lt;
                </PaginationButton>
                <span>
                    Strona {currentPage + 1} z {paginizedData.length}
                </span>
                <PaginationButton type="button" onClick={nextPage} disabled={currentPage === paginizedData.length - 1}>
                    &gt;
                </PaginationButton>
            </div>
        </div>
    );
}
