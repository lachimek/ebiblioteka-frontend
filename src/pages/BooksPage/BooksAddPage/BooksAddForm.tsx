import React, { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, FieldArray, FormikProps, FormikValues, useFormikContext } from "formik";
import { Form, DropZone, SubmitBtn } from "react-formik-ui";
import { FormGroupRow, FormInput, FormInputAutocomplete, FormTextareaInput } from "./BooksAddFormStyles";
import { FormGroup } from "../../LoginPage/LoginPageStyles";
import FormField from "../../../components/FormInput/FormField";
import LoaderSpin from "../../../components/LoaderSpin/LoaderSpin";
import FormFieldNoIcon from "../../../components/FormInput/FormFieldNoIcon";
import {
    addBook,
    addBookSelector,
    fetchBookAutofill,
    fetchBookById,
    fetchBookByISBN,
    resetState,
    setBookId,
} from "./BooksAddSlice";
import { FormButton } from "components/FormButton/FormButton";

export interface IAddBookProps {
    idField: string;
    isbn: string;
    title: string;
    author: string;
    publisher: string;
    publicationDate: string;
    language: string;
    genre: string[];
    description: string;
}

function BooksAddForm({ edit }: { edit?: Boolean }) {
    const navigate = useNavigate();
    const initialValues: IAddBookProps = {
        idField: "",
        isbn: "",
        title: "",
        author: "",
        publisher: "",
        publicationDate: new Date().toISOString().slice(0, 10),
        language: "",
        genre: [],
        description: "",
    };
    const validationSchema = Yup.object().shape({
        isbn: Yup.string()
            .required("ISBN jest wymagany.")
            .matches(/^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/, "Błędny ISBN"),
        title: Yup.string().required("Tytuł jest wymagany."),
        author: Yup.string().required("Autor jest wymagany."),
        publisher: Yup.string().required("Wydawnictwo jest wymagane."),
        publicationDate: Yup.date().required("Data publikacji jest wymagana."),
        language: Yup.string().required("Język jest wymagany."),
        genre: Yup.array().of(Yup.string().required("Gatunek jest wymagany.")).min(1, "Dodaj minimum 1 gatunek"),
        description: Yup.string().required("Opis jest wymagany."),
    });

    const dispatch = useDispatch();
    const { id } = useParams();
    const { authors, publishers, languages, genres, loading, bookId, book, errorISBN } = useSelector(addBookSelector);
    const [autofillAuthors, setAutofillAuthors] = useState<Array<string>>([]);
    const [autofillPublishers, setAutofillPublishers] = useState<Array<string>>([]);
    const [autofillLanguages, setAutofillLanguages] = useState<Array<string>>([]);
    const [autofillGenres, setAutofillGenres] = useState<Array<string>>([]);
    const [fetchingISBN, setFetchingISBN] = useState(false);
    const [formFilled, setFormFilled] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        dispatch(fetchBookAutofill());

        if (id) {
            dispatch(fetchBookById(id));
        }

        return () => {
            dispatch(resetState());
        };
    }, []);

    useEffect(() => {
        setAutofillAuthors(Array.from(authors, (x) => x.name));
        setAutofillPublishers(Array.from(publishers, (x) => x.name));
        setAutofillLanguages(Array.from(languages, (x) => x.language));
        setAutofillGenres(Array.from(genres, (x) => x.name));
    }, [authors, publishers, languages, genres]);

    useEffect(() => {
        setSubmitting(loading);
        if (bookId !== "") {
            dispatch(setBookId(""));
            if (edit) {
                toast.success("Książka edytowana pomyślnie.");
                navigate("/books/list");
            } else {
                toast.success("Książka dodana pomyślnie.");
            }
        }
    }, [loading, bookId]);

    const handleFetchByISBN = (isbn: string) => {
        dispatch(fetchBookByISBN(isbn));
    };

    const FetchByISBN = () => {
        const formikContext = useFormikContext();
        useEffect(() => {
            if (!formFilled) {
                if (errorISBN === "Book not found") {
                    toast.error("Nie znaleziono książki w bazie danych");
                    formikContext.resetForm();
                }
                if (book != null) {
                    formikContext.setFieldValue("isbn", book.isbn);
                    formikContext.setFieldValue("title", book.title);
                    formikContext.setFieldValue("author", book.author);
                    formikContext.setFieldValue("publisher", book.publisher);
                    formikContext.setFieldValue("publicationDate", book.publicationDate.split("T")[0]);
                    formikContext.setFieldValue("language", book.language);
                    formikContext.setFieldValue("genre", book.genre);
                    formikContext.setFieldValue("description", book.description);
                    setFormFilled(true);
                }
                console.log("setting fields");
            }
        }, [errorISBN, book]);

        useEffect(() => {
            formikContext.setFieldValue("idField", id);
        }, [id]);
        return null;
    };

    const submitButtonText = edit ? "Edytuj książkę" : "Dodaj książkę";

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={({
                idField,
                isbn,
                title,
                author,
                publisher,
                publicationDate,
                language,
                genre,
                description,
            }: IAddBookProps) => {
                dispatch(
                    addBook({
                        id: idField,
                        isbn,
                        title,
                        author,
                        publisher,
                        publicationDate,
                        language,
                        genres: genre,
                        description,
                        available: true,
                    })
                );
                console.log({
                    idField,
                    isbn,
                    title,
                    author,
                    publisher,
                    publicationDate,
                    language,
                    genre,
                    description,
                });
            }}
        >
            {({ values }) => (
                <Form styling="structure">
                    <FormGroup>
                        <FormGroupRow>
                            <FormInput type="text" name="isbn" placeholder="ISBN"></FormInput>
                            <FormInput type="hidden" name="idField" />
                            <FetchByISBN />
                            <FormButton type="button" onClick={() => handleFetchByISBN(values.isbn)}>
                                Pobierz dane z bazy ISBN
                            </FormButton>
                        </FormGroupRow>
                        <FormInput type="text" name="title" placeholder="Tytuł" style={{ width: "100%" }}></FormInput>
                        <FormGroupRow>
                            <FormInputAutocomplete
                                type="text"
                                name="author"
                                placeholder="Autor"
                                suggestions={autofillAuthors}
                            ></FormInputAutocomplete>
                            <FormInput type="date" name="publicationDate" hint="Data publikacji"></FormInput>
                        </FormGroupRow>
                        <FormInputAutocomplete
                            type="text"
                            name="publisher"
                            placeholder="Wydawnictwo"
                            suggestions={autofillPublishers}
                            style={{ width: "100%" }}
                        ></FormInputAutocomplete>
                        <FormGroupRow>
                            <FormInputAutocomplete
                                type="text"
                                name="language"
                                placeholder="Język"
                                suggestions={autofillLanguages}
                            ></FormInputAutocomplete>
                            <FieldArray
                                name="genre"
                                render={(arrayHelpers) => (
                                    <div>
                                        {values.genre && values.genre.length > 0 ? (
                                            values.genre.map((_, index) => (
                                                <div key={index} style={{ display: "flex", alignItems: "baseline" }}>
                                                    <FormInputAutocomplete
                                                        name={`genre.${index}`}
                                                        placeholder="Dodaj gatunek"
                                                        suggestions={autofillGenres}
                                                        required
                                                    />
                                                    <div>
                                                        <button
                                                            style={{
                                                                marginBottom: "10px",
                                                                marginLeft: "5px",
                                                                marginRight: "5px",
                                                            }}
                                                            type="button"
                                                            onClick={() => arrayHelpers.remove(index)}
                                                        >
                                                            -
                                                        </button>
                                                        {index === 0 ? (
                                                            <button
                                                                style={{ marginBottom: "10px" }}
                                                                type="button"
                                                                onClick={() => {
                                                                    if (values.genre.length < 5) {
                                                                        setAutofillGenres(
                                                                            autofillGenres.filter(
                                                                                (item) => !values.genre.includes(item)
                                                                            )
                                                                        );
                                                                        arrayHelpers.insert(index, "");
                                                                    }
                                                                }} // insert an empty string at a position
                                                            >
                                                                +
                                                            </button>
                                                        ) : null}
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <FormButton type="button" onClick={() => arrayHelpers.push("")}>
                                                {/* show this when user has removed all friends from the list */}
                                                Dodaj gatunek (5 max)
                                            </FormButton>
                                        )}
                                    </div>
                                )}
                            />
                        </FormGroupRow>
                        <FormTextareaInput name="description" placeholder="Opis (tagi)" />
                    </FormGroup>
                    <FormGroup>
                        <FormGroupRow>
                            <FormButton type="button" onClick={() => navigate("/books")}>
                                Powrót
                            </FormButton>
                            <FormButton type="submit" disabled={submitting}>
                                {submitting ? <LoaderSpin height={11} width={11} /> : submitButtonText}
                            </FormButton>
                        </FormGroupRow>
                    </FormGroup>
                </Form>
            )}
        </Formik>
    );
}

export default BooksAddForm;
