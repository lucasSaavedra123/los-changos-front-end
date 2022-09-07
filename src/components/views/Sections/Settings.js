import React from 'react';

import { AUTH0_DATABASE_CONNECTION, AUTH0_DOMAIN_URL, AUTH0_CLIENT_ID } from "../../../Constants";
import { useAuth0 } from "@auth0/auth0-react";

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function Settings() {
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
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            Cambiar Contraseña
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Si queres cambiar la contraseña, clickea abajo que te mandamos un mail para cambiarla.
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onclick={() => { send_email() }} variant="outlined">Mandar mail</Button>
        </CardActions>
      </Card>
    );
  }


  return (
    <div className='settings'>
      <h1>Settings</h1>
      <div class="settings-form">
        <BasicCard />
      </div>
    </div>
  );
}

export default Settings;