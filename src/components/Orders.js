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
import { Modal } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';
import { Button } from "@mui/material";
import "../assets/scss/moneyManager.scss"

function preventDefault(event) {
  event.preventDefault();
}

export default function Orders(props) {

    const [open, setOpen] = useState(false);
    const [openCategory, setCategoryOpen] = useState(false)
    const { currentUser } = useContext(AuthContext);
    const handleAgregarGasto = () => setOpen(true);
    const handleClose = () => {setOpen(false);};
   

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
    <React.Fragment>
      <div className='table-title'>
        <div className='titulo-principal'>
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
          Gastos Recientes
        </Typography>
        </div>
        <div className='boton-principal'>
          <Button className="add-expense-button" variant='outlined'onClick={handleAgregarGasto}>
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
      
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Fecha</TableCell>
            <TableCell>Nombre de Gasto</TableCell>
            <TableCell>Valor</TableCell>
            <TableCell>Accion</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {props.transactions.map((transaction) => (
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
    </React.Fragment>
  );
}