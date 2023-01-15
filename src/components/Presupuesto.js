import React from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import "../assets/scss/moneyManager.scss";
import Typography from '@mui/material/Typography';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import Stack from '@mui/material/Stack';
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Button } from '@mui/material';
import Divider from '@mui/material/Divider';


//Hay que cambiar que en vez de pasar cada valor, pasarle el presupuesto y uqe itere cada categoria y los totales


export default function Presupuesto(props) {
    const { currentUser } = useContext(AuthContext);
    const [openBudget, setBudgetOpen] = useState(false);
    const [height, setHeight] = useState(130);
    const budget = props.budget;
    const percentage = Math.round(budget.total_spent * 100 / budget.total_limit);
    const variant = percentage > 100 ? "danger" : percentage > 70 ? "warning" : "success";
    const quantityOfCategorys = typeof budget.details === "undefined" ? 0 : budget.details.filter(detail => detail.limit > 0);

    const handlePayExecution = (future_expense_id) => {
        console.log(future_expense_id)
    }

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

    const addCommas = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");


    const funcion = () => {
        let newHeight = 130 + (quantityOfCategorys + 1) * 48
        setBudgetOpen(!openBudget)
        setHeight(newHeight)

    }

    const funcion2 = () => {
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
                    height: height,
                }}
            >
                {(props.isLoading || Object.keys(budget).length === 0) ?
                    (<div className='table-title'>
                        <div className='titulo-principal'>
                            <Typography component="h2" variant="h6" color="primary" gutterBottom style={{ color: "green" }}>
                                {"Presupuesto"}
                            </Typography>
                            <div>No hay presupuesto asignado al periodo</div>
                        </div>

                    </div>)
                    :

                    (<React.Fragment style={{ color: "green" }}>
                        <div className='table-title'>
                            <div className='titulo-principal'>
                                <Typography component="h2" variant="h6" color="primary" gutterBottom style={{ color: "green" }}>
                                    {"Presupuesto del periodo " + budget.initial_date + " " + budget.final_date}
                                </Typography>
                            </div>

                        </div>
                        {openBudget ? (
                            <div>

                                <Stack spacing={1}>
                                    <Grid container spacing={0.5}>
                                        <Grid item lg={10} xs={10} md={10}>
                                            <ProgressBar className='linea-progreso' now={percentage} variant={variant} label={`${percentage}%`} />
                                        </Grid>
                                        <Grid item lg={2} xs={2} md={2}>
                                            <div>
                                                {addCommas(budget.total_spent)}/{addCommas(budget.total_limit)}
                                            </div>
                                        </Grid>
                                    </Grid>

                                    <Typography component="h6" variant="h6" color="primary" gutterBottom style={{ color: "green" }}>
                                        {"Limites"}
                                    </Typography>

                                    {budget.details.filter(detail => detail.limit > 0).map((categoryBudget) => {
                                        let spent = Math.round(categoryBudget.spent)
                                        let limit = Math.round(categoryBudget.limit)
                                        let categoryPercentage = Math.round((spent * 100 / limit))
                                        let categoryName = categoryBudget.category.name;
                                        let categoryVariant = categoryPercentage > 100 ? "danger" : categoryPercentage > 70 ? "warning" : "success";
                                        return (
                                            <Stack>
                                                <Grid><div style={{ marginLeft: 10 }}> {categoryName} </div></Grid>
                                                <Grid container spacing={0.5} style={{ marginLeft: 'auto' }}>
                                                    <Grid item lg={10} xs={10} md={10}>
                                                        <ProgressBar className='linea-progreso' now={categoryPercentage} variant={categoryVariant} label={`${categoryPercentage}%`} />
                                                    </Grid>
                                                    <Grid item lg={2} xd={2} md={2}>
                                                        <div style={{ marginTop: 'auto' }}>
                                                            {addCommas(spent)}/{addCommas(limit)}
                                                        </div>
                                                    </Grid>
                                                </Grid>
                                            </Stack>
                                        )
                                    })}

                                    <Typography component="h6" variant="h6" color="primary" gutterBottom style={{ color: "green" }}>
                                        {"Gastos Futuros"}
                                    </Typography>


                                    {(budget.details.filter(detail => detail.value != undefined).length === 0) ? (<div>No hay gastos futuros agregados</div>) : (

                                        budget.details.filter(detail => detail.value != undefined).map((categoryBudget) => {
                                            let value = Math.round(categoryBudget.value)
                                            let categoryName = categoryBudget.category.name;
                                            return (
                                                <Stack>
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={6}>
                                                            <div style={{ marginLeft: 10 }}> Nombre: {addCommas(categoryBudget.name)} </div>
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            <div style={{ marginLeft: 10 }}> Valor: ${addCommas(categoryBudget.value)} </div>
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            <div style={{ marginLeft: 10 }}> Fecha de vencimiento: {categoryBudget.expiration_date} </div>
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            <div style={{ marginLeft: 10 }}> Categoria: {categoryName} </div>
                                                        </Grid>
                                                    </Grid>
                                                    <Button disabled={categoryBudget.expended} sx={styles} className="add-expense-button" variant='outlined' onClick={() => handlePayExecution(categoryBudget.id)}>
                                                        EJECUTAR PAGO
                                                    </Button>
                                                    <Divider variant="middle" />

                                                </Stack>


                                            )
                                        }))}

                                </Stack>


                                <div className='flecha-abajo'>
                                    <ArrowDropUpIcon onClick={funcion2} />

                                </div>
                            </div>

                        ) : (
                            <div>
                                <Grid container spacing={0.5}>
                                    <Grid item lg={10} xs={10} md={10}>
                                        <ProgressBar className='linea-progreso' now={percentage} variant={variant} label={`${percentage}%`} />
                                    </Grid>
                                    {/* Probar onblur  */}
                                    <Grid item lg={2} xs={2} md={2}>
                                        <div>
                                            {addCommas(budget.total_spent)}/{addCommas(budget.total_limit)}
                                        </div>
                                    </Grid>

                                </Grid>

                                <div className='flecha-abajo'>
                                    <ArrowDropDownIcon onClick={funcion} />
                                </div>

                            </div>

                        )}
                    </React.Fragment>)}
            </Paper>
        </Grid>








    )
}

