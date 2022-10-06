import { useState } from "react";
import { TextField } from '@material-ui/core';
import { Box } from '@mui/system';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { Button } from "@mui/material";
import { ALLOWS_ICONS_FOR_CATEGORY } from "../CONSTANTS";
import CategoryIcon from "./CategoryIcon";

export const AddCategoryModal = (props) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [icon, setIcon] = useState('');

    console.log(ALLOWS_ICONS_FOR_CATEGORY)
    const handleChange = (event) => {
        setIcon(event.target.value);
    };
    const saveCategory = () =>{

    }
    const cancelChanges = () =>{
        
    }


    return (
        <div className="contenedor">
            <div className="add-category">
                <Box component="form" className="form-expense">

                    <div className="name-expense-category"> 
                        <TextField className="textfield"label="Categoria" />
                    </div>
                    <div className="select-expense-icon">
                        <InputLabel className="label-expense-icon">Icono</InputLabel>
                        <Select
                        className="icon-select"
                            value={icon}
                            label="Icono"
                            onChange={handleChange}
                        > {ALLOWS_ICONS_FOR_CATEGORY.map((icon)=> (
                            <MenuItem value={icon}><CategoryIcon name={icon} /></MenuItem>
                        ))}
                        </Select>
                    </div>
                    <Button onClick={saveCategory}> GUARDAR CATEGORIA</Button>
                    <Button onClick={cancelChanges}> DESCARTAR CAMBIOS</Button>
                </Box>
            </div>
        </div>
    )
}

export default AddCategoryModal;