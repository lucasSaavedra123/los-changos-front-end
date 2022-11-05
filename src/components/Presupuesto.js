import React from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import "../assets/scss/moneyManager.scss";
import Typography from '@mui/material/Typography';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useState } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import Stack from '@mui/material/Stack';




export default function Presupuesto(props) {
    const [openBudget, setBudgetOpen] = useState(false);
    const [height,setHeight]= useState(130);
    const now = 60;

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
                                            60000/100000
                                        </div>
                                    </Grid>
                                </Grid>
                                
                                
                                <Grid container spacing={0.5} style={{marginLeft:5}}>
                                    <Grid item lg={10} xs={10} md={10}>
                                    <ProgressBar className='linea-progreso' now={80} variant="danger" label={`${now}%`} />
                                    </Grid>
                                    <Grid item lg={2} xd={2} md={2}>
                                        <div>
                                            60000/100000
                                        </div>
                                    </Grid>
                                </Grid>
                
                                
                                <Grid container spacing={0.5} style={{marginLeft:5}}>
                                    <Grid item lg={10} xs={10} md={10}>
                                    <ProgressBar className='linea-progreso' now={30} variant="success" label={`${now}%`} />
                                    </Grid>
                                    <Grid item lg={2} xs={2} md={2}>
                                        <div>
                                            60000/100000
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
                                    <ProgressBar className='linea-progreso' now={now} variant="success" label={`${now}%`} />
                                    </Grid>
                                    {/* Probar onblur  */}
                                    <Grid item lg={2} xs={2} md={2}>
                                        <div>
                                            60000/100000
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

