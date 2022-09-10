import React from "react";
import "../assets/scss/landingPage.scss"
import "../assets/scss/constants.scss"

import { useAuth0 } from "@auth0/auth0-react";

import Container from 'react-bootstrap/Container';
import Button from '@mui/material/Button';
import Stack from 'react-bootstrap/Stack';

import {LEMMA} from "../CONSTANTS"


export const LandingPageFront = () => {
    const { loginWithRedirect } = useAuth0();


    return (
        <>
            <Container style={{
                display: "flex",
                width: "60%",
                justifyContent: "center",
                margin: "0 auto",
                color: "white",
                marginTop: "5%"}
            }>

                <Stack gap={1} style={{ textAlign: "center"}}>
                    <div><img src="/logo192.png"></img></div>
                    <div><h1 class="custom-font-bold">Walletify</h1></div>
                    <div class="custom-font-light"><p>{LEMMA}</p></div>
                    <div><Button variant="contained" className="custom-font-light" onClick={() => loginWithRedirect()}>Empezar ahora</Button></div>
                </Stack>
                
            </Container>
        </>
    );
};

export default LandingPageFront
