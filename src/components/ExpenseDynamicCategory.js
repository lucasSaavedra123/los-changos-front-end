import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
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

export const ExpenseDynamicCategory = (props) => {
    const [isHovering, setIsHovering] = useState(false);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { currentUser } = useContext(AuthContext);

    const handleClick= ()=>{
        
    }

    const handleMouseOver = () => {
        setIsHovering(true);
        
        
      };
    const handleMouseOut = () => {
        setIsHovering(false);
      }

    const deleteCategory= (e) => {
        e.preventDefault();

        if(window.confirm("Si borras una categoria, se eliminan todas las transacciones pertenecientes a ella. ¿Estas seguro?")){

        fetch('https://walletify-backend-develop.herokuapp.com/category', {
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
        
        <div className={"type-category-container"}>
                <div className='expense-category-left-side'>
                    <div className='expense-category-icon'>
                        <CategoryIcon name={props.icon}></CategoryIcon>
                    </div>
                    <div className='category-title'>{props.title}</div>
                </div>
                <div className='category-buttons'>
                    <div>
                    <Button onClick={deleteCategory}><DeleteIcon/></Button>
                    </div>
                    <div>
                    <Button onClick={()=>setOpen(!open)}><EditIcon/></Button>
                    </div>
                </div> 
                <Modal open={open} onClose={handleClose} >
                        <EditCategoryModal icon={props.icon} name={props.title} handleCloseModal={handleClose} id={props.id}/>
                </Modal>           
            
        </div>
        </>
    );

}

export default ExpenseDynamicCategory;
