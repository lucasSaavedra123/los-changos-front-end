import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import "../assets/scss/expenseCard.scss"
import { Button } from 'react-bootstrap';
import { useState } from 'react';
import CategoryIcon from './CategoryIcon';

export const ExpenseCategory = (props) => {
    const [isHovering, setIsHovering] = useState(false);

    
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

    return (
        <>
        
        <div className='type-category-container'>
        <div className='expense-category-left-side'>
          <div className='expense-category-icon'>
            <CategoryIcon name={props.icon}></CategoryIcon>
          </div>
              
          <div className='category-title'>{props.name}</div>
         </div>
         <div className='category-buttons'></div>      
                            
            
        </div>
        </>
    );

}

export default ExpenseCategory;
