import * as React from 'react';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';
import { useContext, useState, useEffect } from "react";
import { BACKEND_URL } from "../CONSTANTS";
import { AuthContext } from "../context/AuthContext";
import { createTheme } from '@mui/material/styles';

export default function Chart(props) {
  const { currentUser } = useContext(AuthContext);
  const theme = createTheme({
    palette: {
      primary: {
        light: "green",
        main: "green",
        dark: "green",
        contrastText: '#000',
      }
    },
  });

  const [options, setOptions] = useState([])


  const getTransactions = () =>{
    fetch(BACKEND_URL+'/expense', {
     'headers': {
       'Authorization': 'Bearer ' + currentUser.stsTokenManager.accessToken
     }
    })
        .then((response) => response.json())
        .then((actualData) =>{ 
          cargarGrafico(actualData)
        })
            .catch((err) => {
            console.log(err.message);
        });

}

  const cargarGrafico = (tr) =>{  
    let totalPorMes = {}
    let nombreDeMeses = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dec"]
    tr.map((transaction) => {
      let mes = new Date(transaction.date+"T00:00:00").getMonth()
      if(transaction.type==="expense"){
      totalPorMes[mes] = typeof totalPorMes[mes] === 'undefined' ? transaction.value : totalPorMes[mes] + transaction.value
      }
    });
    let meses = Object.keys(totalPorMes);
    let dataAux = []
    meses.map((mes)=>{
    let option = {
        month: nombreDeMeses[mes],
        amount: totalPorMes[mes]
        }
    dataAux.push(option)


    })
    setOptions(dataAux)
  }

  useEffect(() => {
    getTransactions()
  }, [props.transactions]);

  return (
    <React.Fragment>
      <Title>Gastos Mensuales</Title>
      <ResponsiveContainer>
        <LineChart
          data={options}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis
            dataKey="month"
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          />
          <YAxis
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          >
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: 'middle',
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}
            >
              Gastos ($)
            </Label>
          </YAxis>
          <Line
            isAnimationActive={false}
            type="monotone"
            dataKey="amount"
            stroke={theme.palette.primary.main}
            dot={true}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}