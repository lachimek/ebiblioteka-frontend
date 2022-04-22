import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunkListIssue } from "store";
import { api, API_ROUTES } from "api";
import { AxiosError } from "axios";
import IIssuesTableData from "interfaces/IIssuesTableData";

export interface IListIssueState {
    issues: IIssuesTableData[];
    loading: boolean;
    loadingDelete: boolean;
    error: string | null;
}

const initialState: IListIssueState = {
    issues: [],
    loading: false,
    loadingDelete: false,
    error: null,
};

const listIssueSlice = createSlice({
    name: "listIssues",
    initialState,
    reducers: {
        setLoading: (state, { payload }: PayloadAction<boolean>) => {
            state.loading = payload;
        },

        setLoadingDelete: (state, { payload }: PayloadAction<boolean>) => {
            state.loadingDelete = payload;
        },

        setIssues: (state, { payload }: PayloadAction<IIssuesTableData[]>) => {
            state.issues = payload;
            state.error = null;
        },

        setError: (state, { payload }: PayloadAction<string>) => {
            state.error = payload;
        },
    },
});

export const fetchAllIssues = (): AppThunkListIssue => {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const {
                data: { issues },
            } = await api.get(API_ROUTES.GET_ISSUE_ALL);
            dispatch(setIssues(issues));
            dispatch(setLoading(false));
        } catch (err: Error | AxiosError | any) {
            //console.clear();
            console.log(err);
            dispatch(setError(err.response.data.error));
            dispatch(setLoading(false));
        }
    };
};

export const { setLoading, setLoadingDelete, setError, setIssues } = listIssueSlice.actions;

export const listIssueSelector = (state: { listIssueStore: IListIssueState }) => state.listIssueStore;

export default listIssueSlice.reducer;
