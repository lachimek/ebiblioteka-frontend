import axios from "axios";
import { StoreType } from "store";

let store: StoreType;
export const injectStore = (_store: StoreType) => {
    store = _store;
};

export const api = axios.create({
    baseURL: "http://localhost:3001/api",
    withCredentials: true,
});

api.interceptors.request.use((config) => {
    config!.headers!.authorization = `Bearer ${store.getState().loginStore.token}`;
    return config;
});

export enum API_ROUTES {
    //books routes
    ADD_BOOK = "/v1/book/add",
    GET_BOOK_ALL = "/v1/book/all",
    GET_BOOK_ONE = "/v1/book",
    DELETE_BOOK = "/v1/book/delete",

    //lang routes
    ADD_LANG = "/v1/lang/add",
    GET_LANG_ONE = "/v1/lang",
    GET_LANG_ALL = "/v1/lang/all",

    //author routes
    ADD_AUTHOR = "/v1/author/add",
    GET_AUTHOR_ONE = "/v1/author",
    GET_AUTHOR_ALL = "/v1/author/all",

    //publisher routes
    ADD_PUBLISHER = "/v1/publisher/add",
    GET_PUBLISHER_ONE = "/v1/publisher",
    GET_PUBLISHER_ALL = "/v1/publisher/all",

    //genre routes
    ADD_GENRE = "/v1/genre/add",
    GET_GENRE_ONE = "/v1/genre",
    GET_GENRE_ALL = "/v1/genre/all",

    //group routes
    ADD_GROUP = "/v1/group/add",
    GET_GROUP_ONE = "/v1/group",
    GET_GROUP_ALL = "/v1/group/all",

    //user routes
    GET_STUDENT_ALL = "/v1/user/member/all",
    GET_STUDENT_ONE = "/v1/user/member",
    REGISTER_USER = "/v1/auth/register",

    //issue routes
    ADD_ISSUE = "/v1/issue/add",
    GET_ISSUE_ONE = "/v1/issue",
    GET_ISSUE_ALL = "/v1/issue/all",

    //stats routes
    GET_BOOKS_PAGE_STATS = "/v1/stats/books",
    GET_MEMBERS_PAGE_STATS = "/v1/stats/members",
}
