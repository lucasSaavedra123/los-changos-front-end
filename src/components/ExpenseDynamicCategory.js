import * as React from 'react';
import "../assets/scss/expenseCard.scss"
import { Button } from '@mui/material';
import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import CategoryIcon from './CategoryIcon';
import EditIcon from '@mui/icons-material/Edit';
import {Modal} from '@mui/material';
import EditCategoryModal from './EditCategoryModal';
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { BACKEND_URL } from '../CONSTANTS';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

export const ExpenseDynamicCategory = (props) => {
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const { currentUser } = useContext(AuthContext);

    const deleteCategory= (e) => {
        e.preventDefault();

        if(window.confirm("Si borras una categoria, se eliminan todas las transacciones a ella. Si tenias algun detalle de presupuesto asociado a esta categoria, quedará eliminada tambien. ¿Estas seguro?")){

        fetch(BACKEND_URL+'/category', {
        method: 'DELETE', 
        headers: {
            'Authorization': 'Bearer ' + currentUser.stsTokenManager.accessToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            id: props.id
            })

        
        }).finally(()=>{props.confirmAction()})
    }
    }

    return (
        <>
        <TableRow hover key={props.id} value={props.category}>
            <TableCell><CategoryIcon name={props.icon} color={props.color}></CategoryIcon></TableCell>
            <TableCell>{props.name}</TableCell>
            <TableCell>
            <div className='category-buttons'>
                    <div>
                    <Button onClick={deleteCategory}><DeleteIcon sx={{color:'black'}}/></Button>
                    </div>
                    <div>
                    <Button onClick={()=>setOpen(!open)}><EditIcon sx={{color:'black'}}/></Button>
                    </div>
                </div> 
                <Modal open={open} onClose={handleClose} >
                        <EditCategoryModal action={'Editar'} icon={props.icon} name={props.name} handleCloseModal={handleClose} id={props.id} confirmAction={props.confirmAction}/>
                </Modal>         

            </TableCell>
        </TableRow>
        

        </>
    );

}

export default ExpenseDynamicCategory;
