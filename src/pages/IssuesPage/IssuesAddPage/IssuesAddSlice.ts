import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunkAddIssue } from "store";
import { api, API_ROUTES } from "api";
import { AxiosError } from "axios";
import IIssuesFormData from "interfaces/IIssuesFormData";

export interface IAddIssueState {
    issueId: string;
    loading: boolean;
    error: string | null;
}

const initialState: IAddIssueState = {
    issueId: "",
    loading: false,
    error: null,
};

const addIssueSlice = createSlice({
    name: "addIssue",
    initialState,
    reducers: {
        setLoading: (state, { payload }: PayloadAction<boolean>) => {
            state.loading = payload;
        },

        setIssueId: (state, { payload }: PayloadAction<string>) => {
            state.issueId = payload;
            state.error = null;
        },

        setError: (state, { payload }: PayloadAction<string>) => {
            state.error = payload;
        },

        resetState: (state) => initialState,
    },
});

export const addIssue = (issueData: IIssuesFormData): AppThunkAddIssue => {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const { data } = await api.post(`${API_ROUTES.ADD_ISSUE}`, {
                bookId: issueData.bookId,
                userId: issueData.memberId,
                issueDate: issueData.issueStart,
                expectedReturnDate: issueData.issueEnd,
            });
            dispatch(setIssueId(data.issue.id));
            dispatch(setLoading(false));
            console.log(data);
        } catch (err: Error | AxiosError | any) {
            console.log(err);
            dispatch(setError("Issue not added"));
            dispatch(setLoading(false));
        }
    };
};

export const { setLoading, setError, setIssueId, resetState } = addIssueSlice.actions;

export const addIssueSelector = (state: { addIssueStore: IAddIssueState }) => state.addIssueStore;

export default addIssueSlice.reducer;
