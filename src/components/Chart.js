import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';
import { useState } from 'react';
import { useEffect } from 'react';


// Generate Sales Data
function createData(month, amount) {
  return { month, amount };
}

const data = [
  createData('4', 0),
  createData('7', 300),
  createData('10', 600),
  createData('11', 800),
  createData('12', 1500),
  createData('13', 2000),
  createData('14', 2400),
  createData('15', 2400),
  createData('17', undefined),
];

export default function Chart(props) {
  const theme = useTheme();
  const [options, setOptions] = useState([])
  const [total, setTotal] = useState(0);

  const cargarGrafico = () =>{
    //setTransactions(transactions)
    
    let totalPorMes = {}
    props.transactions.map((transaction) => {
      let mes = new Date(transaction.date+"T00:00:00").getMonth() + 1
      console.log(mes)  
      totalPorMes[mes] = typeof totalPorMes[mes] === 'undefined' ? transaction.value : totalPorMes[mes] + transaction.value
    
    });

    console.log(totalPorMes)
    let meses = Object.keys(totalPorMes);
    let dataAux = []
    meses.map((mes)=>{
    let option = {
        month: mes,
        amount: totalPorMes[mes]
        }
    dataAux.push(option)
    console.log(dataAux)


    })
    setOptions(dataAux)
  }

  useEffect(() => {
    cargarGrafico()
  }, []);

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
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}