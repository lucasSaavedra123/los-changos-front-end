import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { Button } from "@mui/material";
import { ALLOWS_ICONS_FOR_CATEGORY, BACKEND_URL } from "../CONSTANTS";
import { useContext } from "react";
import DoneIcon from '@mui/icons-material/Done';
import "../assets/scss/expenseCard.scss"
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import CustomAlert from "./CustomAlert";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useEffect } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { TablePagination, TableContainer } from '@mui/material';

import { useState, useRef } from "react";
import { TextField } from '@material-ui/core';
import { Box } from '@mui/system';
import CategoryIcon from "./CategoryIcon";
import { AuthContext } from "../context/AuthContext";
import CancelIcon from '@mui/icons-material/Cancel';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import "../assets/scss/expenseCard.scss"
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FormControl from '@mui/material/FormControl';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';


const budgetModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '75%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,

}

export const AddBudgetModal = (props) => {


    const [someDummyArray, setDummyArray] = useState([]);

    let today = new Date();
    const [icon, setIcon] = useState(typeof props.icon === "undefined" ? '' : props.icon);
    const [name, setName] = useState(typeof props.name === "undefined" ? '' : props.name);
    const [monto, setMonto] = useState(0);
    const [limitArray, setLimitArray] = useState({});
    const { currentUser } = useContext(AuthContext);
    const [activeStep, setActiveStep] = useState(0);

    const [openCompleteAllFields, setopenCompleteAllFields] = useState(false);
    const [dateFrom, setDateFrom] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
    const [dateTo, setDateTo] = useState(today);
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState([]);

    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(0);

    const [invalidDates, setInvalidDates] = useState(false);
    const [invalidFutureExpenseDate, setInvalidFutureExpenseDate] = useState(false);
    const [invalidFutureExpenseName, setInvalidFutureExpenseName] = useState(false);
    const [invalidFutureExpenseDateOutOfBudget, setInvalidFutureExpenseDateOutOfBudget] = useState(false);
    const [futureExpensesExceedsBudget, setFutureExpensesExceedsBudget] = useState(false);
    const [invalidFutureExpenseValue, setInvalidFutureExpenseValue] = useState(false);
    const [invalidFutureExpenseCategory, setInvalidFutureExpenseCategory] = useState(false);
    const [invalidCategoryValue, setInvalidCategoryValue] = useState(false);
    const [overlapping, setOverlapping] = useState(false);
    const [expirationDate, setExpirationDate] = useState(null);
    const [futureExpensesWereExceedingBudgetTime, setFutureExpensesWereExceedingBudgetTime] = useState(false);


    const [lastId, setLastId] = useState(0);

    const [future_expense_value, setFutureExpenseValue] = useState(0);
    const [future_expense_name, setFutureExpenseName] = useState("");

    const handleChangeExpirationDate = (newValue) => {
        setExpirationDate(newValue);
    };

    const handleChangeName = (event) => {
        setFutureExpenseName(event.target.value)
    };

    const handleChangeValue = (event) => {
        setFutureExpenseValue(event.target.value)
    };

    const onKeyDown = (e) => {
        e.preventDefault();
    };

    const handleDeleteRow = (detail_id) => {

        if (window.confirm("¿Estas seguro de borrar el gasto futuro?")) {

            var row_to_delete = someDummyArray.findIndex((future_expense_detail) => future_expense_detail.id == detail_id)

            setDummyArray((prevRows) => {
                return [
                    ...someDummyArray.slice(0, row_to_delete),
                    ...someDummyArray.slice(row_to_delete + 1),
                ];
            });
        }
    };

    const columns = [
        { field: 'name', headerName: 'Nombre', flex: 0.1 },
        { field: 'value', headerName: 'Valor', flex: 0.1 },
        { field: 'category_id', headerName: 'Categoria', renderCell: (params) => { return (<><CategoryIcon name={get_category_from_id(params.value).material_ui_icon_name}></CategoryIcon>{get_category_from_id(params.value).name}</>) }, flex: 0.4 },
        { field: 'expiration_date', headerName: 'Fecha de Vencimiento', flex: 0.3 },
        {
            field: "action",
            headerName: "",
            sortable: false,
            renderCell: (params) => {
                return <Button onClick={() => handleDeleteRow(params.row.id)}><DeleteIcon sx={{color:'gray'}}/></Button>;
            }

        }
    ];

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const showCompleteAllFields = () => {
        setopenCompleteAllFields(true);
    };

    const checkDates = () => {
        if (dateFrom > dateTo) {
            setInvalidDates(true);
            return false;
        } else {
            setInvalidDates(false);
            return true;
        }
    }

    const checkOverlapping = () => {
        let overlapping = false;
        props.budgets.forEach((budget) => {
            let initial_date = new Date(budget.initial_date + "T00:00:00")
            let final_date = new Date(budget.final_date + "T00:00:00")
            let dateToParsed = new Date(dateTo.toISOString().split('T')[0] + "T00:00:00")
            let dateFromParsed = new Date(dateFrom.toISOString().split('T')[0] + "T00:00:00")

            if ((initial_date <= dateToParsed && dateToParsed <= final_date) || (initial_date <= dateFromParsed && dateFromParsed <= final_date)) {
                overlapping = true;
            }

        })

        setOverlapping(overlapping);
        return !overlapping;
    }

    const checkCategoryValue = () => {

        var sum_value = categories.reduce((accumulator, category) => accumulator + category.limit, 0)

        if (sum_value == 0) {
            setInvalidCategoryValue(true);
            return false
        } else {
            setInvalidCategoryValue(false);
            return true
        }

    }

    const checkFutureExpenses = () => {
        var details = categories.concat(someDummyArray)
        var future_expenses = details.filter( (detail) => detail.value !== undefined )
        var categories_limits = details.filter( (detail) => detail.limit !== undefined )

        for(let i = 0; i < categories_limits.length; i++){
            let sum = 0
            for(let j = 0; j < future_expenses.length; j++){
                if(categories_limits[i].id == future_expenses[j].category_id){
                    sum += future_expenses[j].value
                }

                if( new Date(future_expenses[j].expiration_date+ "T00:00:00") < new Date(dateFrom.toISOString().split('T')[0] + "T00:00:00") || new Date(future_expenses[j].expiration_date+ "T00:00:00") > new Date(dateTo.toISOString().split('T')[0] + "T00:00:00") ){
                    setFutureExpensesWereExceedingBudgetTime(true)
                    return false
                }
            }
            
            if(sum > categories_limits[i].limit){
                setFutureExpensesExceedsBudget(true)
                return false
            }            

        }

        return true
    }


    const validFutureExpense = () => {
        if(expirationDate == null){
            setInvalidFutureExpenseDate(true)
            return false
        }

        //Verificar que expiration date este dentro del presupuesto asignado
        let dateToParsed = new Date(dateTo.toISOString().split('T')[0] + "T00:00:00")
        let dateFromParsed = new Date(dateFrom.toISOString().split('T')[0] + "T00:00:00")
        let expirationDateParsed = new Date(expirationDate.toISOString().split('T')[0] + "T00:00:00")




        if (expirationDateParsed <  dateFromParsed || expirationDateParsed > dateToParsed){
            setInvalidFutureExpenseDateOutOfBudget(true)
            return false
        }

        if (future_expense_name == ""){
            setInvalidFutureExpenseName(true)
            return false
        }

        if (parseFloat(future_expense_value) <= 0){
            setInvalidFutureExpenseValue(true)
            return false
        }

        if(category == 0){
            setInvalidFutureExpenseCategory(true)
            return false
        }

        return true;
    }


    const addSomethingToDummyArray = () => {
        if (validFutureExpense()){
            setLastId(lastId+1)
            setDummyArray((prevRows) => [...prevRows, { 'id': lastId, 'value': parseFloat(future_expense_value), 'name': future_expense_name, 'expiration_date': expirationDate.toISOString().split('T')[0], 'category_id': category }]);

            //Ver que onda esto despues
            //setExpirationDate(null)
            //setFutureExpenseName("")
            //handleChangeName("")
            //handleChangeValue("")
            //handleChangeSelect(typeof props.category === "undefined" ? '' : props.category.id)
        }
    }


    const createBudget = () => {

        let detail_index = 0

        while (detail_index < categories.length) {
            categories[detail_index].category_id = categories[detail_index].id
            detail_index += 1
        }

        if (checkDates() && checkCategoryValue() && checkOverlapping() && checkFutureExpenses()) {

            fetch(BACKEND_URL + '/budget', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + currentUser.stsTokenManager.accessToken,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({
                    initial_date: dateFrom.toISOString().split('T')[0],
                    final_date: dateTo.toISOString().split('T')[0],
                    details: Object.values(categories.concat(someDummyArray)),
                })


            }).then((res) => { props.handleCloseModal(); props.getBudgets(); })
        }

    }

    const closeCompleteAllFields = () => {
        setopenCompleteAllFields(false);
    };

    const handleChangeFrom = (newValue) => {
        setDateFrom(newValue);
    };

    const handleChangeTo = (newValue) => {
        setDateTo(newValue);
    };


    const handleChange = (event) => {
        setIcon(event.target.value);
    };

    const getCategorias = () => {
        fetch(BACKEND_URL + '/category', {
            headers: { 'Authorization': 'Bearer ' + currentUser.stsTokenManager.accessToken }
        })
            .then((response) => response.json())
            .then((actualData) => {
                actualData.forEach(category => {
                    category.limit = 0;
                })
                setCategories(actualData);

            })
            .catch((err) => {
                console.log(err.message);
            });


    }

    const addLimit = (e, category) => {
        category.limit = (isNaN(parseInt(e.target.value))) ? 0 : parseInt(e.target.value);

    }

    useEffect(() => {
        getCategorias()
    }, []);



    const cancelChanges = () => {
        props.handleCloseModal()
    }

    const handleChangeSelect = (event) => {
        setCategory(event.target.value);
    };

    const get_category_from_id = (id) => {
        let index = 0

        while (index < categories.length) {

            if (categories[index].id == id) {
                return categories[index]
            }

            index += 1
        }
    }


    return (
        <>

            <Box sx={budgetModal}>

                {activeStep === 0 ? (
                    <Stack spacing={0.5}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Nuevo presupuesto
                        </Typography>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DesktopDatePicker
                                label="Desde"
                                inputFormat="MM/DD/YYYY"
                                value={dateFrom}
                                onChange={handleChangeFrom}
                                sx={{ color: '#9CE37D;' }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                            <DesktopDatePicker
                                label="Hasta"
                                inputFormat="MM/DD/YYYY"
                                value={dateTo}
                                onChange={handleChangeTo}
                                renderInput={(params) => <TextField {...params} />}
                            />


                        </LocalizationProvider>
                        <Grid container spacing={0.5}>
                            <TableContainer>
                                <Table size='small'>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell >Categoria</TableCell>
                                            <TableCell >Presupuesto</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            categories
                                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                .map((category) => (

                                                    <TableRow key={category.id}>
                                                        <TableCell value={category.id}><CategoryIcon name={category.material_ui_icon_name}></CategoryIcon>{category.name}</TableCell>
                                                        <TableCell> <TextField defaultValue={category.limit} onChange={(e) => { addLimit(e, category) }}></TextField> </TableCell>
                                                    </TableRow>


                                                ))}

                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePagination
                                component="div"
                                rowsPerPageOptions={[5, 10]}
                                count={categories.length}
                                page={page}
                                onPageChange={handleChangePage}
                                rowsPerPage={rowsPerPage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                            <Grid>

                            </Grid>


                        </Grid>
                        <Grid container spacing={0.5}>
                            <Grid item xs={6} className="boton-cancelar" >
                                <Button style={{ backgroundColor: '#9CE37D' }} onClick={cancelChanges}> <CancelIcon sx={{ color: 'white' }} /> </Button>
                            </Grid>
                            <Grid item xs={6} className="boton-adelante">
                                <Button style={{ backgroundColor: '#9CE37D' }} onClick={(e) => {setActiveStep(1);}}><ArrowForwardIcon sx={{ color: 'white' }} /> </Button>
                            </Grid>
                        </Grid>
                    </Stack>
                ) : (
                    <Stack spacing={0.5}>
                        {"Aca van los gastos futuros"}

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DesktopDatePicker
                                label="Fecha de caducidad"
                                inputFormat="MM/DD/YYYY"
                                onChange={handleChangeExpirationDate}
                                value={expirationDate}
                                sx={{ color: '#9CE37D;' }}
                                renderInput={(params) => <TextField onKeyDown={onKeyDown} {...params} />}
                            />
                        </LocalizationProvider>
                        <TextField onChange={handleChangeName} label="Nombre"></TextField>
                        <TextField onChange={handleChangeValue} label="Valor"></TextField>

                        <FormControl sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="demo-simple-select-helper-label">Categoria</InputLabel>
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                label="Categoria"
                                defaultValue={''}
                                onChange={handleChangeSelect}
                            >
                                {categories.map((category) => (
                                    <MenuItem key={category.id} value={category.id}><CategoryIcon name={category.material_ui_icon_name}></CategoryIcon>{category.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <Button style={{ backgroundColor: '#9CE37D' }} onClick={addSomethingToDummyArray}> <AddIcon sx={{ color: 'white' }} /> </Button>


                        <Box sx={{ height: 400, mt: 1 }}>
                            <DataGrid
                                rows={someDummyArray}
                                columns={columns}
                                pageSize={5}
                                rowsPerPageOptions={[5]}
                            />
                        </Box>


                        <Grid container spacing={0.5}>
                            <Grid item xs={6} className="boton-atras" >
                                <Button style={{ backgroundColor: '#9CE37D' }} onClick={(e) => { setActiveStep(0) }}> <ArrowBackIcon sx={{ color: 'white' }} /> </Button>
                            </Grid>
                            <Grid item xs={6} className="boton-aceptar">
                                <Button style={{ backgroundColor: '#9CE37D' }} onClick={(e) => { createBudget(e) }}><DoneIcon sx={{ color: 'white' }} /> </Button>
                            </Grid>
                        </Grid>
                    </Stack>
                )}

            </Box>

            <CustomAlert text={"Completá todo los campos!"} severity={"error"} open={openCompleteAllFields} closeAction={closeCompleteAllFields} />
            <CustomAlert text={"Las fechas son invalidas"} severity={"warning"} open={invalidDates} closeAction={() => setInvalidDates(false)} />
            <CustomAlert text={"Ya existe un presupuesto para ese periodo"} severity={"error"} open={overlapping} closeAction={() => setOverlapping(false)} />
            <CustomAlert text={"Ingrese un valor valido para al menos una categoria"} severity={"warning"} open={invalidCategoryValue} closeAction={() => setInvalidCategoryValue(false)} />

            <CustomAlert text={"Ingresa una fecha para el gasto futuro"} severity={"error"} open={invalidFutureExpenseDate} closeAction={() => setInvalidFutureExpenseDate(false)} />
            <CustomAlert text={"Ingresa un nombre para el gasto futuro"} severity={"error"} open={invalidFutureExpenseName} closeAction={() => setInvalidFutureExpenseName(false)} />
            <CustomAlert text={"El gasto futuro no puede ocurrir fuera del presupuesto"} severity={"error"} open={invalidFutureExpenseDateOutOfBudget} closeAction={() => setInvalidFutureExpenseDateOutOfBudget(false)} />
            <CustomAlert text={"El gasto futuro no puede ser cero como tampoco negativo"} severity={"error"} open={invalidFutureExpenseValue} closeAction={() => setInvalidFutureExpenseValue(false)} />
            <CustomAlert text={"El gasto futuro tiene que tener una categoria. Por favor, selecciona una"} severity={"error"} open={invalidFutureExpenseCategory} closeAction={() => setInvalidFutureExpenseCategory(false)} />
            <CustomAlert text={"Los gastos futuros exceden el presupuesto. Por favor, extendelo o borrá gastos futuros."} severity={"error"} open={futureExpensesExceedsBudget} closeAction={() => setFutureExpensesExceedsBudget(false)} />
            <CustomAlert text={"Hay gastos que estan fuera del presupuesto. Por favor, extendelo o modifica gastos futuros."} severity={"error"} open={futureExpensesWereExceedingBudgetTime} closeAction={() => setFutureExpensesWereExceedingBudgetTime(false)} />
        </>
    )
}

export default AddBudgetModal;
