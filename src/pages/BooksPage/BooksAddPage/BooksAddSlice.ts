import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, AppThunkAddBook } from "store";
import { api, API_ROUTES } from "api";
import { AxiosError } from "axios";
import { IAuthor, IBook, IGenre, ILanguage, IPublisher } from "interfaces/IBook";
import { IAddBookProps } from "./BooksAddForm";

export interface IAddBookState {
    bookId?: string;
    authors: IAuthor[];
    publishers: IPublisher[];
    languages: ILanguage[];
    genres: IGenre[];
    book: IAddBookProps | null;
    loading: boolean;
    error: string | null;
    errorISBN: string | null;
}

const initialState: IAddBookState = {
    bookId: "",
    authors: [],
    publishers: [],
    languages: [],
    genres: [],
    book: null,
    loading: false,
    error: null,
    errorISBN: null,
};

const addBookSlice = createSlice({
    name: "addBook",
    initialState,
    reducers: {
        setLoading: (state, { payload }: PayloadAction<boolean>) => {
            state.loading = payload;
        },

        setBookId: (state, { payload }: PayloadAction<string>) => {
            state.bookId = payload;
            state.error = null;
            state.errorISBN = null;
            state.book = null;
        },

        setBook: (state, { payload }: PayloadAction<IAddBookProps>) => {
            state.book = payload;
            state.error = null;
        },

        setError: (state, { payload }: PayloadAction<string>) => {
            state.error = payload;
        },

        setErrorISBN: (state, { payload }: PayloadAction<string>) => {
            state.errorISBN = payload;
            state.book = null;
        },

        unsetErrorISBN: (state) => {
            state.errorISBN = null;
        },

        setAuthors: (state, { payload }: PayloadAction<IAuthor[]>) => {
            state.authors = payload;
        },

        setPublishers: (state, { payload }: PayloadAction<IPublisher[]>) => {
            state.publishers = payload;
        },

        setLanguages: (state, { payload }: PayloadAction<ILanguage[]>) => {
            state.languages = payload;
        },

        setGenres: (state, { payload }: PayloadAction<IGenre[]>) => {
            state.genres = payload;
        },

        resetState: (state) => initialState,
    },
});

export const addBook = (book: IBook): AppThunkAddBook => {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const response: IBook = await api.post(
                API_ROUTES.ADD_BOOK,
                {
                    id: book.id,
                    isbn: book.isbn,
                    title: book.title,
                    publicationDate: book.publicationDate,
                    language: book.language,
                    publisher: book.publisher,
                    author: book.author,
                    genres: { ids: false, search: book.genres },
                    description: book.description,
                },
                {
                    withCredentials: true,
                }
            );
            dispatch(setLoading(false));
            dispatch(setBookId(response.id!));
            console.log(response);
        } catch (err: Error | AxiosError | any) {
            console.clear();
            console.log(err.response.data);
            dispatch(setError(err.response.data.error));
            dispatch(setLoading(false));
        }
    };
};

export const fetchBookAutofill = (): AppThunkAddBook => {
    return async (dispatch) => {
        try {
            const {
                data: { authors },
            } = await api.get(API_ROUTES.GET_AUTHOR_ALL, { withCredentials: true });
            //console.log(data);
            dispatch(setAuthors(authors));

            const {
                data: { publishers },
            } = await api.get(API_ROUTES.GET_PUBLISHER_ALL, { withCredentials: true });
            dispatch(setPublishers(publishers));

            const {
                data: { languages },
            } = await api.get(API_ROUTES.GET_LANG_ALL, { withCredentials: true });
            dispatch(setLanguages(languages));

            const {
                data: { genres },
            } = await api.get(API_ROUTES.GET_GENRE_ALL, { withCredentials: true });
            dispatch(setGenres(genres));
        } catch (err: Error | AxiosError | any) {
            console.clear();
            console.log(err.response.data);
            dispatch(setError(err.response.data.error));
        }
    };
};

export const fetchBookByISBN = (isbn: string): AppThunkAddBook => {
    return async (dispatch) => {
        dispatch(unsetErrorISBN());
        try {
            const {
                data: { book },
            } = await api.get(`${API_ROUTES.GET_BOOK_ONE}/?isbn=${isbn}`);
            if (!book) throw "Book not found";
            dispatch(
                setBook({
                    idField: "",
                    isbn: book.isbn,
                    title: book.title,
                    author: book.author.name,
                    publisher: book.publisher.name,
                    publicationDate: book.publicationDate,
                    language: book.language.language,
                    genre: Array.from(book.genres, (x: IGenre) => x.name),
                    description: book.description,
                })
            );
        } catch (err: Error | AxiosError | any) {
            console.clear();
            dispatch(setErrorISBN("Book not found"));
        }
    };
};

export const fetchBookById = (id: string): AppThunkAddBook => {
    return async (dispatch) => {
        dispatch(unsetErrorISBN());
        try {
            const {
                data: { book },
            } = await api.get(`${API_ROUTES.GET_BOOK_ONE}/?id=${id}`);
            if (!book) throw "Book not found";
            console.log(book);
            dispatch(
                setBook({
                    idField: id,
                    isbn: book.isbn,
                    title: book.title,
                    author: book.author.name,
                    publisher: book.publisher.name,
                    publicationDate: book.publicationDate,
                    language: book.language.language,
                    genre: Array.from(book.genres, (x: IGenre) => x.name),
                    description: book.description,
                })
            );
        } catch (err: Error | AxiosError | any) {
            console.clear();
            dispatch(setErrorISBN("Book not found"));
        }
    };
};

// isbn: string;
// title: string;
// author: string;
// publisher: string;
// publicationDate: string;
// language: string;
// genre: string[];
// description: string;

export const {
    setLoading,
    setError,
    setErrorISBN,
    unsetErrorISBN,
    setBookId,
    setBook,
    setAuthors,
    setPublishers,
    setLanguages,
    setGenres,
    resetState,
} = addBookSlice.actions;

export const addBookSelector = (state: { addBookStore: IAddBookState }) => state.addBookStore;

export default addBookSlice.reducer;
