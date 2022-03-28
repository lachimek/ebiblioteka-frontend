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

function MembersListPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { error, loading, members } = useSelector(listMemberSelector);

    const [details, setDetails] = useState<IMember>();
    const [showModal, setShowModal] = useState<boolean>(false);

    const [paginizedData, setPaginizedData] = useState<Array<any>>([]);

    useEffect(() => {
        dispatch(fetchAllMembers());
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

    return (
        <div style={{ width: "1200px" }}>
            <SearchContainer>
                <StyledButton onClick={() => navigate("/members")} style={{ marginRight: "auto" }}>
                    Powrót
                </StyledButton>

                <SearchInput type="text" placeholder="Szukana fraza" required />

                <SearchSelect required>
                    <option value="">- Wybierz kategorię -</option>
                    <option value="name">Imię i nazwisko</option>
                    <option value="klasa">Klasa</option>
                </SearchSelect>
                <StyledButton>Szukaj</StyledButton>
                <StyledButton style={{ marginLeft: "8px" }}>Wyczyść</StyledButton>
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
