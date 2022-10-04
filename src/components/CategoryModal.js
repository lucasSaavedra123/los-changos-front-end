import { TextField } from "material-ui";
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CasinoIcon from '@mui/icons-material/Casino';
import HomeIcon from '@mui/icons-material/Home';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import KitchenIcon from '@mui/icons-material/Kitchen';
import "../assets/scss/expenseCard.scss"
import { Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import ExpenseCategory from "./ExpenseCategory";
import { Casino } from "@mui/icons-material";
import { useState } from "react";
import Modal from '@mui/material/Modal';
import AddCategoryModal from "./AddCategoryModal";

export const CategoryModal = (props) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
 

      return(
           <div className="category-modal-container">
            <div className="category-modal-wrapper">
            
            <ExpenseCategory title={"Impuestos y Servicios"} icon={<AccountBalanceIcon sx={{ color: "black" }} />} />

            <ExpenseCategory title={"Entretenimiento y Ocio"} icon={<CasinoIcon sx={{ color: "black" }} />}/>

            <ExpenseCategory title={"Hogar y Mercado"} icon={<HomeIcon sx={{ color: "black" }} />}/>

            <ExpenseCategory title={"Buen vivir"} icon={<EmojiEmotionsIcon sx={{ color: "black" }} />}/>
            
            <ExpenseCategory title={"Electrodomesticos"} icon={<KitchenIcon sx={{ color: "black" }} />}/>
            
            <div className="boton-modal">
            <Button onClick={()=>setOpen(!open)}>
                <AddIcon/>
            </Button>

            <Modal open={open}
                    onClose={handleClose}
                >
                    <AddCategoryModal/>
            </Modal>
            </div>
            
            </div>

        </div>
        ) 
  }
  
  export default CategoryModal;