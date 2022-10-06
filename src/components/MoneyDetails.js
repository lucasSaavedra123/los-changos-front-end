import "../assets/scss/moneyDetails.scss"
import { useState } from "react";
import { useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export const MoneyDetails = (props) => {

  const [transactions, setTransactions] = useState([]);
  const { currentUser } = useContext(AuthContext);

  const getTransactions = () =>{
       fetch('http://walletify-backend-develop.herokuapp.com/transaction', {
        'headers': {
          'Authorization': 'Bearer ' + currentUser.stsTokenManager.accessToken
        }
       })
           .then((response) => response.json())
           .then((actualData) =>{ 
               setTransactions(actualData);           
           })
               .catch((err) => {
               console.log(err.message);
           });

  }

  useEffect(() => {
   getTransactions()
  }, [transactions]);
  
  const total=(transactions.reduce((total,transaction) =>  total = total + parseFloat(transaction.value) , 0 ));

  return (
    <div className="money-details-container">
      <div className="expenses-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
          alt="expenses"
          className="details-img"
        />
        {//Agregar div para ajustar texto con el box 
        }
        <div>
          <p className="details-text">Tus gastos</p>
          <p className="details-money" testid="expensesAmount">
            $ {total}
          </p>
        </div>
      </div>
    </div>
  )
}

export default MoneyDetails