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


const budgetModal= {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,

}

export const AddBudgetModal = (props) => {

    let today = new Date();
    const [icon, setIcon] = useState(typeof props.icon === "undefined" ? '' : props.icon);
    const [name, setName] = useState(typeof props.name === "undefined" ? '' : props.name);
    const [monto, setMonto] = useState(0);
    const { currentUser } = useContext(AuthContext);
    const [openCompleteAllFields, setopenCompleteAllFields] = useState(false);
    const [dateFrom, setDateFrom] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
    const [dateTo, setDateTo] = useState(today);
    const [category, setCategory] = useState(typeof props.category === "undefined" ? '' : props.category.id);
    const [categories, setCategories] = useState([]);

    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(0);

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

    const createBudget = () => {

        fetch(BACKEND_URL + '/budget', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + currentUser.stsTokenManager.accessToken,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },


            body: JSON.stringify({
                initial_date: "2022-12-01",
                final_date: "2022-12-30",
                details: [{ category_id: 1, limit: 10000 }]
            })


        }).then((res) => console.log(res))

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
                setCategories(actualData);

            })
            .catch((err) => {
                console.log(err.message);
            });


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


    return (
        <>

            <Box sx={budgetModal}>
                <Stack spacing={0.5}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Nuevo presupuesto
                    </Typography>
                    <TextField defaultValue={name} label="Nombre del presupuesto" onChange={(e) => { setName(e.target.value) }} />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DesktopDatePicker
                            label="Desde"
                            inputFormat="MM/DD/YYYY"
                            value={dateFrom}
                            onChange={handleChangeFrom}
                            sx={{ color: '#9CE37D;' }}
                            disableFuture='true'
                            renderInput={(params) => <TextField {...params} />}
                        />
                        <DesktopDatePicker
                            label="Hasta"
                            inputFormat="MM/DD/YYYY"
                            value={dateTo}
                            onChange={handleChangeTo}
                            disableFuture='true'
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
                                            <TableCell> <TextField></TextField> </TableCell>
                                        </TableRow>
                                                

                                        ))}
                                
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            component="div"
                            rowsPerPageOptions={[5, 10, 25]}
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
                        <Grid item xs={6} className="boton-aceptar">
                            <Button style={{ backgroundColor: '#9CE37D' }} onClick={createBudget}><DoneIcon sx={{ color: 'white' }} /> </Button>
                        </Grid>
                    </Grid>
                </Stack>

            </Box>

            <CustomAlert text={"Completá todo los campos!"} severity={"error"} open={openCompleteAllFields} closeAction={closeCompleteAllFields} />

        </>
    )
}

export default AddBudgetModal;