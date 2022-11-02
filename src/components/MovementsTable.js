import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ExpendCard from './ExpendCard';
import "../assets/scss/expenseCard.scss"

export default function MovementsTable(props) {
  return (
    <TableContainer component={Paper} >
      <Table>
        <TableHead>
          <TableRow style={{borderRadius: 5, border: "1px solid #9CE37D",backgroundColor: "black",color:'white'}}>
            Movimientos
          </TableRow>
        </TableHead>
        <TableBody>
          {props.transactions.map((transaction) => (
            <TableRow hover key={transaction.id} style={{borderRadius: 5, border: "1px solid #9CE37D",backgroundColor: "black" }}>
              <ExpendCard id={transaction.id} title ={transaction.name} value={transaction.value} date={transaction.date} category={transaction.category} confirmAction={props.confirmAction} ></ExpendCard>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}