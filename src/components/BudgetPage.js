import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import "../assets/scss/settings.scss"
import Paper from '@mui/material/Paper';
import "../assets/scss/expenseCard.scss"
import EditBudgetModal from './EditBudgetModal';
import { useState, useContext, useEffect } from 'react';
import Title from './Title';
import { Button, ButtonBase } from '@mui/material';
import {Modal} from '@mui/material';
import Presupuesto from './Presupuesto';
import {Stack} from '@mui/material';
import { BACKEND_URL } from "../CONSTANTS";
import { AuthContext } from "../context/AuthContext";

const mdTheme = createTheme();

const BudgetPage = () => {
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
  const handleClose = () => {setOpen(false);}
  const [budgets, setBudgets] = useState([]);
  const { currentUser } = useContext(AuthContext);

  const getBudgets = () =>{
    fetch(BACKEND_URL+'/budget', {
     'headers': {
       'Authorization': 'Bearer ' + currentUser.stsTokenManager.accessToken
     }
    })
        .then((response) => response.json())
        .then((res) =>{ 
          setBudgets(res)


        })
            .catch((err) => {
            console.log(err.message);
        });

}


  useEffect(() => {
    getBudgets();
  }, [budgets])


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
          <Stack>
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
          <React.Fragment>
            <div className='table-title'>
                <div className='titulo-principal'>
                    <Title>
                        Mis Presupuestos
                    </Title>
                </div>
                <div className='boton-principal'>
                    <Button sx={styles} className="add-expense-button" variant='outlined' onClick={() => setOpen(!open)}>
                        AGREGAR PRESUPUESTO
                    </Button>
                </div>
                <Modal
                    open={open} onClose={handleClose}>
                    <div className="add-expense-modal">
                        <EditBudgetModal action={'Nueva'} handleCloseModal={handleClose}  />
                    </div>
                </Modal>

            </div>
          </React.Fragment>



            </Paper>
            </Grid>

            {budgets.map((budgetItem) => {
              return(
                <>
                <Grid item xs={12} lg={10} md={10}>
            
                <Presupuesto budget={budgetItem}/> 
              
              </Grid>
              <Grid item xs={2} lg={2} md={2}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Stack>
                <Button>DELETE</Button>
                <Button>EDIT</Button>
                </Stack>
                </Paper>
              </Grid>
              </>
              )
            })}

            
          </Grid>

          
            
          </Stack>
        </Container>
      </Box>
    </Box>
  </ThemeProvider>);

}

export default BudgetPage