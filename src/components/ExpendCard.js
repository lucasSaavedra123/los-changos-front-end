import HomeIcon from '@mui/icons-material/Home';
import ListItemIcon from 'material-ui/List/ListItem';
import "../assets/scss/expenseCard.scss"
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import { Modal } from '@mui/material';
import ModalDetailedExpenseCard from './ModalDetailedExpenseCard';
import CategoryModal from './CategoryModal';
import EditExpenseModal from './EditExpenseModal';


export const ExpendCard = (props) => {
   const [open, setOpen] = useState(false);
   const [openCategory, setCategoryOpen] = useState(false)
   const handleCategoryOpen= () => setCategoryOpen(true)
   const handleCategoryClose = () => setCategoryOpen(false)
   const handleOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);

    const deleteExpenseCard= () =>{
        alert("Se borro el gasto")
    }

    const editExpenseCard = () => {
        alert("Se Edito la card")
    }

    return(

        //<div className='card-container'>
        //onClick={()=>setOpen(!open)}
        <div className="card-wrapper">
            <div className="left-side" onClick={()=>setOpen(!open)} >
                <div className="logo">
                    <LunchDiningIcon/>
                </div>
                <div className="expense-title" >{props.title}</div>
            </div>
            <div className="right-side">
                <div className="expense-value">${props.value}</div>
                <div className='delete-button' onClick={deleteExpenseCard}>
                    <DeleteIcon/>
                </div>
                <div className='edit-button' onClick={()=>setOpen(!open)}>
                    <EditIcon/>
                    <Modal open={open}
                    onClose={handleClose}>
                            <EditExpenseModal/>

                    </Modal>
                </div>
            </div>

        </div>
        //</div>

    )



}
export default ExpendCard;