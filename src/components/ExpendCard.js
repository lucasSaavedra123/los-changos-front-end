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
import { Link } from "react-router-dom";
import CategoryIcon from './CategoryIcon';


export const ExpendCard = (props) => {
    const [open, setOpen] = useState(false);
    const [openCategory, setCategoryOpen] = useState(false)
    const handleCategoryOpen = () => setCategoryOpen(true)
    const handleCategoryClose = () => {
        setCategoryOpen(false)
    }
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false)

    const deleteExpenseCard = (e) => {
        e.preventDefault();
        fetch('https://walletify-backend-develop.herokuapp.com/transaction', {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: props.id
            })


        })

    }

    const editExpenseCard = () => {
        alert("Se Edito la card")
    }

    return (

        <div className="card-wrapper">
            <div className="left-side" onClick={() => setOpen(!open)} >
                <div className="logo">
                    <CategoryIcon name={props.category.material_ui_icon_name} />
                </div>
                <div className="expense-title" >{props.title}</div>
            </div>

            <Modal open={open}
                onClose={handleClose} >
                <ModalDetailedExpenseCard value={props.value} category={props.category.name} date={props.date} />
            </Modal>
            <div className="right-side">
                <div className="expense-value">${props.value}</div>
                <div className='buttons-transactions-table'>
                    <div className='delete-button' onClick={deleteExpenseCard}>
                        <DeleteIcon />
                    </div>
                    <div className='edit-button' onClick={() => setCategoryOpen(!openCategory)}>
                        <EditIcon />

                    </div>

                    <Modal open={openCategory}
                        onClose={handleCategoryClose} disableBackdropClick>
                        <EditExpenseModal id={props.id} handleCloseModal={handleCategoryClose}/>

                    </Modal>

                </div>
            </div>

        </div>
        //</div>

    )



}
export default ExpendCard;