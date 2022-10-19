import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Chart from './Chart';
import Gastos from './Gastos';
import Orders from './Orders';
import { AuthContext } from "../context/AuthContext";
import { useContext, useState, useEffect } from "react";
import { GraficoPie } from "./GraficoPie";
import { BACKEND_URL } from "../CONSTANTS";
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TextField } from '@material-ui/core';
import { MultiSelect } from "react-multi-select-component";
import Button from '@mui/material/Button'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Stack from '@mui/material/Stack';
import { DotLoader } from 'react-spinners';

const mdTheme = createTheme();

export default function DashboardContent(props) {

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


  let today = new Date();
  const { currentUser } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  //Este total hay que pasarselo al nuevo componente (es el total del periodo)
  const [total, setTotal] = useState(0);
  const [totalForMonth, setTotalForMonth] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [historicalTransactions, setHistoricalTransactions] = useState([]);
  const [dateFrom, setDateFrom] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [dateTo, setDateTo] = useState(today);
  const [selected, setSelected] = useState([]);
  const [selectedCategoriesArray, setSelectedCategoriesArray] = useState([]);
  const [options, setOptions] = useState([])
  const [loading, setLoading] = useState(true)

  const getSelectedCategoriesArray = (e) => {
    console.log(e)
    setSelected(e);
    let selectedCategory = []
    e.map((category) => {
      selectedCategory.push(category.value)
    })
    setSelectedCategoriesArray(selectedCategory)
  }
  const applyDateFilter = () => {
    if (selected.length === 0) {
      setLoading(true)
      fetch(BACKEND_URL + '/expense/filter', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + currentUser.stsTokenManager.accessToken,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },


        body: JSON.stringify({
          timeline: [dateFrom.toISOString().split('T')[0], dateTo.toISOString().split('T')[0]],
          category_id: [],
        })


      })
        .then((res) => res.json())
        .then((transactions) => {
          setTransactions(transactions)
          setTotal(transactions.reduce((total, transaction) => total = total + parseFloat(transaction.value), 0));
          setLoading(false)
        })
    } else {
      setLoading(true)
      fetch(BACKEND_URL + '/expense/filter', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + currentUser.stsTokenManager.accessToken,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },


        body: JSON.stringify({
          timeline: [dateFrom.toISOString().split('T')[0], dateTo.toISOString().split('T')[0]],
          category_id: selectedCategoriesArray,
        })


      })
        .then((res) => res.json())
        .then((data) => {
          setLoading(false)
          updateFilterTransactions(data)
        })
    }
  }

  const getAllMonthTransactionsForTotal = () => {
    fetch(BACKEND_URL + '/expense/filter', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + currentUser.stsTokenManager.accessToken,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },


      body: JSON.stringify({
        timeline: [new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split('T')[0], today.toISOString().split('T')[0]],
        category_id: [],
      })


    })
      .then((res) => res.json())
      .then((transactions) => {
        setTotalForMonth(transactions.reduce((total, transaction) => total = total + parseFloat(transaction.value), 0))
        setLoading(false)
      })
  }

  const getAllCategoriesForMultiSelect = (historicalTransactions) => {
    let categories = {}
    historicalTransactions.map((transaction) => {
      categories[transaction.category.name] = transaction.category.id
    });
    let names = Object.keys(categories);
    let optionsAux = []
    names.map((name) => {
      let option = {
        label: name,
        value: categories[name]
      }
      optionsAux.push(option)
    })
    setOptions(optionsAux)
  }


  const handleChangeFrom = (newValue) => {
    setDateFrom(newValue);
  };

  const handleChangeTo = (newValue) => {
    setDateTo(newValue);
  };

  const updateFilterTransactions = (transactions) => {
    setTransactions(transactions)
    let categories = {}
    transactions.map((transaction) => {
      categories[transaction.category.name] = transaction.category.id
    });
    setTotal(transactions.reduce((total, transaction) => total = total + parseFloat(transaction.value), 0));
  }


  const getTransactionsForMultiSelect = () => {
    fetch(BACKEND_URL + '/expense', {
      'headers': {
        'Authorization': 'Bearer ' + currentUser.stsTokenManager.accessToken
      }
    })
      .then((response) => response.json())
      .then((actualData) => {
        setHistoricalTransactions(transactions)
        getAllCategoriesForMultiSelect(actualData)
      })
      .catch((err) => {
        console.log(err.message);
      });

  }


  const handleAgregarGasto = () => setOpen(true);
  const handleClose = () => { setOpen(false); };

  useEffect(() => {
    applyDateFilter()
  }, [])

  useEffect(() => {
    setLoading(true)
    getTransactionsForMultiSelect()
    getAllMonthTransactionsForTotal()
  }, [transactions])

  let page = loading ?
    //ACA VA EL LOADING INDICATOR
    <div></div>
    :
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
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <Chart transactions={historicalTransactions} />
                </Paper>
              </Grid>
              {/* Recent Deposits */}
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <Gastos total={totalForMonth} month={"Octubre 2022"} />
                </Paper>
              </Grid>
              {/* Grafico Chona */}
              <Grid item xs={8} md={8} lg={8}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 320,
                  }}
                >
                  <GraficoPie transactions={transactions} total={total} />
                </Paper>
              </Grid>
              {/* Filtro de Fecha */}
              <Grid item xs={4} md={4} lg={4}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 320,
                  }}
                >



                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Stack spacing={3}>
                      <DesktopDatePicker
                        label="Desde"
                        inputFormat="MM/DD/YYYY"
                        value={dateFrom}
                        onChange={handleChangeFrom}
                        sx={{ color: '#9CE37D;' }}
                        disableFuture='true'
                        renderInput={(params) => <TextField {...params} />}
                      />
                      <DesktopDatePicker
                        label="Hasta"
                        inputFormat="MM/DD/YYYY"
                        value={dateTo}
                        onChange={handleChangeTo}
                        disableFuture='true'
                        renderInput={(params) => <TextField {...params} />}
                      />
                      <MultiSelect
                        options={options}
                        value={selected}
                        onChange={getSelectedCategoriesArray}
                        labelledBy="Select"
                      />
                      <Button sx={styles} className="add-expense-button" variant='outlined' onClick={() => { applyDateFilter() }}>Aplicar</Button>


                    </Stack>
                  </LocalizationProvider>
                </Paper>
              </Grid>
              {/* Recent Orders */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Orders transactions={transactions} confirmAction={applyDateFilter} />
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  return (
    page
  );
}
