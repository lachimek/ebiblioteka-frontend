import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import loginReducer, { ILoginState } from "./pages/LoginPage/LoginSlice";
import addBookReducer, { IAddBookState } from "./pages/BooksPage/BooksAddPage/BooksAddSlice";
import listBookReducer, { IListBookState } from "./pages/BooksPage/BooksListPage/BooksListSlice";

export const store = configureStore({
    reducer: {
        loginStore: loginReducer,
        addBookStore: addBookReducer,
        listBookStore: listBookReducer,
    },
    devTools: true,
});

export type StoreType = typeof store;

export type AppThunk = ThunkAction<void, ILoginState, unknown, Action<string>>;
export type AppThunkAddBook = ThunkAction<void, IAddBookState, unknown, Action<string>>;
export type AppThunkListBook = ThunkAction<void, IListBookState, unknown, Action<string>>;
