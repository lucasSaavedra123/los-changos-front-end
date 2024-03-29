import "../assets/scss/expenseCard.scss"
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import { Modal } from '@mui/material';
import ModalDetailedExpenseCard from './ModalDetailedExpenseCard';
import EditExpenseModal from './EditExpenseModal';
import CategoryIcon from './CategoryIcon';
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { BACKEND_URL } from "../CONSTANTS";
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { Button } from '@mui/material';

export const ExpendCard = (props) => {
    const [open, setOpen] = useState(false);
    const [openCategory, setCategoryOpen] = useState(false)
    const handleCategoryClose = () => {
        setCategoryOpen(false)
    }
    const handleClose = () => setOpen(false)
    const { currentUser } = useContext(AuthContext);

    const addCommas = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    const deleteExpenseCard = (e) => {
        e.preventDefault();
        if (window.confirm("¿Estas seguro que queres borrar este gasto?")) {
            fetch(BACKEND_URL + '/expense', {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + currentUser.stsTokenManager.accessToken
                },
                body: JSON.stringify({
                    id: props.id
                })


            }).then(() => { props.confirmAction() })
        }

    }

    return (

        <TableRow hover key={props.id}>
            <TableCell>{props.date}</TableCell>
            <TableCell>{props.name}</TableCell>
            <TableCell>${addCommas(props.value)}</TableCell>
            <TableCell>
                <div className='buttons-transactions-table'>

                    <Button className='view-detailed-expense' onClick={() => setOpen(!open)}>
                        <VisibilityIcon sx={{ color: "black" }} />
                    </Button>

                    {props.future_expense ? null :
                    <>
                    <Button className='delete-button' onClick={deleteExpenseCard}>
                        <DeleteIcon sx={{ color: "black" }} />
                    </Button>


                    <Button className='edit-button' onClick={() => setCategoryOpen(!openCategory)}>
                        <EditIcon sx={{ color: "black" }} />
                    </Button>
                    </>
                    }



                    <Modal open={open} onClose={handleClose} >
                        <ModalDetailedExpenseCard name={props.name} value={props.value} category={props.category.name} date={props.date} icon={<CategoryIcon size={'60px'} name={props.category.material_ui_icon_name} />} />
                    </Modal>

                    <Modal open={openCategory}
                        onClose={handleCategoryClose}>
                        <EditExpenseModal action={'Editar'} confirmAction={props.confirmAction} category={props.category} id={props.id} date={props.date} name={props.name} value={props.value} handleCloseModal={handleCategoryClose} />
                    </Modal>


                </div>
            </TableCell>
        </TableRow>

    )



}
export default ExpendCard;