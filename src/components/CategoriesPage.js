import React from 'react';

import "../assets/scss/settings.scss"

import Button from '@mui/material/Button';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useEffect } from 'react';
import { useState } from 'react';

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
import AddCategoryModal from './AddCategoryModal';
import { BACKEND_URL } from '../CONSTANTS';

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const { currentUser } = useContext(AuthContext);
  const getCategories = () =>{
       fetch(BACKEND_URL+'/category', {
        headers: {
          'Authorization': 'Bearer ' + currentUser.stsTokenManager.accessToken
        }
       })
           .then((response) => response.json())
           .then((actualData) =>{ 
            console.log("New Categories:", actualData)
            console.log("Current Categories:", categories)
            if(JSON.stringify(actualData) != JSON.stringify(categories)){
              setCategories(actualData);  
          }  
           })
               .catch((err) => {
               console.log(err.message);
           });
  }

  useEffect(() => {
    getCategories()
  }, [categories]);

  return (

    <div className="app-container">
    <div className='buttonContainer'>
      {/* <Link className="backArrow" to="/profile/home" style={{ color: "grey"}}><ArrowBackIcon></ArrowBackIcon> </Link> */}
      <div className="addCategoryButton" style={ {borderRadius: 5, border: "1px solid #9CE37D", backgroundColor: "black"}} >
          <Button className="add-expense-button" style={{color:"white", textDecoration:"none"}} onClick={()=>setOpen(!open)}>
            AGREGAR CATEGORIA
          </Button>
        </div>
    </div>
    <Modal open={open} onClose={handleClose} >
      <AddCategoryModal handleCloseModal={handleClose} confirmAction={getCategories}/>
    </Modal>  
    <div className="movements" style={{borderRadius: 5, border: "1px solid #9CE37D",backgroundColor: "black" }} >Categorias
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
                <TableRow value={category} style={{borderRadius: 5, border: "1px solid #9CE37D",backgroundColor: "black" }}>
                <ExpenseCategory name={category.name} id={category.id} icon={category.material_ui_icon_name}/>
                </TableRow>
                )}
            else{
                return(
                <TableRow value={category} style={{borderRadius: 5, border: "1px solid #9CE37D",backgroundColor: "black" }}>
                <ExpenseDynamicCategory title={category.name} id={category.id} icon={category.material_ui_icon_name} confirmAction={()=>{getCategories();}}/>
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