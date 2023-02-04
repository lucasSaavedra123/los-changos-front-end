import React from "react";
import "../assets/scss/landingPage.scss"
import "../assets/scss/constants.scss"
import { useState } from "react";
import { Link } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { auth } from '../firebase'

import { createUserWithEmailAndPassword, updateProfile, getAuth, sendEmailVerification } from 'firebase/auth'
import NavigatorWithButton from "./NavigatorWithButton";
import { ThemeProvider } from '@mui/material/styles';
import { THEME, useStyles } from '../CONSTANTS'
import CustomAlert from "./CustomAlert";

import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Button } from "@mui/material";
import '../assets/scss/auth.scss'


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const Register = () => {

    const [name, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword]=useState(false);

    const [openCompleteAllFieldsError, setopenCompleteAllFieldsError] = React.useState(false);
    const [openRepeatedEmailMessage, setopenRepeatedEmailMessage] = React.useState(false);
    const [openSuccessfulRegister, setOpenSuccessfulRegister] = React.useState(false);
    const [openInvalidEmailError, setopenInvalidEmailError] = React.useState(false);
    const [openDoingRegister, setopenDoingRegister] = React.useState(false);

    const classes = useStyles();

    const showDoingRegister = () => {
        setopenDoingRegister(true);
    };

    const closeDoingRegister = (event, reason) => {
        setopenDoingRegister(false);
    };

    const showInvalidEmailError = () => {
        setopenInvalidEmailError(true);
    };

    const closeInvalidEmailError = (event, reason) => {
        setopenInvalidEmailError(false);
    };

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

 
    
      const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
      };
    
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };

    const handleRegister = (e) => {
        e.preventDefault();

        if (email === '' || password === '' || name === '' || lastname === '') {
            showCompleteAllFieldMessage()

        }
        else {
            showDoingRegister()
            createUserWithEmailAndPassword(auth, email, password)
                .then((res) => {
                    const updated_auth = getAuth();
                    updateProfile(updated_auth.currentUser, {
                        displayName: name + " " + lastname
                    }).then(() => {

                        sendEmailVerification(updated_auth.currentUser)
                            .then(async () => {
                                closeDoingRegister();
                                showSuccessfulRegister();
                                await sleep(2000);
                                window.location.href = "/"
                            });

                    }).catch((error) => {
                        alert("El servicio no esta funcionando. Intenta mas tarde.");
                    });
                })
                .catch((err) => {
                    if (err.code === 'auth/email-already-in-use') {
                        showRepeatedEmailMessage()
                    }
                    else if (err.code === 'auth/invalid-email') {
                        showInvalidEmailError()
                    }
                    else {
                        alert("El servicio no esta funcionando. Intenta mas tarde.");
                    }

                })
        }

    }

    return (
        <div className="row g-0 auth-wrapper landing-page" >
            <NavigatorWithButton />
            <div className="col-12 col-md-7 col-lg-6 auth-main-col text-center">
                <div className="d-flex flex-column align-content-end">
                    <div className="auth-body mx-auto">

                        <p className="white-font">Crea tu cuenta</p>
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

                            <TextField label="Nombre" color="primary" className={classes.root} fullWidth onChange={(e) => setFirstName(e.target.value)} />
                            <TextField label="Apellido" color="primary" className={classes.root} fullWidth onChange={(e) => setLastName(e.target.value)} />
                            <TextField label="Correo electronico" color="primary" className={classes.root} fullWidth onChange={(e) => setEmail(e.target.value)} />
                            
                            {/* <FormControl fullWidth className={classes.root}  >
                            <InputLabel style={{color:'white'}} variant='outlined'>Contraseña</InputLabel> */}
                            <TextField
                                className={classes.root}
                                label="Contraseña"
                                color="primary"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                InputProps={{
                                    endAdornment: 
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                            sx={{ color: 'white' }}
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff /> }
                                        </IconButton>
                                    </InputAdornment>
                                }}
                            />
                            {/* </FormControl> */}
                            <div className="text-center">
                                <ThemeProvider theme={THEME}>

                                    <Button
                                        size="medium"
                                        onClick={handleRegister}
                                        variant="contained"
                                    >
                                        Registrar
                                    </Button>
                                </ThemeProvider>
                            </div>
                            <div className="auth-option text-center pt-2 white-font">¿Ya tenes cuenta? <Link style={{ color: '#5cb377' }} className="text-link" to="/login" >Iniciar Sesión</Link></div>

                        </Box>
                    </div>

                </div>
            </div>
            <CustomAlert text={"¡Ingrese todos los campos por favor!"} severity={"error"} open={openCompleteAllFieldsError} closeAction={closeCompleteAllFieldMessage} />
            <CustomAlert text={"Un usuario ya se registro con ese mail. Intenta otro."} severity={"error"} open={openRepeatedEmailMessage} closeAction={closeRepeatedEmailMessage} />
            <CustomAlert text={"Registro Exitoso. Revisa tu mail!"} severity={"success"} open={openSuccessfulRegister} closeAction={closeSuccessfulRegister} />
            <CustomAlert text={"Ingresa un mail valido!"} severity={"error"} open={openInvalidEmailError} closeAction={closeInvalidEmailError} />
            <CustomAlert text={"Creando nueva cuenta..."} severity={"info"} open={openDoingRegister} closeAction={closeDoingRegister} />
        </div>
    );
}

export default Register;