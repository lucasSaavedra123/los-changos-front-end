import React from 'react';

import "../assets/scss/settings.scss"

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import CustomAlert from './CustomAlert';
import { useEffect } from 'react';
import { useState } from 'react';

import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { red } from '@mui/material/colors';
import ModalDetailedExpenseCard from './ModalDetailedExpenseCard';
import { Modal } from '@material-ui/core';
import CategoryCard from './CategoryCard';
import "../assets/scss/expenseCard.scss"
import { Label } from '@mui/icons-material';
import ExpenseCategory from './ExpenseCategory';
import ExpenseDynamicCategory from './ExpenseDynamicCategory';
import AddCategoryModal from './AddCategoryModal';

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const getCategories = () =>{
       fetch('http://walletify-backend-develop.herokuapp.com/category')
           .then((response) => response.json())
           .then((actualData) =>{ 
            setCategories(actualData);   
           })
               .catch((err) => {
               console.log(err.message);
           });
  }

  useEffect(() => {
   getCategories()
  }, [categories]);



  const BasicCard = () => {
    return (
      <Card style={{ borderRadius: 5, border: "1px solid #9CE37D", margin: 30, backgroundColor: "black" }}>
        <CardContent style={{ color: "black" }}>
            <Button onClick={()=>setOpen(!open)}>Agregar Categorias</Button> 
        </CardContent>
  
      </Card>
      
    );

  }
  return (

    <div className="app-container">
    <div className='settings'>
      <BasicCard className='child' />
  
    </div>
    <Modal open={open} onClose={handleClose} >
                    <AddCategoryModal/>
    </Modal>  
    <div className="movements">Movimientos
        <TableContainer component={Paper}>
            <Table >
            <TableHead>
            <TableRow>
            </TableRow>
        </TableHead>
        <TableBody>
        {categories.map((category) => {
            if(category.static === true) {
                return(
                <TableRow value={category}>
                <ExpenseCategory title={category.name} id={category.id} icon={category.material_ui_icon_name}/>
                </TableRow>
                )}
            else{
                return(
                <TableRow value={category}>
                <ExpenseDynamicCategory title={category.name} id={category.id} icon={category.material_ui_icon_name}/>
                </TableRow>
                )}
            })}   
          
        </TableBody>
      </Table>
    </TableContainer>
        </div>
    </div>



 
  );

}

export default CategoriesPage