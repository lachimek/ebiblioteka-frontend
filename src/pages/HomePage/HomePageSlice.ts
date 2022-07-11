import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunkAddIssue, AppThunkHomePage } from "store";
import { api, API_ROUTES } from "api";

interface Book {
    id: string;
    title: string;
    isbn: string;
    available: boolean;
}

interface Member {
    id: string;
    firstName: string;
    lastName: string;
    groupName: string;
    phone: string;
}

interface IssuesInfo {
    id: string;
    issueDate: string;
    returnDate: string;
    expectedReturnDate: string;
    overdue: boolean;
    book: Book;
    member: Member;
}

interface Reservations {
    id: string;
    reservationDate: string;
    book: Book & { returnDate: string | null };
    member: Member;
}

export interface IHomePageState {
    issues: IssuesInfo[] | null;
    reservations: Reservations[] | null;
    loading: boolean;
    error: string | null;
}

const initialState: IHomePageState = {
    issues: null,
    reservations: null,
    loading: false,
    error: "",
};

const homePageSlice = createSlice({
    name: "homePage",
    initialState,
    reducers: {
        setLoading: (state, { payload }: PayloadAction<boolean>) => {
            state.loading = payload;
        },

        setIssues: (state, { payload }: PayloadAction<IssuesInfo[]>) => {
            state.issues = payload;
        },

        setReservations: (state, { payload }: PayloadAction<Reservations[]>) => {
            state.reservations = payload;
        },

        setError: (state, { payload }: PayloadAction<string>) => {
            state.error = payload;
        },

        resetState: (state) => initialState,
    },
});

export const fetchIssuesAndReservations = (): AppThunkHomePage => {
    return async (dispatch) => {
        dispatch(setLoading(true));
        dispatch(setError(""));
        try {
            const issues = await api.get(API_ROUTES.GET_ISSUE_OVERDUES);
            const reservations = await api.get(API_ROUTES.GET_RESERVATION_ALL);
            console.log("issues:", issues.data.issues);
            console.log("reservations:", reservations.data.reservations);
            dispatch(setIssues(issues.data.issues));
            dispatch(setReservations(reservations.data.reservations));
            dispatch(setLoading(false));
        } catch (err: Error | any) {
            console.error(err);
            dispatch(setError("Error fetching issues and reservations: " + err.message));
            dispatch(setLoading(false));
        }
    };
};

export const { setLoading, setError, setIssues, setReservations, resetState } = homePageSlice.actions;

export const homePageSelector = (state: { homePageStore: IHomePageState }) => state.homePageStore;

export default homePageSlice.reducer;
