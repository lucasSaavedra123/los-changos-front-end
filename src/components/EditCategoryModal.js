import { useState } from "react";
import { TextField } from '@material-ui/core';
import { Box } from '@mui/system';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { Button } from "@mui/material";
import { ALLOWS_ICONS_FOR_CATEGORY, BACKEND_URL } from "../CONSTANTS";
import CategoryIcon from "./CategoryIcon";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import CancelIcon from '@mui/icons-material/Cancel';
import DoneIcon from '@mui/icons-material/Done';
import "../assets/scss/expenseCard.scss"

export const EditCategoryModal = (props) => {
    const [icon, setIcon] = useState(typeof props.icon === "undefined" ? '' : props.icon);
    const [name, setName]= useState(typeof props.name === "undefined" ? '' : props.name);
    const { currentUser } = useContext(AuthContext);

    console.log(ALLOWS_ICONS_FOR_CATEGORY)
    const handleChange = (event) => {
        setIcon(event.target.value);
    };

    const handleCategory = (e) =>{
        if (typeof props.id === "undefined"){
            saveCategory(e);
        }else{
            editCategory(e);
        }
    }

    const saveCategory = (e) => {
        e.preventDefault();
        if (name === ''  || icon ==='') {
            console.log('Faltan campos ')

        }
        else{
        fetch(BACKEND_URL+'/category', {
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
    
        }).finally(()=>{props.confirmAction()});}

        props.handleCloseModal()

    }

    const editCategory = (e) => {
        e.preventDefault();
        if (name === ''  || icon ==='') {
            console.log('Faltan campos ')

        }
        else{
        props.handleCloseModal()
        fetch(BACKEND_URL+'/category', {
        method: 'PATCH',
        headers: {
        'Authorization': 'Bearer ' + currentUser.stsTokenManager.accessToken,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        name: name,
        material_ui_icon_name: icon,
        id: props.id,
        })
    
        }).finally(()=>{props.confirmAction()});}

    }
    const cancelChanges = () => {
        props.handleCloseModal()
    }


    return (
        <div className="contenedor">
            <div className="add-category">
                <Box component="form" className="form-expense">
                    <div> Nueva Categoria </div>
                    <div className="name-expense-category">
                        <TextField defaultValue={name} className="textfield" label="Categoria" onChange={(e) => { setName(e.target.value)}} />
                    </div>
                    <div className="select-expense-icon">
                        <InputLabel id="demo-simple-select-label">Icono</InputLabel>
                        <Select
                            defaultValue={props.icon}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={icon}
                            label="Categoria"
                            onChange={handleChange}>
                                
                            {ALLOWS_ICONS_FOR_CATEGORY.map((icon)=>(
                            <MenuItem value={icon}><CategoryIcon name={icon} color={'black'}></CategoryIcon></MenuItem>))
                            
                            }
                        </Select>
                    </div>
                    <div className="botones-formulario">
                    <Button style={{backgroundColor:'#9CE37D'}} onClick={cancelChanges}> <CancelIcon sx={{color:'white'}}/></Button>
                    <Button  style={{backgroundColor:'#9CE37D'}} onClick={handleCategory}> <DoneIcon sx={{color:'white'}} /> </Button>
                    </div>
                </Box>
            </div>
        </div>
    )
}

export default EditCategoryModal;