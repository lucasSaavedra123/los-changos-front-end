import { Pie, getElementAtEvent, getDatasetAtEvent } from 'react-chartjs-2'
//import { useRef, React, useEffect,useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import Title from './Title';
import { ResponsiveContainer } from 'recharts';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import Typography from '@mui/material/Typography';
import "../assets/scss/moneyManager.scss"
import Stack from '@mui/material/Stack';

export const GraficoPie = (props) => {

  const chartRef = useRef();
  ChartJS.register(ArcElement, Tooltip, Legend);
  const [total, setTotal] = useState();
  const [labels, setLabels] = useState();
  const [backgroundColors, setBackgroundColors] = useState();

  const addCommas = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const getCategoriesFromTransactions = () => {
    let categoriesValue = {}
    let categoriesColor = {}
    let categoriesName = {}
    props.transactions.map((transaction) => {
      categoriesValue[transaction.category.id] = typeof categoriesValue[transaction.category.id] === "undefined" ? transaction.value : categoriesValue[transaction.category.id] + transaction.value;
      categoriesColor[transaction.category.id] = transaction.category.color
      categoriesName[transaction.category.id] = transaction.category.name
    })

    let totalsAux = Object.values(categoriesValue)
    let labelsAux = Object.values(categoriesName)
    let backgroundColorsAux = Object.values(categoriesColor)

    setTotal(totalsAux);
    setLabels(labelsAux);
    setBackgroundColors(backgroundColorsAux)

  }

  useEffect(() => {
    getCategoriesFromTransactions()
    console.log((props.transactions).length)
  }, [props.transactions]);



  const data = {
    labels: labels,
    datasets: [
      {
        data: total,
        backgroundColor: backgroundColors,
        borderColor: backgroundColors,
        borderWidth: 0.1,
      },
    ],
  };

  if ((props.transactions).length === 0) {
    return (<React.Fragment>
      <div className='prueba'>
        Grafico no disponible
      </div>
    </React.Fragment>)
  } else {
    return (
      <React.Fragment>
        <div className='table-title'>
          <div className='titulo-principal'>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Categorias
            </Typography>
          </div>
          <div className='boton-principal'>
          <Stack spacing={1}>
          <Title>Total del Periodo</Title>
            <Typography component="p" variant="h4">
            $ {addCommas(props.total)}
            </Typography>
          </Stack>
        </div>
        </div>
     
      {/* <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link>
      </div> */}
   
        <div className='prueba'>
          <div className='prueba-2'>
            <Pie className='pie' ref={chartRef} options={
              {
                responsive: true,
                plugins: {
                  legend: {
                    display: false
                  }
                }
              }} data={data} />
          </div>
        </div>
      </React.Fragment>

    )
  }

}


export default GraficoPie;