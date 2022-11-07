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


//Hay que cambiar que en vez de pasar cada valor, pasarle el presupuesto y uqe itere cada categoria y los totales



export default function Presupuesto(props) {
    const { currentUser } = useContext(AuthContext);
    const [openBudget, setBudgetOpen] = useState(false);
    const [height,setHeight]= useState(130);
    const now = props.percentage;
    const funcion = () => {
        let newHeight= 130 + 3*15
        setBudgetOpen(!openBudget)
        console.log(newHeight)
        setHeight(newHeight)
      
    }

    const funcion2 = () =>{
        setBudgetOpen(!openBudget)
        setHeight(130)
    }

    useEffect(() => {
      }, [])

    const createBudget = () => {

          fetch(BACKEND_URL + '/budget', {
            method: 'POST',
            headers: {
              'Authorization': 'Bearer ' + currentUser.stsTokenManager.accessToken,
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
    
    
            body: JSON.stringify({
              initial_date: "2022-11-01",
              final_date: "2022-11-30",
              details:[{category_id:1,limit:10000}]
            })
    
    
          }).then((res) => console.log(res))

      }

    return (

        <Grid item xs={12} md={12} lg={12}>
            <Paper
                sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height:height,
                }}
            >
                <React.Fragment style={{ color: "green" }}>
                    <div className='table-title'>
                        <div className='titulo-principal'>
                            <Typography component="h2" variant="h6" color="primary" gutterBottom style={{ color: "green" }}>
                                Presupuesto del periodo
                            </Typography>
                        </div>

                    </div>
                    {openBudget ? (
                        <div>
                            
                            <Stack>
                                
                                <Grid container spacing={0.5}>
                                    <Grid item lg={10} xs={10} md={10}>
                                    <ProgressBar className='linea-progreso' now={now} variant="success" label={`${now}%`} />
                                    </Grid>
                                    <Grid item lg={2} xs={2} md={2}>
                                        <div>
                                            {props.spent_budget}/{props.limit_budget}
                                        </div>
                                    </Grid>
                                </Grid>
                                
                                
                                <Grid container spacing={0.5} style={{marginLeft:5}}>
                                    <Grid item lg={10} xs={10} md={10}>
                                    <ProgressBar className='linea-progreso' now={80} variant="danger" label={`${now}%`} />
                                    </Grid>
                                    <Grid item lg={2} xd={2} md={2}>
                                        <div>
                                        {props.spent_budget}/{props.limit_budget}
                                        </div>
                                    </Grid>
                                </Grid>
                
                                
                                <Grid container spacing={0.5} style={{marginLeft:5}}>
                                    <Grid item lg={10} xs={10} md={10}>
                                    <ProgressBar className='linea-progreso' now={30} variant="success" label={`${now}%`} />
                                    </Grid>
                                    <Grid item lg={2} xs={2} md={2}>
                                        <div>
                                        {props.spent_budget}/{props.limit_budget}
                                        </div>
                                    </Grid>
                                </Grid>
                                
                            </Stack>
                            
                            
                            <div className='flecha-abajo'>
                                <ArrowDropUpIcon onClick={funcion2} />
                                
                            </div>
                        </div>

                    ) : (
                        <div>
                                <Grid container spacing={0.5}>
                                    <Grid item lg={10} xs={10} md={10}>
                                    <ProgressBar className='linea-progreso' now={Math.round(now)} variant="success" label={`${now}%`} />
                                    </Grid>
                                    {/* Probar onblur  */}
                                    <Grid item lg={2} xs={2} md={2}>
                                        <div>
                                        {props.spent_budget}/{props.limit_budget}
                                        </div>
                                    </Grid>
                                </Grid>

                            <div className='flecha-abajo'>
                                <ArrowDropDownIcon onClick={funcion} />
                            </div>
                            
                        </div>

                    )}
                </React.Fragment>
            </Paper>
        </Grid>








    )
}

