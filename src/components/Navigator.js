import React from "react";
import "../assets/scss/landingPage.scss"

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Stack from 'react-bootstrap/Stack';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { CenterFocusStrong } from "@mui/icons-material";

export const Navigator = () => {
    return (
        <>
            <div class="landing-page">
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
                            Walletify
                        </Navbar.Brand>
                        <Button variant="outline-success">Iniciar Sesion</Button>
                    </Container>
                </Navbar>
                <Container style={{
                    display: "flex",
                    width: "60%",
                    justifyContent: "center",
                    margin: "0 auto",
                    color: "white"
                }}>

                    <Stack gap={3} style={{textAlign:"center"}}>
                        <div><h1>Walletify</h1></div>
                        <div><p>Nunca manejar la plata fue algo tan comodo.</p></div>
                        <div><Button variant="success">Empezar ahora</Button></div>
                    </Stack>
                </Container>
            </div>
        </>
    );
};

export default Navigator
