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
import AddBudgetModal from './AddBudgetModal';
import { useState, useContext, useEffect } from 'react';
import Title from './Title';
import { Button, ButtonBase } from '@mui/material';
import {Modal} from '@mui/material';
import Presupuesto from './Presupuesto';
import {Stack} from '@mui/material';
import { BACKEND_URL } from "../CONSTANTS";
import { AuthContext } from "../context/AuthContext";
import DeleteIcon from '@mui/icons-material/Delete';
import CustomAlert from "./CustomAlert";

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
  const [openValueError, setopenValueError] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const closeValueError = () => setopenValueError(false);

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
  }, [])

  const deleteBudget = (budget,e) => {
    e.preventDefault(e);
    if (window.confirm("¿Estas seguro que queres borrar este presupuesto?")) {
    fetch(BACKEND_URL + '/budget', {
      method: 'DELETE',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + currentUser.stsTokenManager.accessToken
      },
      body: JSON.stringify({
          id: budget.id
      })


  }).then(() => { getBudgets() })
  }
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
                        <AddBudgetModal action={'Nueva'} handleCloseModal={handleClose} getBudgets={getBudgets} budgets={budgets}/>
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
                    height: 150,
                  }}
                >
                <div className='borrar-presupuesto'>
                <Button onClick={(e) => {

                  if(budgetItem.active){
                    setopenValueError(true);
                  }else{
                    deleteBudget(budgetItem,e);
                  }
                  
                  }}><DeleteIcon sx={{ color: "green" }} /></Button>
                </div>
                
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
    <CustomAlert text={"No se puede eliminar un presupuesto en curso"} severity={"error"} open={openValueError} closeAction={closeValueError} />
  </ThemeProvider>);

}

export default BudgetPage