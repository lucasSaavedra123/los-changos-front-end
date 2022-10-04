import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { red } from '@mui/material/colors';
import ModalDetailedExpenseCard from './ModalDetailedExpenseCard';
import { Modal } from '@material-ui/core';
import { useState } from 'react';
import ExpendCard from './ExpendCard';
import "../assets/scss/expenseCard.scss"
import { useEffect } from 'react';
import { Label } from '@mui/icons-material';


function Row() {
  //const { expenseDetails } = props;
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  /*
  return (
    <div className='table-row-container'>
      <TableRow className="table-row" onClick={()=>setOpen(!open)} >
        <TableCell className='table-cell'>
            <ExpendCard title={"Cafe Eatbar"} value={"200"}/>
        </TableCell>
      </TableRow>
      <Modal open={open} onClose={handleClose}>
            <ModalDetailedExpenseCard title={"Cafe EatBar"} value={"200"} date={"2 de Octubre"} category={"Buen vivir"}/>
    </Modal>
    </div>
  );
  onClick={()=>setOpen(!open)}
  */
  return (
    <div className='table-row-container'>
      <TableRow className="table-row"  >
            <ExpendCard title={"Cafe Eatbar"} value={"200"}/>
      </TableRow>
    </div>
  );
}
export default function MovementsTable() {

  const [transactions, setTransactions] = useState([]);
  const getTransactions = () =>{
       fetch('http://walletify-backend-develop.herokuapp.com/transaction')
           .then((response) => response.json())
           .then((actualData) =>{ 
               setTransactions(actualData);   
           })
               .catch((err) => {
               console.log(err.message);
           });


  }

  useEffect(() => {
   getTransactions()
  }, [transactions]);




  return (
    <TableContainer component={Paper} className="table-container">
      <Table aria-label="collapsible table" className="table">
        <TableBody className="table-body">
          {transactions.map((transaction) => (
            
          
            <ExpendCard id={transaction.id} title={transaction.name} value={transaction.value} date={transaction.date} category={transaction.category} />
            

          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}