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
import EditBudgetModal from './EditBudgetModal';
import { useState, useContext, useEffect } from 'react';
import Title from './Title';
import { Button, ButtonBase } from '@mui/material';
import { Modal } from '@mui/material';
import Presupuesto from './Presupuesto';
import { Stack } from '@mui/material';
import { BACKEND_URL } from "../CONSTANTS";
import { AuthContext } from "../context/AuthContext";
import DeleteIcon from '@mui/icons-material/Delete';
import CustomAlert from "./CustomAlert";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { TableContainer, TablePagination } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

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
  const handleClose = () => { setOpen(false); }
  const handleCloseEdit = () => { setOpenEdit(false); }
  const [openEdit, setOpenEdit] = useState(false);
  const [budgets, setBudgets] = useState([]);
  const [openValueError, setopenValueError] = useState(false);
  const [openEditError, setOpenEditError] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);
  const [editBudgetItem, setEditBudgetItem] = useState({});


  const closeValueError = () => setopenValueError(false);
  const closeEditError = () => setOpenEditError(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const openBudgetModal = (budgetItem) => {
    setEditBudgetItem(budgetItem);
    setOpenEdit(true);
  }


  const getBudgets = () => {
    fetch(BACKEND_URL + '/budget', {
      'headers': {
        'Authorization': 'Bearer ' + currentUser.stsTokenManager.accessToken
      }
    })
      .then((response) => response.json())
      .then((res) => {
        setBudgets(res)


      })
      .catch((err) => {
        console.log(err.message);
      });

  }
  
  
  useEffect(() => {
    getBudgets();
  }, [])

  const deleteBudget = (budget, e) => {
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
           
              <Grid container spacing={3}>
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
                            <AddBudgetModal action={'Nueva'} handleCloseModal={handleClose} budgets={budgets} getBudgets={getBudgets} />
                          </div>
                        </Modal>

                        <Modal
                          open={openEdit} onClose={handleCloseEdit}>
                          <div className="add-expense-modal">
                            <EditBudgetModal action={'Nueva'} handleCloseModal={handleCloseEdit} budgets={budgets} budget={editBudgetItem} getBudgets={getBudgets} />
                          </div>
                        </Modal>

                      </div>
                    </React.Fragment>
                  </Paper>
                </Grid>
                
                <Grid item xs={12}>
                  <TableContainer>
                  <Table >
                    <TableHead>
                      <TableRow>

                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {budgets
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((budgetItem) => (
                          <Grid container spacing={3} style={{marginBottom:'10px'}}>
                          <Grid item xs={12} lg={10} md={10}>

                            <Presupuesto budget={budgetItem} />


                          </Grid>
                          <Grid item xs={2} lg={2} md={2}>
                          <Paper
                              sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'row',
                                height: 130,
                              }}
                            >
                            {/* <div className='borrar-presupuesto'> */}
                            
                            <Button onClick={(e) => {
            
                              if(budgetItem.active){
                                setopenValueError(true);
                              }else{
                                deleteBudget(budgetItem,e);
                              }
                              
                              }}><DeleteIcon sx={{ color: "green" }} /></Button>
                            
                            
                              <Button style={{marginLeft:'5px'}} onClick={()=>{
                                if(new Date(budgetItem.initial_date + "T00:00:00") <= new Date()){
                                  setOpenEditError(true);
                                }else{
                                  openBudgetModal(budgetItem)
                                }
                                
                                }}><EditIcon sx={{color:'green'}}/></Button>
                            
                            {/* </div> */}
                            
                          </Paper>
                          </Grid>
                          </Grid>

                        ))}
                    </TableBody>
                  </Table>
                  </TableContainer>
                  <TablePagination 
                  style={{display:'flex',justifyContent:'right'}}
                  component="div"
                  rowsPerPageOptions={[5, 10, 25]}
                  count={budgets.length}
                  page={page}
                  onPageChange={handleChangePage}
                  rowsPerPage={rowsPerPage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Grid>
                </Grid>
          
           
          </Container>

          );
        </Box>
      </Box>
      <CustomAlert text={"No se puede eliminar un presupuesto en curso"} severity={"error"} open={openValueError} closeAction={closeValueError} />
      <CustomAlert text={"No se puede editar un presupuesto finalizado o en curso"} severity={"warning"} open={openEditError} closeAction={closeEditError} />
    </ThemeProvider>);

}

export default BudgetPage