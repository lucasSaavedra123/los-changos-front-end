import { useEffect, useState } from "react";
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
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CasinoIcon from '@mui/icons-material/Casino';
import HomeIcon from '@mui/icons-material/Home';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import KitchenIcon from '@mui/icons-material/Kitchen';
import ExpenseCategory from "./ExpenseCategory";
import "../assets/scss/addExpense.scss"

export const AddExpenseModal = (props) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [category, setCategory] = useState('');
    const [date, setDate] = useState('2022-10-4T21:11:54');
    const [name, setName]= useState('')
    const [value,setValue]= useState('')
    const [categories, setCategories] = useState([]);

  
    const getCategorias = () =>{
         fetch('https://walletify-backend-develop.herokuapp.com/category')
             .then((response) => response.json())
             .then((actualData) =>{ 
                 setCategories(actualData);
                 console.log(categories);
             
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
    const saveExpense = (e) =>{
        e.preventDefault();
        if (value === ''  || name ==='') {
            console.log('Faltan campos ')

        }
        else{
        fetch('https://walletify-backend-develop.herokuapp.com/transaction', {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        value: value,
        category_id: category.id,
        date: "2022-10-03",
        name: name
        })
    
        });}


    }
    const cancelChanges = () =>{
        
    }


    return (
        <div className="contenedor">
            <div className="add-category">
                <Box component="form" className="form-expense">

                    <div className="name-expense-category"> 
                        <TextField className="textfield"label="Nombre del gasto" onChange={(e) => { setName(e.target.value) }}/>
                    </div>
                    <div className="name-expense-category"> 
                        <TextField className="textfield"label="Monto" onChange={(e) => { setValue(e.target.value) }}/>
                    </div>
                    <div className="name-expense-category">
                    <LocalizationProvider dateAdapter={AdapterDayjs} >
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
                        <InputLabel className="label-expense-icon">Categoria</InputLabel>
                        <Select
                        className="icon-select"
                            value={category}
                            label="Icono"
                            onChange={handleChangeSelect}>
                            
                            {categories.map((category) => (
                                
                                <MenuItem value={category}>
                                    <ExpenseCategory title={category.name} id={category.id}/>
                                </MenuItem>
                            ))}           

                        </Select>
                        
                    </div>
                    <div className="buttons">
                    <Button className="save-button"onClick={saveExpense}> <DoneIcon/> </Button>
                    <Button className="cancel-button" onClick={cancelChanges}> <CancelIcon/> </Button>
                    </div>
                </Box>
                
            </div>
        </div>
    )
}

export default AddExpenseModal;