import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Chart from './Chart';
import Gastos from './Gastos';
import Orders from './Orders';
import { AuthContext } from "../context/AuthContext";
import { useContext, useState, useEffect } from "react";
import { GraficoPie } from "./GraficoPie";
import { BACKEND_URL } from "../CONSTANTS";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TextField } from '@material-ui/core';
import { MultiSelect } from "react-multi-select-component";
import Button from '@mui/material/Button'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Stack from '@mui/material/Stack';
import EditExpenseModal from './EditExpenseModal';
import { Modal } from '@mui/material';
import Presupuesto from './Presupuesto';
import EditIncome from './EditIncome';
import SendMoney from './SendMoney';
import "../assets/scss/moneyManager.scss";
import Typography from '@mui/material/Typography';
import { margin } from '@mui/system';


const mdTheme = createTheme();

export default function DashboardContent(props) {
  const addCommas = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

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
  let months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  const { currentUser } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [budget, setBudget] = useState({});
  //Este total hay que pasarselo al nuevo componente (es el total del periodo)
  const [total, setTotal] = useState(0);
  const [totalForMonth, setTotalForMonth] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [historicalTransactions, setHistoricalTransactions] = useState([]);
  const [dateFrom, setDateFrom] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [dateTo, setDateTo] = useState(today);
  const [selected, setSelected] = useState([]);
  const [balance, setBalance] = useState(0);
  const [selectedCategoriesArray, setSelectedCategoriesArray] = useState([]);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const handleAgregarGasto = () => setOpen(true)
  const handleClose = () => { setOpen(false); }
  const [openIncome, setOpenIncome] = useState(false);
  const handleCloseIncome = () => { setOpenIncome(false); }
  const [sendMoney, setSendMoney] = useState(false);
  const handleCloseSendMoney = () => { setSendMoney(false); }
  const [userInformation, setUserInformation] = useState();

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
          let expenses = transactions.filter((transaction) => transaction.type === "expense" || transaction.type === "transfer_send")
          setTotal(expenses.reduce((total, transaction) => total = total + parseFloat(transaction.value), 0));
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

  const getCurrentBudget = () => {
    fetch(BACKEND_URL + '/budget/current', {
      'headers': {
        'Authorization': 'Bearer ' + currentUser.stsTokenManager.accessToken
      }
    })
      .then((response) => response.json())
      .then((res) => {
        setBudget(res)


      })
      .catch((err) => {
        console.log(err.message);
      });

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
        let expenses = transactions.filter((transaction) => transaction.type === "expense" || transaction.type === "transfer_send")
        setTotalForMonth(expenses.reduce((total, transaction) => total = total + parseFloat(transaction.value), 0))
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
    let expenses = transactions.filter((transaction) => transaction.type === "expense")
    setTotal(expenses.reduce((total, transaction) => total = total + parseFloat(transaction.value), 0));
  }

  const calculateBalance = (transactions) => {
    let total = 0
    transactions.forEach(transaction => {
      if (transaction.type === "income" || transaction.type === "transfer_receive") {
        total = total + parseFloat(transaction.value)
      } else {
        total = total - parseFloat(transaction.value)
      }

      setBalance(total)

    });
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

        calculateBalance(actualData)

        getAllCategoriesForMultiSelect(actualData)
      })
      .catch((err) => {
        console.log(err.message);
      });

  }

  const getMyAlias = () => {
    fetch(BACKEND_URL + '/users/currentUser', {
      'headers': {
        'Authorization': 'Bearer ' + currentUser.stsTokenManager.accessToken
      }
    })
      .then((response) => response.json())
      .then((actualData) => {
        setUserInformation(actualData)
      })
      .catch((err) => {
        console.log(err.message);
      });

  }




  useEffect(() => {
    applyDateFilter()
    getCurrentBudget()
    getMyAlias()
  }, [])

  useEffect(() => {
    setLoading(true)
    getTransactionsForMultiSelect()
    getAllMonthTransactionsForTotal()
    getCurrentBudget()
  }, [transactions])


  const onKeyDown = (e) => {
    e.preventDefault();
  };

  let page = false ?
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
              {/* Presupuesto */}
              <Presupuesto budget={budget} />
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

              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <Stack spacing={3}>
                    <div>
                      <Gastos total={totalForMonth} month={months[today.getMonth()] + " " + today.getFullYear()} />
                    </div>
                  </Stack>

                </Paper>
              </Grid>


              {/* Recent Deposits */}
              <Grid item xs={12} md={12} lg={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 260,
                    textAlign: 'center'
                  }}
                >
                  <Stack spacing={3}>
                    <div>
                      <Typography color="text.secondary" sx={{ flex: 1 }}>
                        Saldo
                      </Typography>
                      <Typography component="p" variant="h4">
                        $ {addCommas(balance)}
                      </Typography>
                    </div>
                    <div className='boton-agregar-gastos-dashboard' style={{marginBottom:"20"}}>
                      <Button style={{ marginRight: "10px" }} sx={styles} className="add-expense-button" variant='outlined' onClick={handleAgregarGasto}>
                        AGREGAR GASTO
                      </Button>
                      <Button style={{ marginRight: "10px", marginLeft: "10px" }} sx={styles} className="add-expense-button" variant='outlined' onClick={() => { setOpenIncome(true) }}>
                        INGRESAR DINERO
                      </Button>
                      <Button style={{ marginLeft: "10px" }} sx={styles} className="add-expense-button" variant='outlined' onClick={() => { setSendMoney(true) }}>
                        ENVIAR DINERO
                      </Button>
                    </div>
                    <Typography color="text.secondary" sx={{ flex: 1 }}>
                        Para recibir transferencias utiliza el siguiente alias:
                      </Typography>
                      <Typography  component="p" variant="h6">
                        {userInformation}
                      </Typography>
                  </Stack>
                  <Modal
                    open={open} onClose={handleClose}>
                    <div className="add-expense-modal">
                      <EditExpenseModal action={'Nuevo'} handleCloseModal={handleClose} confirmAction={applyDateFilter} balance={balance} />
                    </div>
                  </Modal>

                  <Modal
                    open={sendMoney} onClose={handleCloseSendMoney}>
                    <div className="add-expense-modal">
                      <SendMoney action={'Nuevo'} handleCloseModal={handleCloseSendMoney} confirmAction={applyDateFilter} balance={balance} />
                    </div>
                  </Modal>

                  <Modal
                    open={openIncome} onClose={handleCloseIncome}>
                    <div className="add-expense-modal">
                      <EditIncome action={'Nuevo'} handleCloseModal={handleCloseIncome} confirmAction={applyDateFilter} />
                    </div>
                  </Modal>


                </Paper>
              </Grid>
              {/* Grafico Chona */}
              <Grid item xs={12} md={8} lg={8}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 320,
                  }}
                >
                  <GraficoPie transactions={transactions.filter(transaction => (transaction.type === "expense" || transaction.type === "transfer_send"))} total={total} />
                </Paper>
              </Grid>
              {/* Filtro de Fecha */}
              <Grid item xs={12} md={4} lg={4}>
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
                        renderInput={(params) => <TextField onKeyDown={onKeyDown} {...params} />}
                      />
                      <DesktopDatePicker
                        label="Hasta"
                        inputFormat="MM/DD/YYYY"
                        value={dateTo}
                        onChange={handleChangeTo}
                        disableFuture='true'
                        renderInput={(params) => <TextField onKeyDown={onKeyDown} {...params} />}
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
                  <Orders transactions={transactions} confirmAction={applyDateFilter} balance={balance} />
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

