import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ExpendCard from './ExpendCard';
import EditExpenseModal from './EditExpenseModal';
import { useState } from 'react';
import { Modal, TableContainer, TablePagination } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Button } from "@mui/material";
import "../assets/scss/moneyManager.scss";

export default function Orders(props) {


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
    const handleAgregarGasto = () => setOpen(true);
    const handleClose = () => {setOpen(false);};
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [page, setPage] = React.useState(0);

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };


  return (
    <React.Fragment style={{color: "green"}}>
      <div className='table-title'>
        <div className='titulo-principal'>
        <Typography component="h2" variant="h6" color="primary" gutterBottom style={{color: "green"}}>
          Gastos del período
        </Typography>
        </div>
        <div className='boton-principal'>
        <Button sx={styles} className="add-expense-button" variant='outlined' onClick={handleAgregarGasto}>
              AGREGAR GASTO
        </Button>
        </div>
        <Modal
          open={open} onClose={handleClose}>
          <div className="add-expense-modal">
             <EditExpenseModal action={'Nuevo'} handleCloseModal={handleClose} confirmAction={props.confirmAction}/>
           </div>
         </Modal>
       
      </div>
      <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell style={{color: "green"}}>Fecha</TableCell>
            <TableCell style={{color: "green"}}>Nombre de Gasto</TableCell>
            <TableCell style={{color: "green"}}>Valor</TableCell>
            <TableCell style={{color: "green" , textAlign:'center'}}>Accion</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {props.transactions
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((transaction) => (

            <ExpendCard id={transaction.id} name ={transaction.name} value={transaction.value} date={transaction.date} category={transaction.category} confirmAction={props.confirmAction}  />
            
          ))}
        </TableBody>
      </Table>
      </TableContainer>
      <TablePagination
      component="div"
      rowsPerPageOptions={[5, 10, 25]}
      count={props.transactions.length}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
    </React.Fragment>
  );
}