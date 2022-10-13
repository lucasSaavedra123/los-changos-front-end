import { useState } from "react";
import { TextField } from '@material-ui/core';
import { Box } from '@mui/system';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { Button } from "@mui/material";
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CancelIcon from '@mui/icons-material/Cancel';
import DoneIcon from '@mui/icons-material/Done';
import "../assets/scss/addExpense.scss"
import { useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import CategoryIcon from "./CategoryIcon";
import { BACKEND_URL } from "../CONSTANTS";

export const EditExpenseModal = (props) => {

    const [category, setCategory] = useState(typeof props.category === "undefined" ? '' : props.category.id);
    const [date, setDate] = useState(typeof props.date === "undefined" ? new Date() : new Date(props.date+"T00:00:00"));
    const [name, setName]= useState(typeof props.name === "undefined" ? '' : props.name)
    const [value,setValue]= useState(typeof props.value === "undefined" ? '' : props.value)
    const [categories, setCategories] = useState([]);
  
    const { currentUser } = useContext(AuthContext);

    const getCategorias = () =>{
         fetch(BACKEND_URL+'/category',{
            headers: {'Authorization': 'Bearer ' + currentUser.stsTokenManager.accessToken}
         })
             .then((response) => response.json())
             .then((actualData) =>{ 
                 setCategories(actualData);
             
             })
                 .catch((err) => {
                 console.log(err.message);
             });
  
  
    }

    useEffect(() => {
        getCategorias()
       }, []);


    const handleChange = (newValue) => {
        setDate(newValue);
    };
    const handleChangeSelect = (event) => {
        setCategory(event.target.value);
      };

    const cancelChanges = () => {
        props.handleCloseModal()
    }

    const createOrEditExpense = (e) => {
        if(typeof props.id === "undefined"){
            saveExpense(e)
        }else{
            editExpense(e)
        }
    }

    const saveExpense = (e) => {
        e.preventDefault();
        if (value === '' || name === '') {
            console.log('Faltan campos ')

        }
        else {
            console.log(typeof date)
            fetch(BACKEND_URL+'/expense', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + currentUser.stsTokenManager.accessToken,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },

                
                body: JSON.stringify({
                    value: value,
                    category_id: category,
                    date: typeof date === 'undefined' ? new Date().toISOString().split('T')[0] : date.toISOString().split('T')[0],
                    name: name
                })


            }).finally(() => {props.confirmAction()})
            
        }

        props.handleCloseModal()


    }

    const editExpense = (e) => {
        e.preventDefault();
        if (value === '' || name === '') {
            console.log('Faltan campos ')

        }
        else {
            fetch(BACKEND_URL+'/expense', {
                method: 'PATCH',
                headers: {
                    'Authorization': 'Bearer ' + currentUser.stsTokenManager.accessToken,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },

                
                body: JSON.stringify({
                    id:props.id,
                    value: value,
                    category_id: category,
                    date: typeof date === '' ? new Date().toISOString().split('T')[0] : date.toISOString().split('T')[0],
                    name: name
                })


            }).finally(() => {props.confirmAction()})
            
        }

        props.handleCloseModal()


    }


    return (
        <div className="contenedor">
            <div className="add-category">
                <Box component="form" className="form-expense">
                    <div> Nuevo Gasto </div>
                    <div className="name-expense-category">
                        <TextField className="textfield" label="Nombre del gasto" defaultValue={name} onChange={(e) => { setName(e.target.value) }} />
                    </div>
                    <div className="name-expense-category">
                        <TextField className="textfield" label="Monto" defaultValue={value} onChange={(e) => { setValue(e.target.value) }} />
                    </div>
                    <div>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <MobileDatePicker
                                className="textfield"
                                label="Fecha del gasto"
                                inputFormat="YYYY-MM-DD"
                                value={date}
                                onChange={handleChange}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </div>
                    <div className="select-expense-icon">
                    <InputLabel id="demo-simple-select-label">Categoria</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={category}
                            label="Category"
                            onChange={handleChangeSelect}
                        >
                            {categories.map((category)=>(
                                <MenuItem value={category.id}><CategoryIcon name={category.material_ui_icon_name}></CategoryIcon>{category.name}</MenuItem>
                            ))}
                        </Select>
                        
                    </div>
                    <div className="botones-formulario">
                        <Button  style={{backgroundColor:'#9CE37D'}} onClick={cancelChanges}> <CancelIcon sx={{color:'white'}} /> </Button>
                        <Button  style={{backgroundColor:'#9CE37D'}} onClick={createOrEditExpense}> <DoneIcon sx={{color:'white'}} /> </Button>
                    </div>





                </Box>
            </div>
        </div>
    )
}

export default EditExpenseModal;