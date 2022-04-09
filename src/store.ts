import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import loginReducer, { ILoginState } from "./pages/LoginPage/LoginSlice";
import addBookReducer, { IAddBookState } from "./pages/BooksPage/BooksAddPage/BooksAddSlice";
import listBookReducer, { IListBookState } from "./pages/BooksPage/BooksListPage/BooksListSlice";
import listMemberReducer, { IListMemberState } from "pages/MembersPage/MembersListPage/MemberListSlice";
import addMemberReducer, { IAddMemberState } from "pages/MembersPage/MembersAddPage/MembersAddSlice";
import addIssueReducer, { IAddIssueState } from "pages/IssuesPage/IssuesAddPage/IssuesAddSlice";

export const store = configureStore({
    reducer: {
        loginStore: loginReducer,
        addBookStore: addBookReducer,
        listBookStore: listBookReducer,
        listMemberStore: listMemberReducer,
        addMemberStore: addMemberReducer,
        addIssueStore: addIssueReducer,
    },
    devTools: true,
});

export type StoreType = typeof store;

export type AppThunk = ThunkAction<void, ILoginState, unknown, Action<string>>;

export type AppThunkAddBook = ThunkAction<void, IAddBookState, unknown, Action<string>>;
export type AppThunkListBook = ThunkAction<void, IListBookState, unknown, Action<string>>;

export type AppThunkAddMember = ThunkAction<void, IAddMemberState, unknown, Action<string>>;
export type AppThunkListMembers = ThunkAction<void, IListMemberState, unknown, Action<string>>;

export type AppThunkAddIssue = ThunkAction<void, IAddIssueState, unknown, Action<string>>;
