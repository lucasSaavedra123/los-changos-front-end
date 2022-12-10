import React from 'react';
import "../../assets/scss/settings.scss"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { BACKEND_URL } from '../../CONSTANTS';
import CustomAlert from '../CustomAlert';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Title from '../Title';
import { SettingsApplicationsSharp } from '@mui/icons-material';
import { Stack } from '@mui/material';

const mdTheme = createTheme();
const Settings = () => {
  const styles = {
    "&.MuiButton-root": {
      border: "2px green solid"
    },
    "&.MuiButton-text": {
      color: "green"
    },
    "&.MuiButton-contained": {
      color: "green"
    },
    "&.MuiButton-outlined": {
      color: "green"
    }
  };
  const [open, setOpen] = useState(false);
  const [openError, setOpenError] = React.useState(false);
  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [alias, setAlias] = useState('');
  const { currentUser } = useContext(AuthContext);

  const showSuccessMessage = () => {
    setOpenSuccess(true);
  };

  const showErrorMessage = () => {
    setOpenError(true);
  };

  const closeSuccessMessage = (event, reason) => {
    setOpenSuccess(false);
  };

  const closeErrorMessage = (event, reason) => {
    setOpenError(false);
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

  const getAlias = () => {
    fetch(BACKEND_URL + '/user',{
      headers: {
        'Authorization': 'Bearer ' + currentUser.stsTokenManager.accessToken
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      setAlias(data);
    })
    .catch(error => {
      console.log(error);
    });
  }

  useEffect(() => {
    getAlias();
  }, []);

  const BasicCard = () => {
    return (
    /*   <Card style={{ borderRadius: 5, border: "1px solid #9CE37D", backgroundColor: "white" }}>
        <CardContent style={{ color: "black" }}>
          <Typography variant="h5" component="div" style={{ color: "black" }}>
            Cambiar Contraseña
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="black">
            Si queres cambiar la contraseña, clickea abajo que te mandamos un mail para cambiarla.
          </Typography>
        </CardContent>
        <CardActions style={{ display: 'flex' }}>
          <Button style={{ marginLeft: 'auto', border: "1px solid #9CE37D", backgroundColor: "white", color: "black" }} size="small" onClick={() => { forgotPassword() }} variant="outlined">Mandar mail</Button>
        </CardActions>
      </Card> */
      <Grid item xs={12}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 150,
              }}>
              <Stack>
              <Title>Cambiar Contraseña</Title>
              <Typography sx={{ mb: 1.5 }} color="black">
                Si queres cambiar la contraseña, clickea abajo que te mandamos un mail para cambiarla.
              </Typography>
              <CardActions style={{ display: 'flex' , padding:0}}>
              <Button style={{ marginLeft: 'auto', border: "1px solid #9CE37D", backgroundColor: "white", color: "black" }} size="small" onClick={() => { forgotPassword() }} variant="outlined">Mandar mail</Button>
              </CardActions>
              </Stack>
            </Paper>
      </Grid>
    );
  }
  const AliasCard = () => {
    return (

     /*  <Card style={{ borderRadius: 5, border: "1px solid #9CE37D", backgroundColor: "white" }}>
        <CardContent style={{ color: "black" }}>
          <Typography variant="h5" component="div" style={{ color: "black" }}>
            Alias
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="black" style={{display:'flex',justifyContent:'center'}}>
            AKSDJDJSKDJ
          </Typography>
        </CardContent>
        <CardActions style={{ display: 'flex' }}>
          <Button style={{ marginLeft: 'auto', border: "1px solid #9CE37D", backgroundColor: "white", color: "black" }} size="small" onClick={() => { forgotPassword() }} variant="outlined">Mandar mail</Button>
        </CardActions>
      </Card> */
      <Grid item xs={12}>
      <Paper
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          height: 150,
        }}>
        <Title>Alias</Title>
        <Typography component="p" variant="h5" style={{display:'flex',justifyContent:'center'}}>
          {alias}
        </Typography>
      </Paper>
      </Grid>
    );
  } 

  return (

    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />

          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
           
              <Grid container spacing={3}>
                <Grid item xs={12}>
                <BasicCard className='child' />
                </Grid> 
                <Grid item xs={12}>
                <AliasCard className='child' />
                </Grid>
              </Grid>
          </Container>

          
        </Box>
      </Box>
      <CustomAlert text={"¡Se ha enviado un email de cambio de contraseña!"} severity={"success"} open={openSuccess} closeAction={closeSuccessMessage} />
      <CustomAlert text={"Hubo un error. Intenta nuevamente mas tarde."} severity={"error"} open={openError} closeAction={closeErrorMessage} />
    </ThemeProvider>);

   /*  <div className='settings'>
      <BasicCard className='child' />
      <CustomAlert text={"¡Se ha enviado un email de cambio de contraseña!"} severity={"success"} open={openSuccess} closeAction={closeSuccessMessage} />
      <CustomAlert text={"Hubo un error. Intenta nuevamente mas tarde."} severity={"error"} open={openError} closeAction={closeErrorMessage} />
    </div> */
  
}

export default Settings