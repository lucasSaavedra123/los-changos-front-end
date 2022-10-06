import { useState } from "react";
import { TextField } from '@material-ui/core';
import { Box } from '@mui/system';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { Button } from "@mui/material";
import { ALLOWS_ICONS_FOR_CATEGORY } from "../CONSTANTS";
import CategoryIcon from "./CategoryIcon";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export const AddCategoryModal = (props) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [icon, setIcon] = useState('');
    const [name, setName]= useState('')
    const [value,setValue]= useState('')
    const { currentUser } = useContext(AuthContext);
    console.log(ALLOWS_ICONS_FOR_CATEGORY)
    const handleChange = (event) => {
        setIcon(event.target.value);
    };
    const saveCategory = (e) => {
        e.preventDefault();
        if (name === ''  || icon ==='') {
            console.log('Faltan campos ')

        }
        else{
        props.handleCloseModal()
        fetch('https://walletify-backend-develop.herokuapp.com/category', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + currentUser.stsTokenManager.accessToken,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        name: name,
        material_ui_icon_name: icon
        })
    
        });}

    }
    const cancelChanges = () => {
        props.handleCloseModal()
    }


    return (
        <div className="contenedor">
            <div className="add-category">
                <Box component="form" className="form-expense">

                    <div className="name-expense-category">
                        <TextField className="textfield" label="Categoria" onChange={(e) => { setName(e.target.value)}} />
                    </div>
                    <div className="select-expense-icon">
                        <InputLabel id="demo-simple-select-label">Icono</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={icon}
                            label="Categoria"
                            onChange={handleChange}
                        >
                            {ALLOWS_ICONS_FOR_CATEGORY.map((icon)=>(
                            <MenuItem value={icon}><CategoryIcon name={icon}></CategoryIcon></MenuItem>))
                            
                            }
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