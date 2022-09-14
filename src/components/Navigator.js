import React from "react";
import "../assets/scss/landingPage.scss"
import "../assets/scss/constants.scss"

import { useAuth0 } from "@auth0/auth0-react";

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from '@mui/material/Button';
import { THEME } from "../CONSTANTS"

export const Navigator = () => {
    const { loginWithRedirect } = useAuth0();

    return (
        <>
            <Navbar bg="black" variant="dark">
                <Container>
                    <Navbar.Brand>
                        <img
                            src="/logo192.png"
                            width="30"
                            height="30"
                            className="d-inline-block align-top logo"
                            style={{"margin-right": "15px", "margin-left": "15px"}}
                        />
                        <span className="custom-font-light">Walletify</span>
                    </Navbar.Brand>
                    <Button className="custom-font-light" variant="outlined" theme={THEME} onClick={() => loginWithRedirect()}>Iniciar Sesion</Button>
                </Container>

            </Navbar>
        </>
    );
};

export default Navigator
