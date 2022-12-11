import React, { useEffect, useContext } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import "../assets/scss/settings.scss"
import Paper from '@mui/material/Paper';
import "../assets/scss/expenseCard.scss"
import { AuthContext } from "../context/AuthContext";
import { BACKEND_URL } from "../CONSTANTS"; 
import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { TableContainer, TablePagination } from '@mui/material';
import Categories from './Categories';
import NotificationItem from './NotificationItem';
import {Typography }from '@mui/material';

const mdTheme = createTheme();

const NotificationsPage = () => {

  const [pendingTransactions, setPendingTransactions] = useState([])
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);
  const { currentUser } = useContext(AuthContext);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getPendingTransactions = () => {
    fetch(BACKEND_URL + '/sharedExpense/pending', {
      headers: { 'Authorization': 'Bearer ' + currentUser.stsTokenManager.accessToken }
    }).then((response) => response.json())
      .then((data) => {
        console.log(data)
        setPendingTransactions(data)
      })
      .catch((error) => {
        console.error('Error:', error);
      });

  }
  useEffect(() => {
    getPendingTransactions()
  }, [])


  console.log(pendingTransactions)
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
              {/* Chart */}
              <Grid item xs={12}>
               


                  <Grid item xs={12}>
                    {pendingTransactions.length === 0?( 
                       <Paper
                       sx={{
                         p: 2,
                         display: 'flex',
                         flexDirection: 'column',
                       }}
                     >
                        <div className='table-title'>
                        <div className='titulo-principal'>
                            <Typography component="h2" variant="h6" color="primary" gutterBottom style={{ color: "green" }}>
                                {"Notificaciones"}
                            </Typography>
                            <div>No hay notificaciones pendientes</div>
                        </div>
        
                    </div>
                      </Paper>



                    ):(
                      <>
                    <TableContainer>
                      <Table >
                        <TableHead>
                          <TableRow>

                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {pendingTransactions
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                              .map((transaction) => (
                                <Grid container spacing={4} style={{ marginBottom: '10px' }}>
                                  <Grid item xs={12} lg={12} md={12}>

                                    <NotificationItem expense={transaction} confirmAction={getPendingTransactions}/>


                                  </Grid>

                                </Grid>

                              ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <TablePagination
                      style={{ display: 'flex', justifyContent: 'right' }}
                      component="div"
                      rowsPerPageOptions={[5, 10, 25]}
                      count={pendingTransactions.length}
                      page={page}
                      onPageChange={handleChangePage}
                      rowsPerPage={rowsPerPage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                    </>
                    
                    )
                    
                    }
                  </Grid>

                
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>);

}

export default NotificationsPage