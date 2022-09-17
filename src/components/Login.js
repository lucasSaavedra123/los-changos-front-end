import React from "react";
//import "../assets/scss/landingPage.scss"
import "../assets/scss/constants.scss"
import "../assets/scss/login.scss"

import { LEMMA, THEME } from "../CONSTANTS"
import Button from '@mui/material/Button';
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"


const Login = () => {
    const [error, setError] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const handleLogin = (e) => {
        e.preventDefault()

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setError(false)
                window.location.href = "/profile/home"
            })
            .catch((error) => {
                setError(true)
            });

    }

    return (
        <div className="login">
            <form onSubmit={handleLogin}>
                <input type="email" placeholder="email" onChange={e => setEmail(e.target.value)} />
                <input type="password" placeholder="password" onChange={e => setPassword(e.target.value)} />

                <Button theme={THEME} variant="contained" className="custom-font-light loginButton" type="submit"><span className="black-font">Iniciar Sesion</span></Button>
                {error && <span>Wrong email or password!</span>}
            </form>
        </div>
    )
}

export default Login
