import React from "react";
import "../assets/scss/landingPage.scss"
import "../assets/scss/constants.scss"


import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from '@mui/material/Button';
import { THEME } from "../CONSTANTS"

export const NavigatorWithoutButton = () => {


    return (
        <>
            <Navbar bg="black" variant="dark" style={{width:"100%"}}>
                <Container>
                    <Navbar.Brand>
                        <img
                            src="/logo192.png"
                            width="30"
                            height="30"
                            className="d-inline-block align-top logo"
                            style={{"marginRight": "15px", "marginLeft": "15px"}}
                        />
                        <span className="custom-font-light">Walletify</span>
                    </Navbar.Brand>
                </Container>

            </Navbar>
        </>
    );
};

export default NavigatorWithoutButton
