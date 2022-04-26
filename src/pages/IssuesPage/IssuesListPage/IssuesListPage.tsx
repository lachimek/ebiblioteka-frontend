import React, { useEffect, useState } from "react";
import { SearchContainer, SearchInput, SearchSelect } from "pages/BooksPage/BooksListPage/BooksListPageStyles";
import { StyledButton } from "components/BooksTable/BooksTableStyles";
import { useNavigate } from "react-router-dom";
import IssuesTable from "components/IssuesTable/IssuesTable";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllIssues, listIssueSelector } from "./IssueListSlice";
import toast from "react-hot-toast";
import Multiselect from "multiselect-react-dropdown";
import { addMemberSelector, fetchGroups } from "pages/MembersPage/MembersAddPage/MembersAddSlice";
import IssueReturnModal from "./IssueReturnModal";
import IIssuesTableData from "interfaces/IIssuesTableData";

const IssuesListPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { error, loading, issues } = useSelector(listIssueSelector);
    const { groups } = useSelector(addMemberSelector);

    const [tableData, setTableData] = useState<Array<any>>([]);

    const [searchColumn, setSearchColumn] = useState<string>("");
    const [searchString, setSearchString] = useState<string>("");
    const [searchGroups, setSearchGroups] = useState<string[]>([]);

    const [issue, setIssue] = useState<IIssuesTableData>();
    const [showModal, setShowModal] = useState<boolean>(false);

    useEffect(() => {
        dispatch(fetchAllIssues());
        dispatch(fetchGroups());
    }, [dispatch]);

    useEffect(() => {
        if (error === "Invalid token") {
            toast.error("Błędny token sesji.");
            navigate("/issues");
        }
    }, [error, navigate]);

    function returnIssue(id: string) {
        setIssue(issues.find((issue) => issue.id === id));
        setShowModal(true);
    }

    const formatTableData = () => {
        const tableDataWithLp = issues.map((issue, i) => {
            return {
                lp: i + 1,
                id: issue.id,
                member: `${issue.member.firstName} ${issue.member.lastName}`,
                phone: issue.member.phone,
                groupName: issue.member.groupName,
                issueDate: issue.issueDate.split("T")[0],
                returnDate: issue.returnDate ? issue.returnDate.split("T")[0] : "brak",
                expectedReturnDate: issue.expectedReturnDate.split("T")[0] || "",
                status: issue.status,
                bookId: issue.book.id,
                isbn: issue.book.isbn,
                bookTitle: issue.book.title,
            };
        });
        setTableData(tableDataWithLp);
    };

    useEffect(() => {
        formatTableData();
    }, [issues]);

    useEffect(() => {
        if (searchColumn === "findIssueByBookId") {
            handleSearch();
            setSearchColumn("");
            setSearchString("");
        }
    }, [searchColumn]);

    function handleSearch(clear: boolean = false) {
        if (clear) {
            setSearchColumn("");
            setSearchString("");
            formatTableData();
            return;
        }

        let filteredData = tableData.filter((row) => {
            switch (searchColumn) {
                case "name":
                    return row.member.toLowerCase().includes(searchString.toLowerCase());
                case "group":
                    return searchGroups.includes(row.groupName);
                case "good":
                    return row.status === "good";
                case "near":
                    return row.status === "near";
                case "returned":
                    return row.status === "returned";
                case "overdue":
                    return row.status === "overdue";
                case "findIssueByBookId":
                    return row.bookId === searchString;
                case "":
                    return tableData;
                default:
                    return tableData;
            }
        });
        //"good" | "near" | "returned" | "overdue"
        //console.log({ filteredData, searchString, searchColumn });

        setTableData(filteredData);
    }

    function inputType(s: string) {
        if (s === "group") {
            const filteredGroups = groups.filter((g) => g.label !== "brak");
            return (
                <Multiselect
                    options={filteredGroups.map((groups) => groups.label)}
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
                    onSelect={(selectedList: any) => setSearchGroups(selectedList)}
                    onRemove={(selectedList: any) => setSearchGroups(selectedList)}
                />
            );
        }
        if (["good", "near", "returned", "overdue"].includes(s)) {
            return null;
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

    const findIssueByBookId = () => {
        const id = prompt("Prosze podać id książki (emulator skanera)");
        if (id) {
            setSearchString(id);
            setSearchColumn("findIssueByBookId");
        }
    };

    return (
        <div style={{ width: "1300px" }}>
            <SearchContainer>
                <StyledButton onClick={() => navigate("/issues")} style={{ marginRight: "auto" }}>
                    Powrót
                </StyledButton>

                {inputType(searchColumn)}

                <SearchSelect value={searchColumn} onChange={(e) => setSearchColumn(e.currentTarget.value)} required>
                    <option value="">- Wybierz kategorię -</option>
                    <option value="name">Imię i nazwisko</option>
                    <option value="group">Klasa</option>
                    <option value="good">Dalekie przedawnieniu</option>
                    <option value="near">Bliskie przedawnieniu</option>
                    <option value="overdue">Przedawnione</option>
                    <option value="returned">Zwrócone</option>
                </SearchSelect>
                <StyledButton onClick={() => handleSearch()}>Szukaj</StyledButton>
                <StyledButton onClick={() => handleSearch(true)} style={{ marginLeft: "8px" }}>
                    Wyczyść
                </StyledButton>
                <StyledButton onClick={() => findIssueByBookId()} style={{ marginLeft: "8px" }}>
                    Skanuj kod książki
                </StyledButton>
            </SearchContainer>
            <IssueReturnModal
                issue={issue}
                showModal={showModal}
                setShowModal={setShowModal}
                reloadTable={() => dispatch(fetchAllIssues())}
            />
            {loading ? (
                <div>Loading...</div>
            ) : tableData ? (
                <div>
                    <IssuesTable tableData={tableData} returnFn={returnIssue} />
                </div>
            ) : (
                <div>Brak danych</div>
            )}
        </div>
    );
};

export default IssuesListPage;
