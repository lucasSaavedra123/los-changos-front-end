import React from "react";
import "../assets/scss/landingPage.scss"
import "../assets/scss/constants.scss"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

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
                        <div stlyle={{color:'white'}}>HOla</div>
                        <Link className="text-link" to="/" style={{ color: "grey", float: "left", marginLeft: -20 }}><ArrowBackIcon></ArrowBackIcon> </Link>
                    </Navbar.Brand>
                </Container>

            </Navbar>
        </>
    );
};

export default NavigatorWithoutButton
