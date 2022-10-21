import * as React from 'react';
import "../assets/scss/expenseCard.scss"
import { useState } from 'react';
import CategoryIcon from './CategoryIcon';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

export const ExpenseCategory = (props) => {
    const [isHovering, setIsHovering] = useState(false);

    
    const handleClick= ()=>{
        
    }

    const handleMouseOver = () => {
        setIsHovering(true);
        
        
      };
    const handleMouseOut = () => {
        setIsHovering(false);
      }

    return (
        <>
        <TableRow hover key={props.id} value={props.category}>
          <TableCell> <CategoryIcon name={props.icon} color={props.color}></CategoryIcon> </TableCell>
          <TableCell>{props.name}</TableCell>
          <TableCell></TableCell>
        </TableRow>
        </>
    );

}

export default ExpenseCategory;
