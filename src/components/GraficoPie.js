import {Pie,getElementAtEvent, getDatasetAtEvent} from 'react-chartjs-2'
import { useRef, React, useEffect,useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';


  export const GraficoPie = (props) =>{

    const chartRef = useRef();
    ChartJS.register(ArcElement, Tooltip, Legend);
    const [total, setTotal] = useState();
    const [labels, setLabels] = useState();
    const [backgroundColors,setBackgroundColors] = useState();
    const [selectedIndex, setSelectedIndex] = useState();

    const getCategoriesFromTransactions = () =>{
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


    return (<Pie ref={chartRef} options={{responsive:true}} data= {data} />)
}


export default GraficoPie;