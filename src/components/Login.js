import { useState } from "react";
import { Link } from "react-router-dom";
import React from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"
import '../assets/scss/auth.scss'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import { THEME } from '../CONSTANTS'
import { ThemeProvider } from '@mui/material/styles';

import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import NavigatorWithButton from "./NavigatorWithButton";
import LoadingButton from '@mui/lab/LoadingButton';
import CustomAlert from './CustomAlert'


const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [openVerifyEmailMessage, setopenVerifyEmailMessage] = React.useState(false);
    const [openCompleteAllFieldMessage, setopenCompleteAllFieldsError] = React.useState(false);
    const [openInvalidEmailError, setopenInvalidEmailError] = React.useState(false);
    const [openInvalidUserError, setopenInvalidUserError] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const showVerifyEmailMessage = () => {
        setopenVerifyEmailMessage(true);
    };

    const closeVerifyEmailMessage = (event, reason) => {
        setopenVerifyEmailMessage(false);
    };

    const showCompleteAllFieldError = () => {
        setopenCompleteAllFieldsError(true);
    };

    const closeCompleteAllFieldError = (event, reason) => {
        setopenCompleteAllFieldsError(false);
    };

    const showInvalidEmailError = () => {
        setopenInvalidEmailError(true);
    };

    const closeInvalidEmailError = (event, reason) => {
        setopenInvalidEmailError(false);
    };

    const showInvalidUserError = () => {
        setopenInvalidUserError(true);
    };

    const closeInvalidUserError = (event, reason) => {
        setopenInvalidUserError(false);
    };

    const { dispatch } = useContext(AuthContext);

    const handleLogin = (e) => {
        e.preventDefault()
        setLoading(true);
        if (email === '' || password === '') {
            showCompleteAllFieldError()
            setLoading(false);
        }
        else {

            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user

                    if (user.emailVerified) {
                        dispatch({ type: "LOGIN", payload: user })
                        window.location.href = "/profile/home"
                    }
                    else {
                        showVerifyEmailMessage()
                    }

                    setLoading(false)

                })
                .catch((error) => {

                    if (error.code === 'auth/invalid-email') {
                        showInvalidEmailError()
                    }
                    if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
                        showInvalidUserError()
                    }
                    setLoading(false)

                });

        }
    }

    return (
        <div className="row g-0 auth-wrapper">

            <NavigatorWithButton />
            <div className="col-12 col-md-7 col-lg-6 auth-main-col text-center">
                <div className="d-flex flex-column align-content-end">
                    <div className="auth-body mx-auto">
                        <img
                            src="/logo192.png"
                            className="d-inline-block align-top logo"
                        />
                        <p style={{ fontWeight: "bold" }}>Walletify</p>
                        <p>Ingresa a tu cuenta</p>
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
                                    <TextField label="Correo electronico" color="primary" style={{ width: "100%" }} onChange={(e) => { setEmail(e.target.value) }}/>
                                </div>
                                <div>
                                    <TextField label="Contraseña" color="primary" type="password" style={{ width: "100%" }} onChange={(e) => { setPassword(e.target.value) }} />
                                </div>

                                <div className="text-center">
                                    <ThemeProvider theme={THEME}>

                                        <LoadingButton
                                            size="medium"
                                            onClick={handleLogin}
                                            loading={loading}
                                            variant="contained"
                                        >
                                            Iniciar Sesion
                                        </LoadingButton>
                                    </ThemeProvider>
                                </div>

                            </Box>
                            <div className="auth-option text-center pt-2">¿No tenes cuenta? <Link className="text-link" to="/register" >Registrate </Link></div>
                            <div className="auth-option text-center pt-2"><Link className="text-link" to="/forgotPassword">Olvide mi contraseña </Link></div>
                        </div>
                    </div>
                </div>
            </div>
            <CustomAlert text={"Verifica el mail para poder ingresar!"} severity={"error"} open={openVerifyEmailMessage} closeAction={closeVerifyEmailMessage} />
            <CustomAlert text={"¡Completa todos los campos!"} severity={"error"} open={openCompleteAllFieldMessage} closeAction={closeCompleteAllFieldError} />
            <CustomAlert text={"¡Ingresa un mail valido!"} severity={"error"} open={openInvalidEmailError} closeAction={closeInvalidEmailError} />
            <CustomAlert text={"Contraseña o Mail no correcto"} severity={"error"} open={openInvalidUserError} closeAction={closeInvalidUserError} />

        </div>
    );
}

export default Login;
