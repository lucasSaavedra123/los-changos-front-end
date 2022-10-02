import { useState } from "react";
import { TextField } from '@material-ui/core';
import { Box } from '@mui/system';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { Button } from "react-bootstrap";

export const AddCategoryModal = (props) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [age, setAge] = useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };


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
                            value={age}
                            label="Icono"
                            onChange={handleChange}
                        >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </div>
                    <Button> GUARDAR CATEGORIA</Button>
                    <Button> DESCARTAR CAMBIOS</Button>
                </Box>
            </div>
        </div>
    )
}

export default AddCategoryModal;