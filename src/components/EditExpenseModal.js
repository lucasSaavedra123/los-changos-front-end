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
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CasinoIcon from '@mui/icons-material/Casino';
import HomeIcon from '@mui/icons-material/Home';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import KitchenIcon from '@mui/icons-material/Kitchen';
import ExpenseCategory from "./ExpenseCategory";
import "../assets/scss/addExpense.scss"
import AddCategoryModal from "./AddCategoryModal";
import AddIcon from '@mui/icons-material/Add';
import { Modal } from '@mui/material';
import CategoryModal from "./CategoryModal";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpenseDynamicCategory from "./ExpenseDynamicCategory";
import { useEffect } from "react";


export const EditExpenseModal = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = (event, reason) => { console.log("hola rey") };
    const [age, setAge] = useState('');
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
        setValue(newValue);
    };
    const handleChangeSelect = (event) => {
        setCategory(event.target.value);
      };
    const saveCategory = () => {

    }
    const cancelChanges = () => {

    }


    return (
        <div className="contenedor">
            <div className="add-category">
                <Box component="form" className="form-expense">

                    <div className="name-expense-category">
                        <TextField className="textfield" label="Nombre del gasto" />
                    </div>
                    <div className="name-expense-category">
                        <TextField className="textfield" label="Monto" />
                    </div>
                    <div>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <MobileDatePicker
                                label="Fecha del gasto"
                                inputFormat="MM/DD/YYYY"
                                value={value}
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
                            
                            {categories.map((category) => {
                            if(category.static === true) {
                                return(
                                <MenuItem value={category}>
                                    <ExpenseCategory title={category.name} id={category.id}/>
                                </MenuItem>
                                )
                            }
                            else{
                                return(
                                <MenuItem value={category}>
                                    <ExpenseDynamicCategory title={category.name} id={category.id}/>
                                </MenuItem>
                                )

                            }        }  )}           

                        </Select>
                        
                    </div>
                    <div>
                        <Button onClick={saveCategory}> <DoneIcon /> </Button>
                        <Button onClick={cancelChanges}> <CancelIcon /> </Button>
                         <Button onClick={()=>setOpen(!open)}>
                        <AddIcon/>
                    </Button> 
                    <Modal open={open} onClose={handleClose} >
                        <AddCategoryModal/>
                    </Modal>
                    </div>





                </Box>
            </div>
        </div>
    )
}

export default EditExpenseModal;