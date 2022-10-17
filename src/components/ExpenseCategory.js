import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import "../assets/scss/expenseCard.scss"
import { Button } from 'react-bootstrap';
import { useState } from 'react';
import CategoryIcon from './CategoryIcon';
import { Table } from 'material-ui';
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
