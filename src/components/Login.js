import { useState } from "react";
import { Link } from "react-router-dom";
import Form from '../assets/Forms'
import React from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"
import '../assets/scss/auth.scss'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

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

    const { dispatch } = useContext(AuthContext);

    const handleLogin = (e) => {
        e.preventDefault()

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user
                dispatch({ type: "LOGIN", payload: user })
                console.log("Se pudo")
                window.location.href = "/profile/home"
            })
            .catch((error) => {
                setError(true)
                console.log("No se pudo:", error)
            });

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
                        <img
                            src="/logo192.png"
                            className="d-inline-block align-top logo"
                        />
                        <p>Login to your account</p>
                        <div className="auth-form-container text-start">
                            <Box
                                component="form"
                                sx={{
                                    '& > :not(style)': { m: 1, width: '25ch' },
                                }}
                                noValidate
                                autoComplete="off"

                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center"
                                }}
                            >

                                <div>
                                    <TextField label="Email" color="primary" style={{ width: "100%" }} onChange={(e)=>{setEmail(e.target.value)}} />
                                </div>
                                <div>
                                    <TextField label="Password" color="primary" type="password" style={{ width: "100%" }} onChange={(e)=>{setPassword(e.target.value)}} />
                                </div>

                                <div className="text-center">
                                    <button onClick={handleLogin} className="btn btn-primary w-100 theme-btn mx-auto">Log In</button>
                                </div>

                            </Box>

                            <div className="auth-option text-center pt-2">No Account? <Link className="text-link" to="/register" >Sign up </Link></div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Login;