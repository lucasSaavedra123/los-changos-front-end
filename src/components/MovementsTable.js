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
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export default function MovementsTable() {


  const { currentUser } = useContext(AuthContext);


  const [transactions, setTransactions] = useState([]);
  const getTransactions = () =>{
       fetch('http://walletify-backend-develop.herokuapp.com/transaction', {
        'headers': {
          'Authorization': 'Bearer ' + currentUser.stsTokenManager.accessToken
        }})
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
    <TableContainer component={Paper} >
      <Table>
        <TableHead>
          <TableRow>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow hover key={transaction.id} style={{borderRadius: 5, border: "1px solid #9CE37D",backgroundColor: "black" }}>
              <ExpendCard id={transaction.id} title ={transaction.name} value={transaction.value} date={transaction.date} category={transaction.category} ></ExpendCard>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}