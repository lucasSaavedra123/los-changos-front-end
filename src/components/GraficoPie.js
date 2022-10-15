import {Pie,getElementAtEvent, getDatasetAtEvent} from 'react-chartjs-2'
import { useRef, React, useEffect,useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';


  export const GraficoPie = (props) =>{

    const getCategoriesFromTransactions = () =>{
      let categoriesValue = {}
      let categoriesColor = []
      props.transactions.map((transaction) => {
        categoriesValue[transaction.category.id] = typeof categoriesValue[transaction.category.id] === "undefined" ? transaction.value : categoriesValue[transaction.category.id] + transaction.value;
        categoriesColor[transaction.category.id] = transaction.category.color
      })
    }

    useEffect(() => {
      getCategoriesFromTransactions()
    }, [props.transactions]);
    
    const newData = {
      labels: ['Blue', 'Yellow', 'Green', 'Purple', 'Orange', "Prueba"],
      datasets: [
        {
          data: [ 3, 5, 2, 3, 3,5],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderWidth: 1,
        },
      ],
    };

    const chartRef = useRef();
    ChartJS.register(ArcElement, Tooltip, Legend);
    const [data, setData] = useState(newData);


    const onClick = (event) => {
      let elements = getElementAtEvent(chartRef.current, event)
      console.log(data.datasets.backgroundColor[elements[0].index]);
    }

    


    return <Pie ref={chartRef} options={{responsive:true}} data= {data} onClick={onClick} />
}


export default GraficoPie;