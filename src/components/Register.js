import React from "react";
import "../assets/scss/landingPage.scss"
import "../assets/scss/constants.scss"
import { useState } from "react";
import { Link } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { auth } from '../firebase'

import { createUserWithEmailAndPassword, updateProfile, getAuth, sendEmailVerification } from 'firebase/auth'
import NavigatorWithoutButton from "./NavigatorWithoutButton";
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Register = () => {

    const [name, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [openCompleteAllFieldsError, setopenCompleteAllFieldsError] = React.useState(false);
    const [openRepeatedEmailMessage, setopenRepeatedEmailMessage] = React.useState(false);
    const [openSuccessfulRegister, setOpenSuccessfulRegister] = React.useState(false);

    const showCompleteAllFieldMessage = () => {
        setopenCompleteAllFieldsError(true);
    };

    const closeCompleteAllFieldMessage = (event, reason) => {
        setopenCompleteAllFieldsError(false);
    };

    const showRepeatedEmailMessage = () => {
        setopenRepeatedEmailMessage(true);
    };

    const closeRepeatedEmailMessage = (event, reason) => {
        setopenRepeatedEmailMessage(false);
    };

    const showSuccessfulRegister = (event, reason) => {
        setOpenSuccessfulRegister(true);
    };

    const closeSuccessfulRegister = (event, reason) => {
        setOpenSuccessfulRegister(false);
    };

    const register = (e) => {
        e.preventDefault();

        if(email=='' || password==''|| name==''|| lastname==''){
            showCompleteAllFieldMessage()
        }
        else{
            createUserWithEmailAndPassword(auth, email, password)
                .then((res) => {
                    const updated_auth = getAuth();
                    updateProfile(updated_auth.currentUser, {
                        displayName: name + " " + lastname
                    }).then(() => {

                        sendEmailVerification(updated_auth.currentUser)
                            .then(() => {
                                showSuccessfulRegister()
                            });


                    }).catch((error) => {
                        alert("El servicio no esta funcionando. Intenta mas tarde.");
                    });
                })
                .catch((err) => {

                    if(err.code == 'auth/email-already-in-use'){
                        showRepeatedEmailMessage()
                    }

                })
        }
    }

    return (
        <div className="row g-0 auth-wrapper background-color:white" >
            <NavigatorWithoutButton />
            <div className="col-12 col-md-7 col-lg-6 auth-main-col text-center">
                <div className="d-flex flex-column align-content-end">
                    <div className="auth-body mx-auto">

                        <p>Crea tu cuenta</p>
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

                            <TextField label="Nombre" color="primary" fullWidth onChange={(e) => setFirstName(e.target.value)} />
                            <TextField label="Apellido" color="primary" fullWidth onChange={(e) => setLastName(e.target.value)} />
                            <TextField label="Correo electronico" color="primary" fullWidth onChange={(e) => setEmail(e.target.value)} />
                            <TextField label="Contraseña" color="primary" type="password" fullWidth onChange={(e) => setPassword(e.target.value)} />
                            <div className="text-center">
                                <button className="btn btn-primary w-100 theme-btn mx-auto" onClick={register} style={{ backgroundColor: "#9CE37D", border: "none", color: "black" }}>Registrarse</button>
                            </div>
                            <div className="auth-option text-center pt-2">¿Ya tenes cuenta? <Link className="text-link" to="/login" >Iniciar Sesion</Link></div>

                        </Box>
                    </div>

                </div>
            </div>
            <Snackbar open={openCompleteAllFieldsError} autoHideDuration={3000} onClose={closeCompleteAllFieldMessage}>
                <Alert onClose={closeCompleteAllFieldMessage} severity="error">Ingrese todos los campos por favor!</Alert>
            </Snackbar>
            <Snackbar open={openRepeatedEmailMessage} autoHideDuration={3000} onClose={closeRepeatedEmailMessage}>
                <Alert onClose={closeRepeatedEmailMessage} severity="error">Un usuario ya se registro con ese mail. Intenta otro.</Alert>
            </Snackbar>
            <Snackbar open={openSuccessfulRegister} autoHideDuration={3000} onClose={closeSuccessfulRegister}>
                <Alert onClose={closeSuccessfulRegister} severity="success">Registro Exitoso. Revisa tu mail!</Alert>
            </Snackbar>
        </div>
    );
}

export default Register;