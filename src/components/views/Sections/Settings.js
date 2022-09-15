import React from 'react';

import { AUTH0_DOMAIN_URL, AUTH0_CLIENT_ID } from "../../../CONSTANTS";
import { useAuth0 } from "@auth0/auth0-react";

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import "../../../assets/scss/settings.scss"
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const Settings = () => {
  var axios = require("axios").default;
  const { user } = useAuth0();

  const [openError, setOpenError] = React.useState(false);
  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [openWarning, setOpenWarning] = React.useState(false);

  const showSuccessMessage = () => {
    setOpenSuccess(true);
  };

  const showErrorMessage = () => {
    setOpenError(true);
  };

  const showWarningMessage = () => {
    setOpenWarning(true);
  };

  const closeSuccessMessage = (event, reason) => {
    setOpenSuccess(false);
  };

  const closeErrorMessage = (event, reason) => {
    setOpenError(false);
  };

  const closeWarningMessage = () => {
    setOpenWarning(false);
  };

  const send_email = (e) => {

    if (user.sub.includes("auth0")) {

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
        showSuccessMessage();
      }).catch(function (error) { showErrorMessage() });

    }
    else {
      showWarningMessage();
    }

  }

  const BasicCard = () => {
    return (
      <Card style={{ borderRadius: 5, border: "1px solid #9CE37D", margin: 30, backgroundColor: "black" }}>
        <CardContent style={{ color: "black" }}>
          <Typography variant="h5" component="div" style={{ color: "white" }}>
            Cambiar Contraseña
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="white">
            Si queres cambiar la contraseña, clickea abajo que te mandamos un mail para cambiarla.
          </Typography>
        </CardContent>
        <CardActions style={{ display: 'flex' }}>
          <Button style={{ marginLeft: 'auto', border: "1px solid #9CE37D", backgroundColor: "black", color: "white" }} size="small" onClick={() => { send_email() }} variant="outlined">Mandar mail</Button>
        </CardActions>
      </Card>
    );
  }

  return (
    <div className='settings'>
      <BasicCard className='child' />
      <Snackbar open={openSuccess} autoHideDuration={3000} onClose={closeSuccessMessage}>
        <Alert onClose={closeSuccessMessage} severity="success">Se ha enviado un email de cambio de contraseña!</Alert>
      </Snackbar>
      <Snackbar open={openError} autoHideDuration={3000} onClose={closeErrorMessage}>
        <Alert onClose={closeErrorMessage} severity="error">Hubo un error. Intenta nuevamente mas tarde.</Alert>
      </Snackbar>
      <Snackbar open={openWarning} autoHideDuration={3000} onClose={closeWarningMessage}>
        <Alert onClose={closeWarningMessage} severity="warning">Estas logeado con Google. Para cambiar tu contraseña, hacelo desde Google.</Alert>
      </Snackbar>
    </div>
  );
}
