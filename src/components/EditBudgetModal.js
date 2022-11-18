import { useState, useRef } from "react";
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
import { Modal } from "@mui/material";


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

export const EditBudgetModal = (props) => {
    let detail_index = 0

    while (detail_index < props.budget.details.length) {
        props.budget.details[detail_index].category_id = props.budget.details[detail_index].category.id
        detail_index += 1
    }

    const { currentUser } = useContext(AuthContext);
    const [openCompleteAllFields, setopenCompleteAllFields] = useState(false);
    const [dateFrom, setDateFrom] = useState(new Date(props.budget.initial_date + "T00:00:00"));
    const [dateTo, setDateTo] = useState(new Date(props.budget.final_date + "T00:00:00"));
    const [budget, setBudget] = useState(props.budget);

    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(0);
    const refValue = useRef({});
    const [invalidDates, setInvalidDates] = useState(false);
    const [invalidCategoryValue, setInvalidCategoryValue] = useState(false);
    const [overlapping, setOverlapping] = useState(false);

    const onKeyDown = (e) => {
        e.preventDefault();
    };

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
            if (props.budget.id !== budget.id) {
                if ((initial_date <= dateToParsed && dateToParsed <= final_date) || (initial_date <= dateFromParsed && dateFromParsed <= final_date)) {
                    overlapping = true;
                }
            }


        })

        console.log(overlapping)

        setOverlapping(overlapping);
        return !overlapping;
    }

    const checkCategoryValue = () => {

        var sum_value = budget.details.reduce((accumulator, currentValue) => accumulator + currentValue.limit, 0)

        if (sum_value == 0) {
            setInvalidCategoryValue(true);
            return false
        } else {
            setInvalidCategoryValue(false);
            return true
        }

    }

    const editBudget = (e) => {
        e.preventDefault();
        if (checkDates() && checkCategoryValue() && checkOverlapping()) {
            fetch(BACKEND_URL + '/budget', {
                method: 'PATCH',
                headers: {
                    'Authorization': 'Bearer ' + currentUser.stsTokenManager.accessToken,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    initial_date: dateFrom.toISOString().split('T')[0],
                    final_date: dateTo.toISOString().split('T')[0],
                    details: Object.values(budget.details),
                    id: props.budget.id,
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

    const changeLimit = (e, detail) => {

        let re = /^[0-9\b]+$/;
        if (!re.test(e.target.value)) {
            e.target.value = '';
        }

        budget.details[budget.details.indexOf(detail)].limit = parseInt(e.target.value)

    }

    useEffect(() => {
        //getCategorias()
    }, []);

    useEffect(() => {
        //getCategorias()
    }, [invalidCategoryValue]);


    const cancelChanges = () => {
        props.handleCloseModal()
    }


    return (
        <>

            <Box sx={budgetModal}>
                <Stack spacing={0.5}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Editar Presupuesto
                    </Typography>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DesktopDatePicker
                            label="Desde"
                            inputFormat="MM/DD/YYYY"
                            value={dateFrom}
                            onChange={handleChangeFrom}
                            sx={{ color: '#9CE37D;' }}
                            renderInput={(params) => <TextField onKeyDown={onKeyDown} {...params} />}
                        />
                        <DesktopDatePicker
                            label="Hasta"
                            inputFormat="MM/DD/YYYY"
                            value={dateTo}
                            onChange={handleChangeTo}
                            renderInput={(params) => <TextField onKeyDown={onKeyDown} {...params} />}
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

                                        budget.details
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((detail) => {
                                                return (
                                                    <TableRow key={detail.category.id}>
                                                        <TableCell value={detail.category.id}><CategoryIcon name={detail.category.material_ui_icon_name}></CategoryIcon>{detail.category.name}</TableCell>
                                                        <TableCell> <TextField defaultValue={detail.limit} onChange={(e) => { changeLimit(e, detail) }}></TextField> </TableCell>
                                                    </TableRow>
                                                )

                                            })
                                    }

                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            component="div"
                            rowsPerPageOptions={[5, 10]}
                            count={budget.details.length}
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
                        <Grid item xs={6} className="boton-aceptar">
                            <Button style={{ backgroundColor: '#9CE37D' }} onClick={(e) => { editBudget(e) }}><DoneIcon sx={{ color: 'white' }} /> </Button>
                        </Grid>
                    </Grid>
                </Stack>

            </Box>

            <CustomAlert text={"Completá todo los campos!"} severity={"error"} open={openCompleteAllFields} closeAction={closeCompleteAllFields} />
            <CustomAlert text={"Las fechas son invalidas"} severity={"warning"} open={invalidDates} closeAction={() => setInvalidDates(false)} />
            <CustomAlert text={"Ya existe un presupuesto para ese periodo"} severity={"error"} open={overlapping} closeAction={() => setOverlapping(false)} />
            <CustomAlert text={"Ingrese un valor valido para al menos una categoria"} severity={"warning"} open={invalidCategoryValue} closeAction={() => setInvalidCategoryValue(false)} />

        </>
    )
}

export default EditBudgetModal;