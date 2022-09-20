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
import NavigatorWithoutButton from "./NavigatorWithoutButton";
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [openVerifyEmailMessage, setopenVerifyEmailMessage] = React.useState(false);
    const [openCompleteAllFieldMessage , setopenCompleteAllFieldsError ] = React.useState(false);
    const [openInvalidEmailError , setopenInvalidEmailError ] = React.useState(false);
    const [openInvalidUserError , setopenInvalidUserError ] = React.useState(false);

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

        if(email=='' || password==''){
            showCompleteAllFieldError()
        }
        else{

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user

                if (user.emailVerified) {
                    console.log("Usuario:", user)
                    dispatch({ type: "LOGIN", payload: user })
                    window.location.href = "/profile/home"
                }
                else{
                    showVerifyEmailMessage()
                }

            })
            .catch((error) => {
                
                if(error.code == 'auth/invalid-email'){
                    showInvalidEmailError()
                }
                if(error.code == 'auth/user-not-found' || error.code == 'auth/wrong-password'){
                    showInvalidUserError()
                }

            });
        }
    }

    return (
        <div className="row g-0 auth-wrapper">

            <NavigatorWithoutButton/>
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
                                    <TextField label="Correo electronico" color="primary" style={{ width: "100%" }} onChange={(e) => { setEmail(e.target.value) }} />
                                </div>
                                <div>
                                    <TextField label="Contraseña" color="primary" type="password" style={{ width: "100%" }} onChange={(e) => { setPassword(e.target.value) }} />
                                </div>

                                <div className="text-center">
                                    <button onClick={handleLogin} className="btn btn-primary w-100 theme-btn mx-auto" style={{ backgroundColor: "#9CE37D", border: "none", color: "black" }}>Iniciar Sesion</button>
                                </div>

                            </Box>
                            <div className="auth-option text-center pt-2">¿No tenes cuenta? <Link className="text-link" to="/register" >Registrate </Link></div>
                            <div className="auth-option text-center pt-2"><Link className="text-link" to="/forgotPassword">Olvide mi contraseña </Link></div>
                        </div>
                    </div>
                </div>
            </div>


            <Snackbar open={openVerifyEmailMessage} autoHideDuration={3000} onClose={closeVerifyEmailMessage}>
                <Alert onClose={closeVerifyEmailMessage} severity="error">Verifica el mail para poder ingresar!</Alert>
            </Snackbar>
            <Snackbar open={openCompleteAllFieldMessage} autoHideDuration={3000} onClose={closeCompleteAllFieldError}>
                <Alert onClose={closeCompleteAllFieldError} severity="error">Completa todos los campos!</Alert>
            </Snackbar>
            <Snackbar open={openInvalidEmailError} autoHideDuration={3000} onClose={closeInvalidEmailError}>
                <Alert onClose={closeInvalidEmailError} severity="error">Ingresa un mail valido!</Alert>
            </Snackbar>
            <Snackbar open={openInvalidUserError} autoHideDuration={3000} onClose={closeInvalidUserError}>
                <Alert onClose={closeInvalidUserError} severity="error">Contraseña o Mail no correcto</Alert>
            </Snackbar>
        </div>
    );
}

export default Login;