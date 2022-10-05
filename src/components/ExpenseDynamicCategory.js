import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import "../assets/scss/expenseCard.scss"
import { Button } from '@mui/material';
import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
export const ExpenseDynamicCategory = (props) => {
    const [isHovering, setIsHovering] = useState(false);

    
    const handleClick= ()=>{
        
    }

    const handleMouseOver = () => {
        setIsHovering(true);
        console.log("Me active")
        
        
      };
    const handleMouseOut = () => {
        setIsHovering(false);
        console.log("Me desactive")
      }

    const deleteCategory= (e) => {
        e.preventDefault();
        console.log(
        fetch('https://walletify-backend-develop.herokuapp.com/category', {
        method: 'DELETE', 
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            id: props.id
            })

        
        }))
    }

    return (
        <>
        
        <div className={setIsHovering? "type-category-container" :"active"} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
            
              <div>{props.title}</div>
                    <ListItemIcon>
                        {props.icon}
                    </ListItemIcon>
                <Button onClick={deleteCategory}><DeleteIcon/></Button>            
            
        </div>
        </>
    );

}

export default ExpenseDynamicCategory;
