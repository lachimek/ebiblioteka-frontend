import {
    LoginCard,
    LoginCardFormContainer,
    LoginCardHeader,
    LoginPageContainer,
} from "./LoginPageStyles";
import Logo from "../../images/logo.svg";
import LoginForm from "./LoginForm";

function LoginPage() {
    return (
        <LoginPageContainer>
            <LoginCard>
                <LoginCardHeader>
                    <img src={Logo} alt="Logo" />
                    <span>LOGOWANIE</span>
                </LoginCardHeader>
                <LoginCardFormContainer>
                    <LoginForm />
                </LoginCardFormContainer>
            </LoginCard>
        </LoginPageContainer>
    );
}

export default LoginPage;
