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
import AddCategoryModal from './AddCategoryModal';

export const ExpenseDynamicCategory = (props) => {
    const [isHovering, setIsHovering] = useState(false);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleClick= ()=>{
        
    }

    const handleMouseOver = () => {
        setIsHovering(true);
        console.log("Me active")
        
        
      };
    const handleMouseOut = () => {
        setIsHovering(false);
        console.log("Me desactive")
      }

    const deleteCategory= (e) => {
        e.preventDefault();
        console.log(
        fetch('https://walletify-backend-develop.herokuapp.com/category', {
        method: 'DELETE', 
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            id: props.id
            })

        
        }))
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
                        <AddCategoryModal/>
                </Modal>           
            
        </div>
        </>
    );

}

export default ExpenseDynamicCategory;
