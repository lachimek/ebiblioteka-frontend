import { Formik, FormikProps } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";

import FormField from "../../components/FormInput/FormField";
import { LoginCardForm, FormGroup, FormRemindPassword, FormButton } from "./LoginPageStyles";

import UserIcon from "../../images/user-svgrepo-com.svg";
import PasswordIcon from "../../images/lock-svgrepo-com.svg";
import LoaderSpin from "../../components/LoaderSpin/LoaderSpin";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginSelector, loginUser } from "./LoginSlice";
import { useEffect, useState } from "react";
import { ERROR } from "../../constants";

interface ILoginProps {
    login: string;
    password: string;
}

export default function LoginForm() {
    const navigate = useNavigate();
    const initialValues: ILoginProps = { login: "kntp123", password: "12341234" };
    const validationSchema = Yup.object().shape({
        login: Yup.string().required("Login jest wymagany."),
        password: Yup.string()
            .required("Hasło jest wymagane.")
            .min(8, "Hasło musi mieć minimum 8 znaków.")
            .max(20, "Hasło musi mieć mniej niż 20 znaków."),
    });

    const dispatch = useDispatch();
    const { error, loading, loggedIn } = useSelector(loginSelector);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        setSubmitting(loading);
        if (loggedIn) {
            toast.success("Zalogowano pomyślnie");
            navigate("/");
        }
    }, [loading, loggedIn]);

    useEffect(() => {
        if (error && error === ERROR.USER_NOT_FOUND) {
            toast.error("Podano błędne dane logowania");
        }
    }, [error]);

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={({ login, password }: ILoginProps) => {
                dispatch(loginUser({ login, password }));
            }}
        >
            {(props: FormikProps<ILoginProps>) => {
                return (
                    <LoginCardForm>
                        <FormGroup>
                            <FormField
                                type="text"
                                placeholder="Login"
                                label="Login"
                                name="login"
                                icon={UserIcon}
                            ></FormField>
                            <FormField
                                type="password"
                                placeholder="Hasło"
                                label="Hasło"
                                name="password"
                                icon={PasswordIcon}
                            ></FormField>
                        </FormGroup>
                        <FormGroup>
                            <FormButton type={"submit"} disabled={submitting}>
                                {submitting ? <LoaderSpin height={11} width={11} /> : "ZALOGUJ"}
                            </FormButton>
                            <FormButton type="button">ZALOGUJ SIĘ KARTĄ</FormButton>
                            <FormRemindPassword>Przypomnij hasło</FormRemindPassword>
                        </FormGroup>
                    </LoginCardForm>
                );
            }}
        </Formik>
    );
}
