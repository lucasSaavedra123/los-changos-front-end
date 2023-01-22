import { useState } from "react";
import { Link } from "react-router-dom";
import React from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"
import '../assets/scss/auth.scss'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import { THEME, useStyles } from '../CONSTANTS'
import { ThemeProvider } from '@mui/material/styles';

import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import NavigatorWithButton from "./NavigatorWithButton";
import LoadingButton from '@mui/lab/LoadingButton';
import CustomAlert from './CustomAlert'
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [openVerifyEmailMessage, setopenVerifyEmailMessage] = React.useState(false);
    const [openCompleteAllFieldMessage, setopenCompleteAllFieldsError] = React.useState(false);
    const [openInvalidEmailError, setopenInvalidEmailError] = React.useState(false);
    const [openInvalidUserError, setopenInvalidUserError] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [showPassword, setShowPassword]=useState(false);

    const classes = useStyles();
    
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

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
      };
    
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
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
        <div className="row g-0 auth-wrapper landing-page">

            <NavigatorWithButton />
            <div className="col-12 col-md-7 col-lg-6 auth-main-col text-center">
                <div className="d-flex flex-column align-content-end">
                    <div className="auth-body mx-auto">
                        <img
                            src="/logo192.png"
                            className="d-inline-block align-top logo"
                        />
                        <p style={{ fontWeight: "bold" }} className="white-font">Walletify</p>
                        <p className="white-font">Ingresa a tu cuenta</p>
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
        <TextField
          label="Correo Electrónico"
          id="outlined-start-adornment"
          sx={{ m: 1, width: '25ch' }}
          className={classes.root}
          autoComplete="on"
          onChange={(e) => { setEmail(e.target.value) }}
        />
        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" className={classes.root}>
          <InputLabel htmlFor="outlined-adornment-password">Contraseña</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            autoComplete="on"
            onChange={(e) => setPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                  sx={{color:'white'}}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        </div>

                                {/* <div>
                                    <TextField label="Correo electronico" color="primary" style={{ width: "100%"}} className={classes.root} onChange={(e) => { setEmail(e.target.value) }}/>
                                </div>
                                <div>

                                    <FormControl fullWidth className={classes.root}  >
                            <InputLabel style={{color:'black'}}>Contraseña</InputLabel>
                            <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    style={{color:'black'}}
                                    onChange={(e) => setPassword(e.target.value)}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                                
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    
                                />
                            </FormControl>
                                </div> */}

                                <div className="text-center">
                                    <ThemeProvider theme={THEME}>

                                        <LoadingButton
                                            size="medium"
                                            onClick={handleLogin}
                                            loading={loading}
                                            variant="contained"
                                        >
                                            Iniciar Sesión
                                        </LoadingButton>
                                    </ThemeProvider>
                                </div>

                            </Box>
                            <div className="auth-option text-center pt-2 white-font">¿No tenes cuenta? <Link  style={{color: '#5cb377'}}  className="text-link" to="/register" >Registrate </Link></div>
                            <div className="auth-option text-center pt-2"><Link  style={{color: '#5cb377'}}  className="text-link" to="/forgotPassword">Olvide mi contraseña </Link></div>
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
