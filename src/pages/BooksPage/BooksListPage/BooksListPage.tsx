import BooksTable from "components/BooksTable/BooksTable";
import { StyledButton } from "components/BooksTable/BooksTableStyles";
import { IAuthor, IBook, IGenre, IPublisher } from "interfaces/IBook";
import IBooksTableData from "interfaces/IBooksTableData";
import Multiselect from "multiselect-react-dropdown";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { tableSearchMultiple } from "utils/TableSearchMultiple";
import { Paginize } from "utils/Paginize";
import { PaginationButton, SearchContainer, SearchInput, SearchSelect } from "./BooksListPageStyles";
import { fetchAllBooks, listBookSelector, deleteBook, fetchAllGenres } from "./BooksListSlice";
import DeleteModal from "./DeleteModal";
import DetailsModal from "./DetailsModal";

export default function BooksListPage() {
    const dispatch = useDispatch();
    const { error, loading, loadingDelete, books, genres } = useSelector(listBookSelector);
    const navigate = useNavigate();
    const [paginizedData, setPaginizedData] = useState<Array<any>>([]);

    const [details, setDetails] = useState<IBook>();
    const [showModal, setShowModal] = useState<boolean>(false);

    const [deleteId, setDeleteId] = useState<string>("");
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

    const [searchString, setSearchString] = useState<string>("");
    const [searchColumn, setSearchColumn] = useState<string>("");
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
    const [available, setAvailable] = useState<string>("yes");

    useEffect(() => {
        dispatch(fetchAllBooks());
        dispatch(fetchAllGenres());
    }, []);

    useEffect(() => {
        dispatch(fetchAllBooks());
    }, [loadingDelete]);

    useEffect(() => {
        const tableData = convertDataToTable();
        setPaginizedData(tableData);
        //setPaginizedData(Paginize(tableData, 10));
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
                available: book.available,
                description: book.description,
                issueHistory: book.issueHistory,
            };
        });

        return tableData;
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
        if (text.toLocaleLowerCase() === "yes") return true;
        if (text.toLocaleLowerCase() === "no") return false;
        return false;
    }

    function handleSearch(clear: boolean = false) {
        const tableData = convertDataToTable();
        if (clear) {
            setSearchColumn("");
            setSearchString("");
            setPaginizedData(tableData);
            return;
        }
        console.log("selected", selectedGenres);

        let filteredData = tableData.filter((row) => {
            switch (searchColumn) {
                case "isbn":
                    return row.isbn.match(new RegExp(searchString, "i"));
                case "title":
                    return row.title.match(new RegExp(searchString, "i"));
                case "author":
                    console.log("author", row.author.match(new RegExp(searchString, "i")));
                    return row.author.match(new RegExp(searchString, "i"));
                case "genre":
                    return tableSearchMultiple(row.genre, selectedGenres);
                case "available":
                    return row.available === availableToBoolean(available);
                case "description":
                    return row.description.match(new RegExp(searchString, "i"));
                case "":
                    return tableData;
                default:
                    return tableData;
            }
        });

        //console.log({ filteredData, searchString, searchColumn });

        setPaginizedData(filteredData);
    }

    function handleDelete(id: string) {
        dispatch(deleteBook(id));
        toast.success("Pomyślnie usunięto książkę");
        setShowDeleteModal(false);
    }

    function inputType(s: string) {
        if (s === "genre") {
            return (
                <Multiselect
                    options={genres}
                    isObject={false}
                    showArrow
                    selectionLimit={5}
                    placeholder="Wybierz"
                    customCloseIcon={<span style={{ paddingLeft: "4px", cursor: "pointer" }}>&#10005;</span>}
                    style={{
                        chips: {
                            background: "#ff9e0d",
                            color: "black",
                            margin: 0,
                            marginRight: "5px",
                        },
                    }}
                    onSelect={(selectedList: any) => setSelectedGenres(selectedList)}
                    onRemove={(selectedList: any) => setSelectedGenres(selectedList)}
                />
            );
        }
        if (s === "available") {
            return (
                <SearchSelect required value={available} onChange={(e) => setAvailable(e.currentTarget.value)}>
                    <option value="yes">TAK</option>
                    <option value="no">NIE</option>
                </SearchSelect>
            );
        }
        return (
            <SearchInput
                type="text"
                placeholder="Szukana fraza"
                value={searchString}
                onChange={(e) => setSearchString(e.currentTarget.value)}
                required
            />
        );
    }

    return (
        <div style={{ width: "1200px" }}>
            <SearchContainer>
                <StyledButton onClick={() => navigate("/books")} style={{ marginRight: "auto" }}>
                    Powrót
                </StyledButton>
                {inputType(searchColumn)}

                <SearchSelect required value={searchColumn} onChange={(e) => setSearchColumn(e.currentTarget.value)}>
                    <option value="">- Wybierz kategorię -</option>
                    <option value="isbn">ISBN</option>
                    <option value="title">Tytuł</option>
                    <option value="author">Autor</option>
                    <option value="genre">Gatunek</option>
                    <option value="available">Dostępne?</option>
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
            ) : paginizedData ? (
                <div>
                    <BooksTable
                        tableData={paginizedData}
                        detailsFn={detailsModal}
                        deleteFn={deleteModal}
                        editFn={editRedirect}
                    />
                </div>
            ) : (
                <div>Brak danych</div>
            )}
        </div>
    );
}
