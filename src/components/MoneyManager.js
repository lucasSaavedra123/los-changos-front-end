import "../assets/scss/moneyManager.scss"
import { AuthContext } from "../context/AuthContext";
import { useContext, useState, useEffect } from "react";
import { BACKEND_URL } from "../CONSTANTS";
import DashboardContent from "./Dashboard";


export const MoneyManager = () => {
  
  let today = new Date();
  const { currentUser } = useContext(AuthContext);
  const [total, setTotal] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [dateFrom, setDateFrom] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [dateTo, setDateTo] = useState(today);
  const [selected, setSelected] = useState([]);
  const [options, setOptions] = useState([])


  const applyDateFilter = () => {
      fetch(BACKEND_URL+'/expense/filter', {
          method: 'POST',
          headers: {
              'Authorization': 'Bearer ' + currentUser.stsTokenManager.accessToken,
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
  
          
          body: JSON.stringify({
              timeline:[dateFrom.toISOString().split('T')[0],dateTo.toISOString().split('T')[0]],
              category_id: []
          })
  
  
      })
      .then((res)=>res.json())
      .then((data) =>updateFilterTransactions(data))
  }

  const updateFilterTransactions = (newTransactions) =>{
    console.log("MeEjecute")
    setTransactions(newTransactions)
    let categories = {}
    newTransactions.map((transaction) => {
      categories[transaction.category.name] = transaction.category.id
    });
    let names = Object.keys(categories);
    let optionsAux = []
    names.map((name)=>{
      let option = {
        label: name,
        value: categories[name]
      }
      optionsAux.push(option)


    })
    setOptions(optionsAux)
    setTotal(transactions.reduce((total,transaction) =>  total = total + parseFloat(transaction.value) , 0 )); 
  }

  useEffect(() => {
    applyDateFilter()
  }, []);

  return (
    <DashboardContent total={total} transactions={transactions}/>
  )
}

export default MoneyManager;