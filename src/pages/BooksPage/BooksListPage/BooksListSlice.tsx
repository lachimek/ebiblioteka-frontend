import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunkListBook } from "store";
import { api, API_ROUTES } from "api";
import { AxiosError } from "axios";
import { IBook } from "interfaces/IBook";

export interface IListBookState {
    books: IBook[];
    loading: boolean;
    loadingDelete: boolean;
    error: string | null;
}

const initialState: IListBookState = {
    books: [],
    loading: false,
    loadingDelete: false,
    error: null,
};

const listBookSlice = createSlice({
    name: "listBook",
    initialState,
    reducers: {
        setLoading: (state, { payload }: PayloadAction<boolean>) => {
            state.loading = payload;
        },

        setLoadingDelete: (state, { payload }: PayloadAction<boolean>) => {
            state.loadingDelete = payload;
        },

        setBooks: (state, { payload }: PayloadAction<IBook[]>) => {
            state.books = payload;
            state.error = null;
        },

        setError: (state, { payload }: PayloadAction<string>) => {
            state.error = payload;
        },
    },
});

export const fetchAllBooks = (): AppThunkListBook => {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const {
                data: { books },
            } = await api.get(API_ROUTES.GET_BOOK_ALL);
            dispatch(setBooks(books));
            dispatch(setLoading(false));
        } catch (err: Error | AxiosError | any) {
            console.clear();
            console.log(err.response.data);
            dispatch(setError(err.response.data.error));
            dispatch(setLoading(false));
        }
    };
};

export const deleteBook = (id: string): AppThunkListBook => {
    return async (dispatch) => {
        dispatch(setLoadingDelete(true));
        try {
            await api.delete(API_ROUTES.DELETE_BOOK, {
                data: { id: id },
            });
            dispatch(setLoadingDelete(false));
        } catch (err: Error | AxiosError | any) {
            console.clear();
            console.log(err.response.data);
            dispatch(setError(err.response.data.error));
            dispatch(setLoadingDelete(false));
        }
    };
};

export const { setLoading, setLoadingDelete, setError, setBooks } = listBookSlice.actions;

export const listBookSelector = (state: { listBookStore: IListBookState }) => state.listBookStore;

export default listBookSlice.reducer;
