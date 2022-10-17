import MoneyDetails from "./MoneyDetails";
import "../assets/scss/moneyManager.scss"
import { AuthContext } from "../context/AuthContext";
import { useContext, useState, useEffect } from "react";
import MovementsTable from "./MovementsTable";
import Button from '@mui/material/Button'
import { Modal } from '@material-ui/core';
import { Link } from "react-router-dom";
import {GraficoPie}  from "./GraficoPie";
import EditExpenseModal from "./EditExpenseModal";
import { BACKEND_URL } from "../CONSTANTS";
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TextField } from '@material-ui/core';
import { MultiSelect } from "react-multi-select-component";
import DashboardContent from "./Dashbord";


export const MoneyManager = () => {
  
  let today = new Date();
  const { currentUser } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [total, setTotal] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [dateFrom, setDateFrom] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [dateTo, setDateTo] = useState(today);
  const [selected, setSelected] = useState([]);
  const [options, setOptions] = useState([])

  console.log(transactions)

  const applyDateFilter = () => {
      console.log(dateTo.toISOString().split('T')[0])
      fetch(BACKEND_URL+'/expense/filter', {
          method: 'POST',
          headers: {
              'Authorization': 'Bearer ' + currentUser.stsTokenManager.accessToken,
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
  
          
          body: JSON.stringify({
              timeline:[dateFrom.toISOString().split('T')[0],dateTo.toISOString().split('T')[0]],
              //category_id: selected[0].value
          })
  
  
      })
      .then((res)=>res.json())
      .then((data) =>updateFilterTransactions(data))
  }


  const handleChangeFrom = (newValue) => {
      setDateFrom(newValue);
  };

  const handleChangeTo = (newValue) => {
      setDateTo(newValue);
  };

  const updateFilterTransactions = (transactions) =>{
    setTransactions(transactions)
    let categories = {}
    transactions.map((transaction) => {
      categories[transaction.category.name] = transaction.category.id
    });
    let names = Object.keys(categories);
    let optionsAux = []
    names.map((name)=>{
      let option = {
        label: name,
        value: categories[name]
      }
      optionsAux.push(option)


    })
    setOptions(optionsAux)
    setTotal(transactions.reduce((total,transaction) =>  total = total + parseFloat(transaction.value) , 0 )); 
  }


  const getTransactions = () =>{
    fetch(BACKEND_URL+'/expense', {
     'headers': {
       'Authorization': 'Bearer ' + currentUser.stsTokenManager.accessToken
     }
    })
        .then((response) => response.json())
        .then((actualData) =>{ 
          setTotal(actualData.reduce((total,transaction) =>  total = total + parseFloat(transaction.value) , 0 )); 
          if(JSON.stringify(actualData) != JSON.stringify(transactions)){
               setTransactions(actualData);
               console.log(actualData)
           }    
        })
            .catch((err) => {
            console.log(err.message);
        });

}


  const handleAgregarGasto = () => setOpen(true);
  const handleClose = () => {setOpen(false);};


  useEffect(() => {
    applyDateFilter()
    //getTransactions();
  }, []);

  return (
    // <div className="app-container">
    //   <div className="responsive-container">
    //     <div className="header-container">
    //       <h1 className="heading">¡Bienvenido a Walletify {currentUser.displayName}!</h1>
    //     </div>
    //   </div>
    //   <div style={{backgroundColor:"white"}}>
    //     Filtar desde: 
    //     <LocalizationProvider dateAdapter={AdapterDayjs}>
    //     <MobileDatePicker
    //             className="textfield"
    //             inputFormat="YYYY-MM-DD"
    //             maxDate={dateTo}
    //             value={dateFrom}
    //             onChange={handleChangeFrom}
    //             renderInput={(params) => <TextField {...params} />}
    //         />
    //     </LocalizationProvider>
    //     Hasta: 
    //     <LocalizationProvider dateAdapter={AdapterDayjs}>
    //     <MobileDatePicker
    //             className="textfield"
    //             minDate={dateFrom}
    //             maxDate={today}
    //             inputFormat="YYYY-MM-DD"
    //             value={dateTo}
    //             onChange={handleChangeTo}
    //             renderInput={(params) => <TextField {...params} />}
    //         />
    //     </LocalizationProvider>
    //     <Button className="add-expense-button" style={{color:"black", textDecoration:"none"}} onClick={applyDateFilter}>Aplicar</Button>
    //   </div>
    //   <div>
    //   <MultiSelect
    //     options={options}
    //     value={selected}
    //     onChange={setSelected}
    //     labelledBy="Select"
    //   />
    //   </div>
    //   <div className="pie-chart">
    //       <GraficoPie transactions={transactions}/>
    //   </div>
    //   <div className="balance">
    //     <MoneyDetails total={total}/>
    //   </div>
    //   <div className="add-expense-modal">
    //     <div className="add-expense" style={ {borderRadius: 5, border: "1px solid #9CE37D", backgroundColor: "black"}} >
    //       <Button className="add-expense-button" style={{color:"white", textDecoration:"none"}} onClick={handleAgregarGasto}>
    //         AGREGAR GASTO
    //       </Button>
    //     </div>
    //     <Modal
    //       open={open} onClose={handleClose}>
    //       <div className="add-expense-modal">
    //         <EditExpenseModal handleCloseModal={handleClose} confirmAction={applyDateFilter}/>
    //       </div>
    //     </Modal>
    //   </div>
    //   {/* <div className="chart"> Hola Chart</div> */}
    //   <div className="movements" >
    //     <MovementsTable transactions={transactions} confirmAction={applyDateFilter}/>
    //   </div>

    // </div>
    <DashboardContent total={total} transactions={transactions}/>
  )
}

export default MoneyManager;