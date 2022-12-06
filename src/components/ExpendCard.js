import "../assets/scss/expenseCard.scss"
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import { Modal } from '@mui/material';
import ModalDetailedExpenseCard from './ModalDetailedExpenseCard';
import EditExpenseModal from './EditExpenseModal';
import EditIncome from './EditIncome';
import CategoryIcon from './CategoryIcon';
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { BACKEND_URL } from "../CONSTANTS";
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { Button } from '@mui/material';
import { PeopleAlt } from "@mui/icons-material";
import CustomAlert from "./CustomAlert";


export const ExpendCard = (props) => {
    const [open, setOpen] = useState(false);
    const [balanceError, setBalanceError] = useState(false)
    const [openCategory, setCategoryOpen] = useState(false)
    const handleCategoryClose = () => {setCategoryOpen(false)}
    const [incomeOpen, setIncomeOpen] = useState(false)
    const handleIncomeClose = () => {setIncomeOpen(false)}
    const handleClose = () => setOpen(false)
    const handleBalanceErrorClose = () =>{setBalanceError(false)}
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
            <TableCell>{props.type === "expense" ? "-" + "$" + addCommas(props.value) : "$" + addCommas(props.value)}</TableCell>
            <TableCell>
                <div className='buttons-transactions-table'>
                    
                        <Button className='view-detailed-expense' onClick={() => setOpen(!open)}>
                        <VisibilityIcon sx={{ color: "black" }} />
                        </Button>
                    
                    
                        <Button className='delete-button' onClick={(e)=>{
                            if(props.type === "income"){
                                if(props.balance - props.value>=0){
                                    deleteExpenseCard(e)
                                }else{
                                    setBalanceError(true)
                                }
                            }else{
                                deleteExpenseCard(e)
                            }
                            }}>
                        <DeleteIcon sx={{ color: "black" }} />
                        </Button>
                    
                    
                        <Button className='edit-button' onClick={() => {if(props.type==="expense")
                                                                            {setCategoryOpen(!openCategory)}
                                                                            else if(props.type==="income"){
                                                                                setIncomeOpen(true)
                                                                            }}}>
                        <EditIcon sx={{ color: "black" }} />
                        </Button>
                    

                    <Modal open={open} onClose={handleClose} >
                        <ModalDetailedExpenseCard name={props.name} value={props.value} category={props.category.name} date={props.date} icon={<CategoryIcon size={'60px'} name={props.category.material_ui_icon_name} />} />
                    </Modal>

                    <Modal open={openCategory}
                        onClose={handleCategoryClose} disableBackdropClick>
                        
                        <EditExpenseModal action={'Editar'}confirmAction={props.confirmAction} category={props.category} id={props.id} date={props.date} name={props.name} value={props.value} handleCloseModal={handleCategoryClose} />
                    </Modal>

                    <Modal open={incomeOpen}
                        onClose={handleIncomeClose} disableBackdropClick>
                        
                        <EditIncome action={'Editar'}confirmAction={props.confirmAction} category={props.category} id={props.id} date={props.date} name={props.name} value={props.value} handleCloseModal={handleIncomeClose} />
                    </Modal>


                </div>
            </TableCell>
            <CustomAlert text={"No podes borrar este gasto porque quedarias en negativo"} severity={"error"} open={balanceError} closeAction={handleBalanceErrorClose} />

            {/* <ExpendCard id={transaction.id} title ={transaction.name} value={transaction.value} date={transaction.date} category={transaction.category} confirmAction={props.confirmAction} ></ExpendCard> */}
        </TableRow>
        // <div className="card-wrapper">{//Aca cambie el color del fondo de las cartas
        // }
        //     <div className="left-side"  >

        //         <CategoryIcon name={props.category.material_ui_icon_name} color={'white'}/>

        //         <div className="expense-title" >{props.title}</div>
        //     </div>

        //     <Modal open={open} onClose={handleClose} >
        //         <ModalDetailedExpenseCard title={props.title} value={props.value} category={props.category.name} date={props.date} icon={<CategoryIcon sx={{fontSize: 90, color:'black'}} name={props.category.material_ui_icon_name}/>}/>
        //     </Modal>
        //     <div className="right-side">
        //         <div className="expense-value">${addCommas(props.value)}</div>
        //         <div className='buttons-transactions-table'>
        //             <div className='view-detailed-expense' onClick={() => setOpen(!open)}> 
        //                 <VisibilityIcon sx={{ color: "white" }}/>
        //             </div>
        //             <div className='delete-button' onClick={deleteExpenseCard}>
        //                 <DeleteIcon sx={{ color: "white" }}/>
        //             </div>
        //             <div className='edit-button' onClick={() => setCategoryOpen(!openCategory)}>
        //                 <EditIcon sx={{ color: "white" }} />

        //             </div>

        //             <Modal open={openCategory}
        //                 onClose={handleCategoryClose} disableBackdropClick>
        //                 <EditExpenseModal confirmAction={props.confirmAction} category={props.category} id={props.id} date={props.date} name={props.title} value={props.value} handleCloseModal={handleCategoryClose}/>

        //             </Modal>

        //         </div>
        //     </div>

        // </div>
        //</div>

        

    )



}
export default ExpendCard;