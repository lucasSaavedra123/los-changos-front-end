import React from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import "../assets/scss/moneyManager.scss";
import Typography from '@mui/material/Typography';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import Stack from '@mui/material/Stack';
import { BACKEND_URL } from "../CONSTANTS";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { Container } from '@mui/system';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { Button } from '@mui/material';
import "../assets/scss/expenseCard.scss"
import ExpenseCategory from './ExpenseCategory';
import { precisionPrefix } from 'd3-format';


//Hay que cambiar que en vez de pasar cada valor, pasarle el presupuesto y uqe itere cada categoria y los totales


export default function NotificationItem(props) {
    const { currentUser } = useContext(AuthContext);
    const [openBudget, setBudgetOpen] = useState(false);
    const [height, setHeight] = useState(130);






    const addCommas = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    const acceptExpenseCard = (e) => {
        e.preventDefault();
        if (window.confirm("¿Estas seguro que queres aceptar este gasto?")) {
            fetch(BACKEND_URL + '/sharedExpense/edit', {
                method: 'PATCH',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + currentUser.stsTokenManager.accessToken
                },
                body: JSON.stringify({
                    id: props.expense.id,
                    userToshare: props.expense.userToShare,
                    aceptedTransaction: true,

                })
            }).then(() => { props.confirmAction() })
        }
    }
    const rejectExpenseCard = (e) => {
        e.preventDefault();
        if (window.confirm("¿Estas seguro que queres rechazar este gasto?")) {
            fetch(BACKEND_URL + '/sharedExpense', {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + currentUser.stsTokenManager.accessToken
                },
                body: JSON.stringify({
                    id: props.expense.id,
                    userToShare: props.expense.userToShare
                })
            }).then(() => { props.confirmAction() })
        }
    }
    
   


    return (

        
        <Paper
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
                <Grid container spacing={2}>
               
                    <Grid item xs={12} md={12} lg={12}>
                 
                        
                            
                                    <Typography component="h2" variant="h6" color="primary" gutterBottom style={{ color: "green" ,display:'flex',justifyContent:'center'}}>
                                        Gasto Compartido de ${addCommas(props.expense.value)} de {props.expense.user.name} {props.expense.user.lastname} 
                                        {/* {props.expense.userToShare.alias} */}
                                        
                                    </Typography>
                                    <div style={{display:'flex',justifyContent:'center'}}>
                                        {props.expense.name} - {props.expense.date}
                                    </div>
                                    
                                        
                                    
                          

                        
                    </Grid>
                    <Grid item xs={12} style={{display:'flex',justifyContent:'center'}}>
                        
                    ¿ Desea Aceptar el Gasto compartido de  ${addCommas(props.expense.value)} ?
                        
                    </Grid>
                    <Grid className='accept-button' item xs={6} md={6} lg={6}>
                        <Button  onClick={acceptExpenseCard}>
                            <CheckIcon sx={{ color: "black" }} />
                        </Button>

                    </Grid>
                    <Grid className='reject-button' item xs={6} md={6} lg={6} >
                        <Button  onClick={rejectExpenseCard}>
                            <ClearIcon sx={{ color: "black" }} />
                        </Button>
                    </Grid>



                </Grid>
                </Paper>

    )
}
