import MoneyDetails from "./MoneyDetails";
import "../assets/scss/moneyManager.scss"
import { AuthContext } from "../context/AuthContext";
import { useContext, useState, useEffect } from "react";
import MovementsTable from "./MovementsTable";
import Button from '@mui/material/Button'
import { Modal } from '@material-ui/core';
import { Link } from "react-router-dom";
import { GraficoPie } from "./GraficoPie";
import EditExpenseModal from "./EditExpenseModal";
import { BACKEND_URL } from "../CONSTANTS";


export const MoneyManager = () => {

  const { currentUser } = useContext(AuthContext);

  const [open, setOpen] = useState(false);
  const [total, setTotal] = useState(0);
  const [transactions, setTransactions] = useState([]);


  const getTransactions = () =>{
    fetch(BACKEND_URL+'/expense', {
     'headers': {
       'Authorization': 'Bearer ' + currentUser.stsTokenManager.accessToken
     }
    })
        .then((response) => response.json())
        .then((actualData) =>{ 
          setTotal(actualData.reduce((total,transaction) =>  total = total + parseFloat(transaction.value) , 0 )); 
          console.log("New Transactions:", JSON.stringify(actualData))
          console.log("Current Transactions:", JSON.stringify(transactions))
          if(JSON.stringify(actualData) != JSON.stringify(transactions)){
               setTransactions(actualData);
           }    
        })
            .catch((err) => {
            console.log(err.message);
        });

}

  const handleAgregarGasto = () => setOpen(true);
  const handleClose = () => {setOpen(false);};

  useEffect(() => {
    getTransactions()
  }, [transactions]);

  return (
    <div className="app-container">
      <div className="responsive-container">
        <div className="header-container">
          <h1 className="heading">¡Bienvenido a Walletify {currentUser.displayName}!</h1>
        </div>
      </div>
      <div>
        <GraficoPie/>
      </div>
      <div className="balance">
        <MoneyDetails total={total}/>
      </div>
      <div className="add-expense-modal">
        <div className="add-expense" style={ {borderRadius: 5, border: "1px solid #9CE37D", backgroundColor: "black"}} >
          <Button className="add-expense-button" style={{color:"white", textDecoration:"none"}} onClick={handleAgregarGasto}>
            AGREGAR GASTO
          </Button>
        </div>
        <div className="see-categories" style={{borderRadius: 5, border: "1px solid #9CE37D", backgroundColor: "black" }} >
          <Button style={{fontFamily: "UnB-Light"}}>
            <Link style={{color:"white", textDecoration:"none"}} to='/profile/categories'>CATEGORIAS</Link>
          </Button>
        </div>
        <Modal
          open={open} onClose={handleClose}>
          <div className="add-expense-modal">
            <EditExpenseModal handleCloseModal={handleClose} confirmAction={getTransactions}/>
          </div>
        </Modal>
      </div>
      {/* <div className="chart"> Hola Chart</div> */}
      <div className="movements" >
        <MovementsTable transactions={transactions} confirmAction={getTransactions}/>
      </div>

    </div>
    
  )
}

export default MoneyManager;