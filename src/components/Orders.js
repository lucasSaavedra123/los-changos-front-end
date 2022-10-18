import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import ExpendCard from './ExpendCard';
import ModalDetailedExpenseCard from './ModalDetailedExpenseCard';
import EditExpenseModal from './EditExpenseModal';
import CategoryIcon from './CategoryIcon';
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { BACKEND_URL } from "../CONSTANTS";
import { useState } from 'react';
import { Modal, TableContainer, TablePagination } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';
import { Button } from "@mui/material";
import "../assets/scss/moneyManager.scss";
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';

function preventDefault(event) {
  event.preventDefault();
}

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
    const [openCategory, setCategoryOpen] = useState(false)
    const { currentUser } = useContext(AuthContext);
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

    const handleCategoryClose = () => {
        setCategoryOpen(false)
    }

    const addCommas = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const deleteExpenseCard = (e) => {
        e.preventDefault();
        if(window.confirm("¿Estas seguro que queres borrar este gasto?")){
        fetch(BACKEND_URL+'/expense', {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + currentUser.stsTokenManager.accessToken
            },
            body: JSON.stringify({
                id: props.id
            })


        }).then(() => {props.confirmAction()})
    }

    }
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
             <EditExpenseModal handleCloseModal={handleClose}/>
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
            <TableCell style={{color: "green"}}>Accion</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {props.transactions
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((transaction) => (
            <TableRow hover key={transaction.id}>
                <TableCell>{transaction.date}</TableCell>
                <TableCell>{transaction.name}</TableCell>
                <TableCell>${addCommas(transaction.value)}</TableCell>
                <TableCell>
                    <div className='buttons-transactions-table'>
                    <div className='view-detailed-expense' onClick={() => setOpen(!open)}> 
                        <VisibilityIcon sx={{ color: "black" }}/>
                    </div>
                    <div className='delete-button' onClick={deleteExpenseCard}>
                        <DeleteIcon  sx={{ color: "black" }}/>
                    </div>
                    <div className='edit-button' onClick={() => setCategoryOpen(!openCategory)}>
                        <EditIcon sx={{ color: "black" }} />

                    </div>

                    <Modal open={openCategory}
                        onClose={handleCategoryClose} disableBackdropClick>
                        <EditExpenseModal confirmAction={props.confirmAction} category={props.category} id={props.id} date={props.date} name={props.title} value={props.value} handleCloseModal={handleCategoryClose}/>

                    </Modal>
        

                    </div>
                </TableCell>
              {/* <ExpendCard id={transaction.id} title ={transaction.name} value={transaction.value} date={transaction.date} category={transaction.category} confirmAction={props.confirmAction} ></ExpendCard> */}
            </TableRow>
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