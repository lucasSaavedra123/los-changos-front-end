import * as React from 'react';
import "../assets/scss/expenseCard.scss"
import { useState } from 'react';
import CategoryIcon from './CategoryIcon';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TextField from 'material-ui/TextField';

export const CategoryBudget = (props) => {

    return (
        <>
            <TableRow key={props.categoryProp.id} value={props.categoryProp}>
                <TableCell ><CategoryIcon name={props.categoryProp.material_ui_icon_name}></CategoryIcon>{props.categoryProp.name}</TableCell>
                <TableCell> <TextField id="outlined-basic" label="Outlined" variant="outlined" key={props.categoryProp.id} /> </TableCell>
            </TableRow>
        </>
    );

}

export default CategoryBudget;