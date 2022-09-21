import React from 'react';

import "../../assets/scss/settings.scss"

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import CustomAlert from '../CustomAlert';


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});



const Settings = () => {
  const [openError, setOpenError] = React.useState(false);
  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [openWarning, setOpenWarning] = React.useState(false);

  const { currentUser } = useContext(AuthContext);

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

  const forgotPassword = (e) => {

    sendPasswordResetEmail(auth, currentUser.email)
      .then(() => {
        showSuccessMessage();
      })
      .catch((error) => {
        showErrorMessage();
      });
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
          <Button style={{ marginLeft: 'auto', border: "1px solid #9CE37D", backgroundColor: "black", color: "white" }} size="small" onClick={() => { forgotPassword() }} variant="outlined">Mandar mail</Button>
        </CardActions>
      </Card>
    );
  }

  return (
    <div className='settings'>
      <BasicCard className='child' />
      <CustomAlert text={"¡Se ha enviado un email de cambio de contraseña!"} severity={"success"} open={openSuccess} closeAction={closeSuccessMessage} />
      <CustomAlert text={"Hubo un error. Intenta nuevamente mas tarde."} severity={"error"} open={openError} closeAction={closeErrorMessage} />
    </div>
  );
}

export default Settings