import React from "react";
import "../assets/scss/landingPage.scss"

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';

export const Navigator = () => {
    return (
        <>
            <Navbar bg="dark" variant="dark">
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
            <Container>
                Hola
            </Container>
        </>
    );
};

export default Navigator
