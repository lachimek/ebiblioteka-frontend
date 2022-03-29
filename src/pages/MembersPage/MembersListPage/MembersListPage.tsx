import { StyledButton } from "components/BooksTable/BooksTableStyles";
import MembersTable from "components/MembersTable/MembersTable";
import IMember from "interfaces/IMember";
import { SearchContainer, SearchInput, SearchSelect } from "pages/BooksPage/BooksListPage/BooksListPageStyles";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MemberDetailsModal from "./MemberDetailsModal";
import { fetchAllMembers, listMemberSelector } from "./MemberListSlice";
import { fetchGroups, addMemberSelector } from "../MembersAddPage/MembersAddSlice";
import Multiselect from "multiselect-react-dropdown";

function MembersListPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { error, loading, members } = useSelector(listMemberSelector);
    const { groups } = useSelector(addMemberSelector);

    const [details, setDetails] = useState<IMember>();
    const [showModal, setShowModal] = useState<boolean>(false);

    const [paginizedData, setPaginizedData] = useState<Array<any>>([]);

    const [searchColumn, setSearchColumn] = useState<string>("");
    const [searchString, setSearchString] = useState<string>("");
    const [searchGroups, setSearchGroups] = useState<string[]>([]);

    useEffect(() => {
        dispatch(fetchAllMembers());
        dispatch(fetchGroups());
    }, [dispatch]);

    useEffect(() => {
        if (error === "Invalid token") {
            toast.error("Błędny token sesji.");
            navigate("/members");
        }
    }, [error, navigate]);

    useEffect(() => {
        const tableDataWithLp = members.map((item, i) => {
            return { lp: i + 1, ...item };
        });
        setPaginizedData(tableDataWithLp);
    }, [members]);

    function detailsModal(id: string) {
        setDetails(members.filter((member) => member.id === id)[0]);
        setShowModal(true);
    }

    function editRedirect(id: string) {
        navigate("/members/edit/" + id);
    }

    function handleSearch(clear: boolean = false) {
        const tableDataWithLp = members.map((item, i) => {
            return { lp: i + 1, ...item };
        });
        if (clear) {
            setSearchColumn("");
            setSearchString("");
            setPaginizedData(tableDataWithLp);
            return;
        }

        let filteredData = tableDataWithLp.filter((row) => {
            switch (searchColumn) {
                case "name":
                    return (row.firstName.toLowerCase() + " " + row.lastName.toLowerCase()).includes(
                        searchString.toLowerCase()
                    );
                case "group":
                    return searchGroups.includes(row.groupName);
                case "":
                    return tableDataWithLp;
                default:
                    return tableDataWithLp;
            }
        });

        //console.log({ filteredData, searchString, searchColumn });

        setPaginizedData(filteredData);
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
                <StyledButton onClick={() => navigate("/members")} style={{ marginRight: "auto" }}>
                    Powrót
                </StyledButton>

                {inputType(searchColumn)}

                <SearchSelect value={searchColumn} onChange={(e) => setSearchColumn(e.currentTarget.value)} required>
                    <option value="">- Wybierz kategorię -</option>
                    <option value="name">Imię i nazwisko</option>
                    <option value="group">Klasa</option>
                </SearchSelect>
                <StyledButton onClick={() => handleSearch()}>Szukaj</StyledButton>
                <StyledButton onClick={() => handleSearch(true)} style={{ marginLeft: "8px" }}>
                    Wyczyść
                </StyledButton>
            </SearchContainer>
            <MemberDetailsModal details={details || null} showModal={showModal} setShowModal={setShowModal} />
            {loading ? (
                <div>Loading...</div>
            ) : paginizedData ? (
                <div>
                    <MembersTable tableData={paginizedData} detailsFn={detailsModal} editFn={editRedirect} />
                </div>
            ) : (
                <div>Brak danych</div>
            )}
        </div>
    );
}

export default MembersListPage;
