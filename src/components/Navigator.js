import React from "react";
import "../assets/scss/landingPage.scss"
import "../assets/scss/constants.scss"

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from '@mui/material/Button';


export const Navigator = () => {
    return (
        <>
                <Navbar bg="black" variant="dark">
                    <Container>
                        <Navbar.Brand href="#home">
                            <img
                                alt=""
                                src="/logo512.png"
                                width="30"
                                height="30"
                                className="d-inline-block align-top"
                            />{' '}
                            <span className="custom-font-light">Walletify</span>
                        </Navbar.Brand>
                        <Button className="custom-font-light" variant="outlined">Iniciar Sesion</Button>
                    </Container>
                </Navbar>
        </>
    );
};

export default Navigator
