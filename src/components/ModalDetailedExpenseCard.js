import "../assets/scss/expenseCard.scss"
import EmojiEmotions from '@mui/icons-material/EmojiEmotions';
import CategoryModal from "./CategoryModal";
import { useState } from "react";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Button } from "react-bootstrap";

export const ModalDetailedExpenseCard = (props) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
 
      return(
        <div className="contenedor-card">
        <div className='detailed-expense-card'>
            <div className="detailed-logo">
                <EmojiEmotions fontSize="large"/>
            </div>
            <div className="expense">
                <div className='price'>${props.value}</div>
                <div className='expense-detail'>{props.title}</div>
                <div className='date'>{props.date}</div>
            </div>
            <div className="category">
                <div className='category-type'>{props.category}</div>
                <Button className='change-category' onClick={handleOpen}>CAMBIAR</Button>
                <Modal open={open}
                    onClose={handleClose}
                >
                    <CategoryModal/>
                </Modal>
            </div>
        </div>
        </div>
        )
  }
  
  export default ModalDetailedExpenseCard;