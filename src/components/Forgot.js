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
            alert('Reset password link is sent to ' + email);
            setValidate({});
            setEmail('');
        }
    }

    return (
        

        
        <div className="row g-0 auth-wrapper">


            <div className="col-12 col-md-5 col-lg-6 h-100 auth-background-col">
                <div className="auth-background-holder"></div>
                <div className="auth-background-mask"></div>
            </div>

            <div className="col-12 col-md-7 col-lg-6 auth-main-col text-center">

            <Link className="text-link" to="/" style={{color:"grey", float:"left", marginLeft:10}}><ArrowBackIcon></ArrowBackIcon> </Link>

            
                <div className="d-flex flex-column align-content-end">
                    <div className="auth-body mx-auto">
                        <p>Forgot Password</p>
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
                                    <button onClick={forgotPassword} style={{backgroundColor:"#9CE37D",border:"none", color:"black"}} className="btn btn-primary w-100 theme-btn mx-auto">Forgot Password</button>
                                </div>




                            </Box>



                            <div className="auth-option text-center pt-2"><Link className="text-link" to="/login" >Back to Login</Link></div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Forgot;