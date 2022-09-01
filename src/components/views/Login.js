import { useState } from "react";
import { Link } from "react-router-dom";
import { AUTH0_DATABASE_CONNECTION, LEMMA, AUTH0_DOMAIN_URL, AUTH0_CLIENT_ID } from "../../CONSTANTS";
import auth0 from "auth0-js"
import Form from '../../utilities/Forms'
import { useAuth0 } from "@auth0/auth0-react";

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const [validate, setValidate] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const { loginWithRedirect } = useAuth0();

    const validateLogin = () => {
        let isValid = true;

        let validator = Form.validator({
            email: {
                value: email,
                isRequired: true,
                isEmail: true
            },
            password: {
                value: password,
                isRequired: true,
                minLength: 6
            }
        });

        if (validator !== null) {
            setValidate({
                validate: validator.errors
            })

            isValid = false
        }
        return isValid;
    }

    const authenticate = (e) => {
        var webAuth = new auth0.WebAuth({
            domain: AUTH0_DOMAIN_URL,
            clientID: AUTH0_CLIENT_ID
        });

        e.preventDefault();

        const validate = validateLogin();

        if (validate) {

            webAuth.login({
                realm: AUTH0_DATABASE_CONNECTION,
                username: email,
                password: password,
            });

            console.log("Hola")

        }
    }

    const togglePassword = (e) => {
        if (showPassword) {
            setShowPassword(false);
        } else {
            setShowPassword(true)
        }
    }

    return (
        <div className="row g-0 auth-wrapper">
            <div className="col-12 col-md-5 col-lg-6 h-100 auth-background-col">
                <div className="auth-background-holder"></div>
                <div className="auth-background-mask">{LEMMA}</div>
            </div>

            <div className="col-12 col-md-7 col-lg-6 auth-main-col text-center">
                <div className="d-flex flex-column align-content-end">
                    <div className="auth-body mx-auto">
                        <p>Login to your account or Sign Up</p>
                        <div className="auth-form-container text-start">
                            <div className="text-center">
                                <button type="submit" className="btn btn-primary w-100 theme-btn mx-auto" onClick={() => loginWithRedirect()}>Log In</button>
                                <button type="submit" className="btn btn-primary w-100 theme-btn mx-auto" onClick={() => window.location.href = "./register"}>Sign Up</button>
                            </div>

                            <hr />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Login