import { useState } from "react";
import { TextField } from '@material-ui/core';
import { Box } from '@mui/system';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { Button } from "@mui/material";
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
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
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


export const EditExpenseModal = (props) => {

    const block_input = props.future_expense !== undefined

    console.log(props.future_expense)

    var default_category;
    var default_value;
    var default_name;

    if(block_input){
        default_category = props.future_expense.category.id
        default_value = props.future_expense.value
        default_name = props.future_expense.name
    }
    else{
        default_category = typeof props.category === "undefined" ? '' : props.category.id
        default_value = typeof props.value === "undefined" ? '' : props.value
        default_name = typeof props.name === "undefined" ? '' : props.name
    }

    const [category, setCategory] = useState(default_category);
    const [date, setDate] = useState(typeof props.date === "undefined" ? new Date() : new Date(props.date + "T00:00:00"));
    const [name, setName] = useState(default_name)
    const [value, setValue] = useState(default_value)


    const [categories, setCategories] = useState([]);
    const { currentUser } = useContext(AuthContext);
    const [openCompleteAllFields, setopenCompleteAllFields] = useState(false);
    const [openValueError, setopenValueError] = useState(false);
    const [dateOutOfRange, setDateOutOfRange] = useState(false);
    const onKeyDown = (e) => {
        e.preventDefault();
     };

    const showCompleteAllFields = () => {
        setopenCompleteAllFields(true);
    };

    const closeCompleteAllFields = () => {
        setopenCompleteAllFields(false);
    };

    const showValueError = () => {
        setopenValueError(true);
    };

    const closeValueError = () => {
        setopenValueError(false);
    };

    const getCategorias = () => {
        fetch(BACKEND_URL + '/category', {
            headers: { 'Authorization': 'Bearer ' + currentUser.stsTokenManager.accessToken }
        })
            .then((response) => response.json())
            .then((actualData) => {
                setCategories(actualData);

            })
            .catch((err) => {
                console.log(err.message);
            });


    }


    const validateDateInBudget = () => {
        const budget = props.budget
        const budget_start = new Date(budget.initial_date)
        const budget_end = new Date(budget.final_date)
        const expense_date = date

        if (expense_date >= budget_start && expense_date <= budget_end){
            return true
        }
        else{
            setDateOutOfRange(true)
            return false
        }
    }


    useEffect(() => {
        if(!block_input){getCategorias()}
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
        if (typeof props.id === "undefined") {
            saveExpense(e)
        } else {
            editExpense(e)
        }
    }

    const saveExpense = (e) => {
        e.preventDefault();
        if (value === '' || name === '' || category === '') {
            showCompleteAllFields()
        }
        else if (isNaN(parseFloat(value)) || value < 0){
            showValueError()
        }
        else {
            if(!block_input){
            fetch(BACKEND_URL + '/expense', {
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


            }).finally(() => { props.confirmAction();props.handleCloseModal()})
        }
        else{
            if(validateDateInBudget()){
            fetch(BACKEND_URL + '/budget/expended', {
                method: 'PATCH',
                headers: {
                    'Authorization': 'Bearer ' + currentUser.stsTokenManager.accessToken,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },


                body: JSON.stringify({
                    future_expense_id: props.future_expense.id,
                    value: value,
                    category_id: category,
                    expense_done_date: typeof date === 'undefined' ? new Date().toISOString().split('T')[0] : date.toISOString().split('T')[0],
                    name: name
                })


            }).finally(() => { props.confirmAction();props.handleCloseModal()})    
        }}
        }

    }

    const editExpense = (e) => {
        e.preventDefault();
        if (value === '' || name === '' || category === '') {
            showCompleteAllFields()
        }
        else if (value < 0){
            showValueError()
        }
        else {
            fetch(BACKEND_URL + '/expense', {
                method: 'PATCH',
                headers: {
                    'Authorization': 'Bearer ' + currentUser.stsTokenManager.accessToken,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },


                body: JSON.stringify({
                    id: props.id,
                    value: value,
                    category_id: category,
                    date: typeof date === '' ? new Date().toISOString().split('T')[0] : date.toISOString().split('T')[0],
                    name: name
                })


            }).finally(() => { props.confirmAction();props.handleCloseModal();})

        }

        


    }

    return (
        <>
        <Box sx={style}>
            <Stack spacing={3}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    {props.action} Gasto
                </Typography>
                <TextField disabled={block_input} label="Nombre del gasto" defaultValue={name} onChange={(e) => { setName(e.target.value) }} />
                <TextField disabled={block_input} label="Monto" defaultValue={value} onChange={(e) => { setValue(e.target.value) }} />
                <LocalizationProvider dateAdapter={AdapterDayjs}>

                    <DesktopDatePicker
                        label="Fecha del gasto"
                        inputFormat="YYYY-MM-DD"
                        value={date}
                        onChange={handleChange}
                        sx={{ color: '#9CE37D;' }}
                        disableFuture={true}
                        shouldDisableDate={(e) => {
                            if(props.budget === undefined){
                                return false
                            }
                            else{
                                return !(new Date(props.budget.initial_date) < e.toDate() && e.toDate() < new Date(props.budget.final_date))
                            }
                        }}
                        renderInput={(params) => <TextField onKeyDown={onKeyDown} {...params}/>}
                    />

                </LocalizationProvider>
                { block_input ? <Typography>La categoria asociada va a ser la elegida en el gasto futuro</Typography> : null }
                <FormControl sx={{ m: 1, minWidth: 120 }} sx={{ visibility: (block_input ? 'hidden' : 'visible')  }}>
                    <InputLabel id="demo-simple-select-helper-label">Categoria</InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={category}
                        label="Categoria"
                        onChange={handleChangeSelect}
                        disabled={block_input}
                    >
                    {categories.map((category)=>(
                        <MenuItem key={category.id} value={category.id}><CategoryIcon name={category.material_ui_icon_name}></CategoryIcon>{category.name}</MenuItem>
                    ))}
                    </Select>
                </FormControl>
                <Grid container spacing={0.5}>
                    <Grid item xs={6} className="boton-cancelar" >
                        <Button style={{ backgroundColor: '#9CE37D' }} onClick={cancelChanges}> <CancelIcon sx={{ color: 'white' }} /> </Button>
                    </Grid>
                    <Grid item xs={6} className="boton-aceptar">
                        <Button style={{ backgroundColor: '#9CE37D' }} onClick={createOrEditExpense}> <DoneIcon sx={{ color: 'white' }} /> </Button>
                    </Grid>
                </Grid>
            </Stack>

        </Box>
        <CustomAlert text={"¡Completá todos los campos!"} severity={"error"} open={openCompleteAllFields} closeAction={closeCompleteAllFields} />
        <CustomAlert text={"¡El monto tiene que ser positivo!"} severity={"error"} open={openValueError} closeAction={closeValueError} />
        <CustomAlert text={"La fecha tiene que estar dentro del rango del presupuesto"} severity={"error"} open={dateOutOfRange} closeAction={setDateOutOfRange} />

        </>
    )
}

export default EditExpenseModal;