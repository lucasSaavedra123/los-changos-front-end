import React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import "../assets/scss/settings.scss"
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useEffect } from 'react';
import { useState } from 'react';
import TableCell from '@mui/material/TableCell';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Modal } from '@material-ui/core';
import "../assets/scss/expenseCard.scss"
import ExpenseCategory from './ExpenseCategory';
import ExpenseDynamicCategory from './ExpenseDynamicCategory';
import EditCategoryModal from './EditCategoryModal';
import { BACKEND_URL } from '../CONSTANTS';
import Title from './Title'
import { PropaneSharp } from '@mui/icons-material';

export const Categories = () => {
    const styles = {
        "&.MuiButton-root": {
          border: "2px green solid"
        },
        "&.MuiButton-text": {
          color: "green"
        },
        "&.MuiButton-contained": {
          color: "green"
        },
        "&.MuiButton-outlined": {
          color: "green"
        }
      };

    const [categories, setCategories] = useState([]);
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const [loading, setLoading] = useState(true);

    const { currentUser } = useContext(AuthContext);
    const getCategories = () => {
        setLoading(true)
        fetch(BACKEND_URL + '/category', {
            headers: {
                'Authorization': 'Bearer ' + currentUser.stsTokenManager.accessToken
            }
        })
            .then((response) => response.json())
            .then((actualData) => {
                console.log("New Categories:", actualData)
                console.log("Current Categories:", categories)
                if (JSON.stringify(actualData) != JSON.stringify(categories)) {
                    setCategories(actualData);
                }
            })
            .catch((err) => {
                console.log(err.message);
            });
    }

    useEffect(() => {
        getCategories()
        setLoading(false)
    }, [categories]);


    let page = loading ?
    //ACA VA EL LOADING
    <div></div>
    :
    <React.Fragment>
            <div className='table-title'>
                <div className='titulo-principal'>
                    <Title>
                        Categorias
                    </Title>
                </div>
                <div className='boton-principal'>
                    <Button sx={styles} className="add-expense-button" variant='outlined' onClick={() => setOpen(!open)}>
                        AGREGAR CATEGORIA
                    </Button>
                </div>
                <Modal
                    open={open} onClose={handleClose}>
                    <div className="add-expense-modal">
                        <EditCategoryModal handleCloseModal={handleClose} confirmAction={getCategories} />
                    </div>
                </Modal>

            </div>

            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell>Categoria</TableCell>
                        <TableCell>Accion</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {categories.map((category) => {
                        if (category.static === true) {
                            return (
                                //<TableRow hover key={category.id} value={category}>
                                <ExpenseCategory category={category} name={category.name} id={category.id} icon={category.material_ui_icon_name} color={'black'} />
                                //</TableRow>
                            )
                        }
                        else {
                            return (
                                //<TableRow value={category} style={{ borderRadius: 5, border: "1px solid #9CE37D", backgroundColor: "black" }}>
                                    <ExpenseDynamicCategory category={category } name={category.name} id={category.id} icon={category.material_ui_icon_name} color={'black'} confirmAction={() => { getCategories(); }} />
                                //</TableRow>
                            )
                        }
                    })}
                </TableBody>
            </Table>
        </React.Fragment>

    return (
        page
        
    )
}

export default Categories;