import { useState } from "react";
import { TextField } from '@material-ui/core';
import { Box } from '@mui/system';
import FormControl from '@mui/material/FormControl';
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
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import CustomAlert from "./CustomAlert";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export const EditCategoryModal = (props) => {
    const [icon, setIcon] = useState(typeof props.icon === "undefined" ? '' : props.icon);
    const [name, setName]= useState(typeof props.name === "undefined" ? '' : props.name);
    const { currentUser } = useContext(AuthContext);
    const [openCompleteAllFields, setopenCompleteAllFields] = useState(false);

    const showCompleteAllFields = () => {
        setopenCompleteAllFields(true);
    };

    const closeCompleteAllFields = () => {
        setopenCompleteAllFields(false);
    };


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
            showCompleteAllFields()
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
    
        }).finally(()=>{props.confirmAction();props.handleCloseModal()});}

    }

    const editCategory = (e) => {
        e.preventDefault();
        if (name === ''  || icon ==='') {
            showCompleteAllFields()
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
    
        }).finally(()=>{props.confirmAction();props.handleCloseModal()});}

    }
    const cancelChanges = () => {
        props.handleCloseModal()
    }


    return (
        <>
        
        <Box sx={style}>
        <Stack spacing={3}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                {props.action} categoria
            </Typography>
            <TextField defaultValue={name} label="Categoria" onChange={(e) => { setName(e.target.value)}}/>
            
            <FormControl sx={{ m: 1, minWidth: 120}}>
                <InputLabel id="demo-simple-select-helper-label">Icono</InputLabel>
                <Select
                    defaultValue={props.icon}
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={icon}
                    label="Icono"
                    onChange={handleChange}
                >
           {ALLOWS_ICONS_FOR_CATEGORY.map((icon)=>(
        <MenuItem value={icon}><CategoryIcon style={{display:'flex',justifyContent:'center'}} name={icon} color={'black'}></CategoryIcon></MenuItem>))
                            
        }
                </Select>
            </FormControl>
            <Grid container spacing={0.5}>
                <Grid item xs={6} className="boton-cancelar" >
                    <Button style={{ backgroundColor: '#9CE37D' }} onClick={cancelChanges}> <CancelIcon sx={{ color: 'white' }} /> </Button>
                </Grid>
                <Grid item xs={6} className="boton-aceptar">
                    <Button style={{ backgroundColor: '#9CE37D' }} onClick={handleCategory}> <DoneIcon sx={{ color: 'white' }} /> </Button>
                </Grid>
            </Grid>
        </Stack>

    </Box>

    <CustomAlert text={"Completá todo los campos!"} severity={"error"} open={openCompleteAllFields} closeAction={closeCompleteAllFields} />

    </>


        // <div className="contenedor">
        //     <div className="add-category">
        //         <Box component="form" className="form-expense">
        //             <div> Nueva Categoria </div>
        //             <div className="name-expense-category">
        //                 <TextField defaultValue={name} className="textfield" label="Categoria" onChange={(e) => { setName(e.target.value)}} />
        //             </div>
        //             <div className="select-expense-icon">
        //                 <InputLabel id="demo-simple-select-label">Icono</InputLabel>
        //                 <Select
        //                     defaultValue={props.icon}
        //                     labelId="demo-simple-select-label"
        //                     id="demo-simple-select"
        //                     value={icon}
        //                     label="Categoria"
        //                     onChange={handleChange}>
                                
        //                     {ALLOWS_ICONS_FOR_CATEGORY.map((icon)=>(
        //                     <MenuItem value={icon}><CategoryIcon name={icon} color={'black'}></CategoryIcon></MenuItem>))
                            
        //                     }
        //                 </Select>
        //             </div>
        //             <div className="botones-formulario">
        //             <Button style={{backgroundColor:'#9CE37D'}} onClick={cancelChanges}> <CancelIcon sx={{color:'white'}}/></Button>
        //             <Button  style={{backgroundColor:'#9CE37D'}} onClick={handleCategory}> <DoneIcon sx={{color:'white'}} /> </Button>
        //             </div>
        //         </Box>
        //     </div>
        // </div>
    )
}

export default EditCategoryModal;