import React from 'react';

import { AUTH0_DATABASE_CONNECTION, AUTH0_DOMAIN_URL, AUTH0_CLIENT_ID } from "../../../CONSTANTS";
import { useAuth0 } from "@auth0/auth0-react";

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { borderRadius } from '@mui/system';
import "../../../assets/scss/settings.scss"

export const Settings = () =>{
  var axios = require("axios").default;
  const { user } = useAuth0();

  const send_email = (e) => {

    var options = {
      method: 'POST',
      url: 'https://' + AUTH0_DOMAIN_URL + '/dbconnections/change_password',
      headers: { 'content-type': 'application/json' },
      data: {
        client_id: AUTH0_CLIENT_ID,
        email: user.email,
        connection: 'Username-Password-Authentication'
      }
    };

    axios.request(options).then(function (response) {
      console.log(response.data);
    }).catch(function (error) {
      console.error(error);
    });

    e.preventDefault();
    alert("Revisa tu mail!")

  }

  const style = {
    width: '100%',
    maxWidth: 360,
    bgcolor: 'background.paper',
  };


  const BasicCard = () => {
    return (
      <Card style={{borderRadius:5, border: "1px solid #9CE37D" ,margin:30, backgroundColor:"black"}}>
        <CardContent style={{color:"black"}}>
          <Typography variant="h5" component="div" style={{color:"white"}}>
            Cambiar Contraseña
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="white">
            Si queres cambiar la contraseña, clickea abajo que te mandamos un mail para cambiarla.
          </Typography>
        </CardContent>
        <CardActions style={{display: 'flex'}}>
          <Button  style={{marginLeft:'auto',border: "1px solid #9CE37D" ,backgroundColor:"black", color:"white"}} size="small" onclick={() => { send_email() }} variant="outlined">Mandar mail</Button>
        </CardActions>
      </Card>
    );
  }


  return (
    <div className='settings'>
        <BasicCard class='child'/>
    </div>
  );
}