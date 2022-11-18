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
    const [height, setHeight] = useState(150);
    const budget = props.budget;
    const percentage = Math.round(budget.total_spent * 100 / budget.total_limit);
    const variant = percentage > 100 ? "danger" : percentage > 70 ? "warning" : "success";
    const quantityOfCategorys = typeof budget.details === "undefined" ? 0 : budget.details.filter(item => item.limit>0).length;


    const addCommas = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    const funcion = () => {
        let newHeight = 150 + (quantityOfCategorys + 1) * 48
        setBudgetOpen(!openBudget)
        console.log(newHeight)
        setHeight(newHeight)

    }

    const funcion2 = () => {
        setBudgetOpen(!openBudget)
        setHeight(150)
    }


    return (

        <Grid item xs={12} md={12} lg={12}>
            <Paper
                sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: height,
                }}
            >
                <React.Fragment style={{ color: "green" }}>
                    <div className='table-title'>
                        <div className='titulo-principal'>
                            <Typography component="h2" variant="h6" color="primary" gutterBottom style={{ color: "green" }}>
                                {"Presupuesto del periodo " + budget.initial_date + " " + budget.final_date}
                            </Typography>
                        </div>

                    </div>
                    {openBudget ? (
                        <div>


                            <Grid container spacing={0.5}>
                                <Grid item lg={10} xs={8} md={10}>
                                    <ProgressBar className='linea-progreso' now={percentage} variant={variant} label={`${percentage}%`} />
                                </Grid>
                                <Grid item lg={2} xs={4} md={2}>
                                    <div style={{ marginTop: 5, justifyContent: 'right', display: 'flex' }}>
                                        {budget.total_spent}/{budget.total_limit}
                                    </div>
                                </Grid>
                            </Grid>

                            {budget.details.map((categoryBudget) => {
                                let spent = Math.round(categoryBudget.spent)
                                let limit = Math.round(categoryBudget.limit)
                                let categoryPercentage = Math.round((spent * 100 / limit))
                                let categoryName = categoryBudget.category.name;
                                let categoryVariant = categoryPercentage >= 100 ? "danger" : categoryPercentage >= 70 ? "warning" : "success";

                                if(limit != 0){return (


                                    <Grid container spacing={0.5} style={{ marginLeft: 'auto' }}>
                                        <Grid item lg={10} xs={8} md={10} ><div className='categoria-budget'> {categoryName} </div></Grid>
                                        <Grid item lg={10} xs={8} md={10}>
                                            <ProgressBar className='linea-progreso' now={categoryPercentage} variant={categoryVariant} label={`${categoryPercentage}%`} />
                                        </Grid>
                                        <Grid item lg={2} xd={5} md={2}>
                                            <div className='total-gastado'>
                                            ${spent}/${limit}
                                            </div>
                                        </Grid>
                                    </Grid>

                                )}
                            })}

                            <div className='flecha-abajo'>
                                <ArrowDropUpIcon onClick={funcion2} />

                            </div>
                        </div>

                    ) : (
                        <div>
                            <Grid container spacing={0.5}>
                                <Grid item lg={10} xs={8} md={10}>
                                    <ProgressBar className='linea-progreso' now={percentage} variant={variant} label={`${percentage}%`} />
                                </Grid>
                                {/* Probar onblur  */}
                                <Grid item lg={2} xs={4} md={2}>
                                    <div style={{ marginTop: 5, justifyContent: 'right', display: 'flex' }} >

                                    ${budget.total_spent}/${budget.total_limit}
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

