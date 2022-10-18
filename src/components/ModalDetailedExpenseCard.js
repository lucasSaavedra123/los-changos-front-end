import "../assets/scss/expenseCard.scss"
import { useState } from "react";

export const ModalDetailedExpenseCard = (props) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
 
      return(
       
        <div className="contenedor-card">
        <div className='detailed-expense-card'>
            <div className="detailed-logo">
                {props.icon}
            </div>
            <div className="category">
                <div className='category-type'>{props.category}</div>
            </div>
            <div className="expense">
                <div className='price'>${props.value}</div>
                <div className='expense-detail'>{props.name}</div>
                <div className='date'>{props.date}</div>
            </div>

        </div>
        </div>
        
        )
  }
  
  export default ModalDetailedExpenseCard;