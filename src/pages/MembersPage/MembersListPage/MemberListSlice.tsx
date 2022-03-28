import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunkListMembers } from "store";
import { api, API_ROUTES } from "api";
import { AxiosError } from "axios";
import IMember from "interfaces/IMember";

export interface IListMemberState {
    members: IMember[];
    loading: boolean;
    loadingDelete: boolean;
    error: string | null;
}

const initialState: IListMemberState = {
    members: [],
    loading: false,
    loadingDelete: false,
    error: null,
};

const listMemberSlice = createSlice({
    name: "listMembers",
    initialState,
    reducers: {
        setLoading: (state, { payload }: PayloadAction<boolean>) => {
            state.loading = payload;
        },

        setLoadingDelete: (state, { payload }: PayloadAction<boolean>) => {
            state.loadingDelete = payload;
        },

        setMembers: (state, { payload }: PayloadAction<IMember[]>) => {
            state.members = payload;
            state.error = null;
        },

        setError: (state, { payload }: PayloadAction<string>) => {
            state.error = payload;
        },
    },
});

export const fetchAllMembers = (): AppThunkListMembers => {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const {
                data: { students },
            } = await api.get(API_ROUTES.GET_STUDENT_ALL);
            dispatch(setMembers(students));
            dispatch(setLoading(false));
        } catch (err: Error | AxiosError | any) {
            console.clear();
            console.log(err);
            dispatch(setError(err.response.data.error));
            dispatch(setLoading(false));
        }
    };
};

export const { setLoading, setLoadingDelete, setError, setMembers } = listMemberSlice.actions;

export const listMemberSelector = (state: { listMemberStore: IListMemberState }) => state.listMemberStore;

export default listMemberSlice.reducer;
