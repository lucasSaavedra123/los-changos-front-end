import MoneyDetails from "./MoneyDetails";
import "../assets/scss/moneyManager.scss"
import { AuthContext } from "../context/AuthContext";
import { useContext, useState } from "react";
import ExpendCard from "./ExpendCard";
import ModalDetailedExpenseCard from "./ModalDetailedExpenseCard";
import CategoryModal from "./CategoryModal";
import MovementsTable from "./MovementsTable";
import Button from '@mui/material/Button'
import { Modal } from '@material-ui/core';
import AddExpenseModal from "./AddExpenseModal";
import AddIcon from '@mui/icons-material/Add';


export const MoneyManager = () => {

  const { currentUser } = useContext(AuthContext);

  const [open, setOpen] = useState(false);
  const handleAgregarGasto = () => setOpen(true);
  const handleClose = () => setOpen(false);

    return(
      //  <div className="app-container">
      //   <div className="responsive-container">
      //     <div className="header-container">
      //       <h1 className="heading">¡Bienvenido a Walletify {currentUser.displayName} !</h1>
      //     </div>
      //     <MoneyDetails/>
      //       <div className="history-transactions">
      //         <h1 className="transaction-header">History</h1>
      //         <div className="transactions-table-container">
      //           <ul className="transactions-table">
      //           <ExpendCard title={"Cafe Eatbar"} value={"200"} onclick={openDetailedCard}/>
      //             <ExpendCard title={"Cafe Eatbar"} value={"200"} onclick={openDetailedCard}/>
      //             <ExpendCard title={"Cafe Eatbar"} value={"200"} onclick={openDetailedCard}/>
      //             <ExpendCard title={"Cafe Eatbar"} value={"200"} onclick={openDetailedCard}/>
      //             <ExpendCard title={"Cafe Eatbar"} value={"200"} onclick={openDetailedCard}/>
      //             <ExpendCard title={"Cafe Eatbar"} value={"200"} onclick={openDetailedCard}/>
      //             <ExpendCard title={"Cafe Eatbar"} value={"200"} onclick={openDetailedCard}/>             
      //           </ul>
      //         </div>
            
      //     </div>
      //   </div>
      // </div>
      <div className="app-container">
          <div className="responsive-container">
               <div className="header-container">
                <h1 className="heading">¡Bienvenido a Walletify {currentUser.displayName} !</h1>
              </div>
          </div>
          <div className="balance">
            <MoneyDetails/>
          </div>
          <div className="add-expense-modal">
            <Button className="add-expense" onClick={handleAgregarGasto}>
              <AddIcon/>
            </Button>
            <Modal
            open={open} onClose={handleClose}>
                <div className="add-expense-modal">
                  <AddExpenseModal handleCloseModal={handleClose}/>
                </div>
            </Modal>
          </div>
          {/* <div className="chart"> Hola Chart</div> */}
          <div className="movements">Movimientos
            <MovementsTable/>
          </div>

      </div>
      )
}

export default MoneyManager;