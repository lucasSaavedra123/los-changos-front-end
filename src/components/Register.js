import React from "react";
import "../assets/scss/landingPage.scss"
import "../assets/scss/constants.scss"
import { useState } from "react";
import { Link } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { auth } from '../firebase'
import LoadingButton from '@mui/lab/LoadingButton';

import { createUserWithEmailAndPassword, updateProfile, getAuth, sendEmailVerification } from 'firebase/auth'
import NavigatorWithButton from "./NavigatorWithButton";
import { ThemeProvider } from '@mui/material/styles';
import { THEME, useStyles } from '../CONSTANTS'
import CustomAlert from "./CustomAlert";

import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const Register = () => {

    const [name, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = React.useState(false);
    const [showPassword, setShowPassword]=useState(false);

    const [openCompleteAllFieldsError, setopenCompleteAllFieldsError] = React.useState(false);
    const [openRepeatedEmailMessage, setopenRepeatedEmailMessage] = React.useState(false);
    const [openSuccessfulRegister, setOpenSuccessfulRegister] = React.useState(false);
    const [openInvalidEmailError, setopenInvalidEmailError] = React.useState(false);

    const classes = useStyles();

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
        setLoading(true);

        if (email === '' || password === '' || name === '' || lastname === '') {
            showCompleteAllFieldMessage()
            setLoading(false);

        }
        else {
            createUserWithEmailAndPassword(auth, email, password)
                .then((res) => {
                    const updated_auth = getAuth();
                    updateProfile(updated_auth.currentUser, {
                        displayName: name + " " + lastname
                    }).then(() => {

                        sendEmailVerification(updated_auth.currentUser)
                            .then(async () => {
                                setLoading(false);
                                showSuccessfulRegister();
                                await sleep(2000);
                                window.location.href = "/"
                            });

                    }).catch((error) => {
                        setLoading(false);
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
                    setLoading(false);

                })
        }

    }

    return (
        <div className="row g-0 auth-wrapper background-color:white" >
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
                            
                            <FormControl fullWidth className={classes.root}  >
                            <InputLabel style={{color:'white'}} variant='outlined'>Contraseña</InputLabel>
                            <OutlinedInput
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                                sx={{color:'white'}}
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    
                                />
                            </FormControl>
                            <div className="text-center">
                                <ThemeProvider theme={THEME}>

                                    <LoadingButton
                                        size="medium"
                                        onClick={handleRegister}
                                        loading={loading}
                                        variant="contained"
                                    >
                                        Registrar
                                    </LoadingButton>
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
        </div>
    );
}

export default Register;