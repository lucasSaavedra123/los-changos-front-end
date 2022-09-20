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
import { border } from "@mui/system";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const [validate, setValidate] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(false);
    const initialValues= {email:"",password:""};
    const [formValues, setFormValues] = useState(initialValues);
    const [openVerifyEmailMessage, setopenVerifyEmailMessage] = React.useState(false);
    const [openCompleteAllFieldMessage , setopenCompleteAllFieldsError ] = React.useState(false);

    const validateMail= () =>{

    }

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

        console.log(email)
        console.log(password)

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
                setError(true)
            });

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

        </div>
    );
}

export default Login;