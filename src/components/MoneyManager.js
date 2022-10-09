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
import AddIcon from '@mui/icons-material/Add';
import { Link } from "react-router-dom";
import { GraficoPie } from "./GraficoPie";
import EditExpenseModal from "./EditExpenseModal";


export const MoneyManager = () => {

  const { currentUser } = useContext(AuthContext);

  const [open, setOpen] = useState(false);
  const handleAgregarGasto = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
        <MoneyDetails />
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
            <EditExpenseModal handleCloseModal={handleClose} />
          </div>
        </Modal>
      </div>
      {/* <div className="chart"> Hola Chart</div> */}
      <div className="movements" >
        <MovementsTable />
      </div>

    </div>
    
  )
}

export default MoneyManager;