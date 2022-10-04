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



export const EditExpenseModal = (props) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {setOpen(false)};
    const [age, setAge] = useState('');
    const [value, setValue] = useState('2022-10-3T21:11:54');

    const handleChange = (newValue) => {
        setValue(newValue);
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
                        <TextField className="textfield"label="Nombre del gasto" />
                    </div>
                    <div className="name-expense-category"> 
                        <TextField className="textfield"label="Monto" />
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
                            value={age}
                            label="Icono"
                            onChange={handleChange}
                        >
                            <MenuItem value={"Impuestos y Servicios"}>  <ExpenseCategory title={"Impuestos y Servicios"} icon={<AccountBalanceIcon sx={{ color: "black" }} />} /></MenuItem>

                            <MenuItem value= {"Entretenimiento y Ocio"}><ExpenseCategory title={"Entretenimiento y Ocio"} icon={<CasinoIcon sx={{ color: "black" }} />}/> </MenuItem>

                            <MenuItem value={"Hogar y Mercado"}><ExpenseCategory title={"Hogar y Mercado"} icon={<HomeIcon sx={{ color: "black" }} />}/> </MenuItem>

                            <MenuItem value={"Buen vivir"}><ExpenseCategory title={"Buen vivir"} icon={<EmojiEmotionsIcon sx={{ color: "black" }} />}/> </MenuItem>

                            <MenuItem value={"Electrodomesticos"}><ExpenseCategory title={"Electrodomesticos"} icon={<KitchenIcon sx={{ color: "black" }} />}/></MenuItem>
                            
                           

                        </Select>
                    </div>
                    <div>
                    <Button onClick={saveCategory}> <DoneIcon/> </Button>
                    <Button onClick={cancelChanges}> <CancelIcon/> </Button>
{/*                    <Button onClick={()=>setOpen(!open)}>
                        <AddIcon/>
                    </Button> 
                    <Modal open={open} onClose={handleClose}>
                        <AddCategoryModal/>
                    </Modal> */}
                    </div>

                    

      
          
                </Box>
            </div>
        </div>
    )
}

export default EditExpenseModal;