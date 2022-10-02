import MoneyDetails from "./MoneyDetails";
import "../assets/scss/moneyManager.scss"
import TransactionItem from "./TransactionItem";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import ExpendCard from "./ExpendCard";
import ModalDetailedExpenseCard from "./ModalDetailedExpenseCard";
import CategoryModal from "./CategoryModal";

export const MoneyManager = () => {

  const { currentUser } = useContext(AuthContext);

  const openDetailedCard= () =>{



  }
    return(
      // <div className="app-container">
      //   <div className="responsive-container">
      //     <div className="header-container">
      //       <h1 className="heading">¡Bienvenido a Walletify {currentUser.displayName} !</h1>
      //     </div>
      //     <MoneyDetails/>
      //       <div className="history-transactions">
      //         <h1 className="transaction-header">History</h1>
      //         <div className="transactions-table-container">
      //           <ul className="transactions-table">
      //             <li className="table-header">
      //               <p className="table-header-cell">Title</p>
      //               <p className="table-header-cell">Amount</p>
      //               <p className="table-header-cell">Type</p>
      //             </li>         
      //           </ul>
      //         </div>
            
      //     </div>
      //   </div>
      // </div>
      
      // <ExpendCard title={"Cafe Eatbar"} value={"200"} onclick={openDetailedCard}/>
      // <ExpendCard title={"Almuerzo Mcdonalds"} value={"1200"}/>
      <ModalDetailedExpenseCard title={"Almuerzo Mcdonalds"} value={"1200"} category={"Buen vivir"} date={"1 de octubre"}/>
      
      
      )
}

export default MoneyManager;