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

    const [category, setCategory] = useState(typeof props.category === "undefined" ? '' : props.category.id);
    const [date, setDate] = useState(typeof props.date === "undefined" ? new Date() : new Date(props.date + "T00:00:00"));
    const [name, setName] = useState(typeof props.name === "undefined" ? '' : props.name)
    const [value, setValue] = useState(typeof props.value === "undefined" ? '' : props.value)
    const [categories, setCategories] = useState([]);

    const { currentUser } = useContext(AuthContext);
    const [openCompleteAllFields, setopenCompleteAllFields] = useState(false);
    const [openValueError, setopenValueError] = useState(false);
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
                setCategories(actualData.filter(category => category.id != 6));

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
/*         if (typeof props.id === "undefined") {
            saveExpense(e)
        } else {
            editExpense(e)
        } */

        saveExpense(e)
    }

    const saveExpense = (e) => {
        e.preventDefault();
        //ACA HAY QUE CHEQUEAR EL BALANCES
        if(value === '' || name === '' || category === '') {
            showCompleteAllFields()
        }
        else if (value < 0){
            showValueError()
        }
        else {
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
                    type: "transfer_send",
                    alias: name
                })


            }).finally(() => { props.confirmAction();props.handleCloseModal()})

        }

    }

/*     const editExpense = (e) => {
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

        


    } */

    const validateDate = (date) => {
        const today = new Date();
        const dateToValidate = new Date(date);
        if (dateToValidate < today) {
          return false;
        }
        return true;
      }


    return (
        <>
        <Box sx={style}>
            <Stack spacing={3}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Enviar Dinero
                </Typography>
                <TextField label="Alias" defaultValue={name} onChange={(e) => { setName(e.target.value) }} />
                <TextField label="Monto" defaultValue={value} onChange={(e) => { setValue(e.target.value) }} />
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-helper-label">Categoria</InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={category}
                        label="Categoria"
                        onChange={handleChangeSelect}
                        
                    >
                    {categories.map((category)=>(

                        <MenuItem value={category.id}><CategoryIcon name={category.material_ui_icon_name}></CategoryIcon>{category.name}</MenuItem>
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
        <CustomAlert text={"Completá todo los campos!"} severity={"error"} open={openCompleteAllFields} closeAction={closeCompleteAllFields} />
        <CustomAlert text={"El monto tiene que ser positivo!"} severity={"error"} open={openValueError} closeAction={closeValueError} />

        </>
    )
}

export default EditExpenseModal;