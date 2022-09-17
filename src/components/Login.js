import { useState } from "react";
import { Link } from "react-router-dom";
import Form from '../assets/Forms'
import React from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"
import '../assets/scss/auth.scss'

import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const [validate, setValidate] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(false);

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

    /*const authenticate = (e) => {
        e.preventDefault();

        const validate = validateLogin();

        if (validate) {
            setValidate({});
            setEmail('');
            setPassword('');
            alert('Successfully Login');
        }
    }*/
    const {dispatch} = useContext(AuthContext);

    const handleLogin = (e) => {
        e.preventDefault()

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user
                dispatch({type:"LOGIN", payload:user})
                window.location.href = "/profile/home"
            })
            .catch((error) => {
                setError(true)
            });

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
                <div className="auth-background-mask"></div>
            </div>

            <div className="col-12 col-md-7 col-lg-6 auth-main-col text-center">
                <div className="d-flex flex-column align-content-end">
                    <div className="auth-body mx-auto">
                        <p>Login to your account</p>
                        <div className="auth-form-container text-start">
                            <form className="auth-form" method="POST" onSubmit={handleLogin} autoComplete={'off'}>
                                <div className="email mb-3">
                                    <input type="email"
                                        className={`form-control ${validate.validate && validate.validate.email ? 'is-invalid ' : ''}`}
                                        id="email"
                                        name="email"
                                        value={email}
                                        placeholder="Email"
                                        onChange={(e) => setEmail(e.target.value)}
                                    />

                                    <div className={`invalid-feedback text-start ${(validate.validate && validate.validate.email) ? 'd-block' : 'd-none'}`} >
                                        {(validate.validate && validate.validate.email) ? validate.validate.email[0] : ''}
                                    </div>
                                </div>

                                <div className="password mb-3">
                                    <div className="input-group">
                                        <input type={showPassword ? 'text' : 'password'}
                                            className={`form-control ${validate.validate && validate.validate.password ? 'is-invalid ' : ''}`}
                                            name="password"
                                            id="password"
                                            value={password}
                                            placeholder="Password"
                                            onChange={(e) => setPassword(e.target.value)}
                                        />

                                        <button type="button" className="btn btn-outline-primary btn-sm" onClick={(e) => togglePassword(e)} ><i className={showPassword ? 'far fa-eye' : 'far fa-eye-slash'} ></i> </button>

                                        <div className={`invalid-feedback text-start ${(validate.validate && validate.validate.password) ? 'd-block' : 'd-none'}`} >
                                            {(validate.validate && validate.validate.password) ? validate.validate.password[0] : ''}
                                        </div>
                                    </div>


                                    <div className="extra mt-3 row justify-content-between">
                                        <div className="col-6">
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" id="remember" checked={remember} onChange={(e) => setRemember(e.currentTarget.checked)} />
                                                <label className="form-check-label" htmlFor="remember">
                                                    Remember me
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="forgot-password text-end">
                                                <Link to="/forgot-password">Forgot password?</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <button type="submit" className="btn btn-primary w-100 theme-btn mx-auto">Log In</button>
                                </div>
                            </form>

                            <hr />
                            <div className="auth-option text-center pt-2">No Account? <Link className="text-link" to="/register" >Sign up </Link></div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Login;