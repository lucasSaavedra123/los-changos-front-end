import { useState } from "react";
import { Link } from "react-router-dom";
import Form from '../assets/Forms';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from '@mui/material/Button';
import { THEME } from "../CONSTANTS"
import NavigatorWithoutButton from "./NavigatorWithoutButton";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";


const Forgot = () => {

    const [email, setEmail] = useState('');
    const [validate, setValidate] = useState({});

    const validateforgotPassword = () => {
        let isValid = true;

        let validator = Form.validator({
            email: {
                value: email,
                isRequired: true,
                isEmail: true
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

    const forgotPassword = (e) => {
        e.preventDefault();

        const validate = validateforgotPassword();

        if (validate) {

            sendPasswordResetEmail(auth, email)
            .then(() => {
                alert('Reset password link is sent to ' + email);
                setValidate({});
                setEmail('');
            })
            .catch((error) => {
                alert("Algo fallo!");
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
                        <p>Olvidé la contraseña</p>
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
                                    <TextField label="Email" color="primary" style={{ width: "100%" }} onChange={(e) => { setEmail(e.target.value) }} />
                                </div>
                                <div className="text-center">
                                    <button onClick={forgotPassword} style={{ backgroundColor: "#9CE37D", border: "none", color: "black" }} className="btn btn-primary w-100 theme-btn mx-auto">Olvidé la contraseña</button>
                                </div>
                            </Box>
                            <div className="auth-option text-center pt-2"><Link className="text-link" to="/login" >Volver al inicio de sesion</Link></div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Forgot;