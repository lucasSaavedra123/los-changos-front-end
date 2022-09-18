import React from "react";
import "../assets/scss/landingPage.scss"
import "../assets/scss/constants.scss"
import "../assets/scss/login.scss"
import { useState } from "react";
import { Link } from "react-router-dom";
import Form from "../assets/Forms.js";
import CurrencyList from 'currency-list'
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import {auth} from '../firebase'

import {createUserWithEmailAndPassword} from 'firebase/auth'
import NavigatorWithoutButton from "./NavigatorWithoutButton";

const Register = () => {

    const [name, setName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validate, setValidate] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(false);
    const [currency, setCurrency] = useState('ARS');
    const currencies = CurrencyList.getAll('en_US');


    const validateRegister = () => {
        let isValid = true;

        let validator = Form.validator({
            name: {
                value: name,
                isRequired: true,
            },
            lastname: {
                value: lastname,
                isRequired: true,

            },
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

    const register = (e) => {
        e.preventDefault();

        console.log(name)
        console.log(lastname)
        console.log(email)
        console.log(password)
        console.log(currency)

        const validate = validateRegister();

        if (validate) {
            setValidate({});
            setName('');
            setLastName('');
            setEmail('');
            setPassword('');
            
            createUserWithEmailAndPassword(auth, email, password)
            .then((res) => {
                console.log(res.user)
                alert('Successfully Register User');
              })
            .catch(err => setError(err.message))

        }
    }

    const togglePassword = (e) => {
        if (showPassword) {
            setShowPassword(false);
        } else {
            setShowPassword(true)
        }
    }
    const handleChange = (event) => {
        setCurrency(event.target.value);
    };

    return (
        <div className="row g-0 auth-wrapper background-color:white" >
            <div>
                <NavigatorWithoutButton/>
            </div>
            <div className="col-12 col-md-5 col-lg-6 h-100 auth-background-col">
                <div className="auth-background-holder"></div>
                <div className="auth-background-mask"></div>
            </div>

            <div className="col-12 col-md-7 col-lg-6 auth-main-col text-center">
                <div className="d-flex flex-column align-content-end">
                    <div className="auth-body mx-auto">
                        <p>Create your Account</p>
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
                            <TextField label="First Name" color="primary" fullWidth onChange={(e)=>setName(e.target.value)}/>
                            <TextField label="Last Name" color="primary" fullWidth onChange={(e)=>setLastName(e.target.value)}/>
                            <TextField label="Email" color="primary" fullWidth onChange={(e)=>setEmail(e.target.value)}/>
                            <TextField label="Password" color="primary" type="password" fullWidth onChange={(e)=>setPassword(e.target.value)}/>
                            <TextField
                                id="outlined-select-currency"
                                select
                                label="Select"
                                value={currency}
                                onChange={(e)=>setCurrency(e.target.value)}
                                helperText="Please select your currency"
                            >
                                {Object.keys(currencies).map((currency) => {
                                    return (
                                        <MenuItem
                                            value={currencies[currency].code}
                                            key={currencies[currency].symbol}>
                                            {currencies[currency].code}
                                        </MenuItem>
                                    )
                                })
                                }
                            </TextField>
                            <div className="text-center">
                                <button className="btn btn-primary w-100 theme-btn mx-auto" onClick={register}>Sign Up</button>
                            </div>
                            <div className="auth-option text-center pt-2">Have an account? <Link className="text-link" to="/login" >Sign in</Link></div>

                        </Box>
                    </div>

                </div>
            </div>

        </div>
    );
}

export default Register;