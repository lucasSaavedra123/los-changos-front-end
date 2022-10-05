import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import "../assets/scss/expenseCard.scss"
import { Button } from 'react-bootstrap';
import { useState } from 'react';
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

    return (
        <>
        
        <div className={setIsHovering? "type-category-container" :"active"} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
            
              <div>{props.title}</div>
                    <ListItemIcon>
                        {props.icon}
                    </ListItemIcon>
                <Button>Borrar</Button>            
            
        </div>
        </>
    );

}

export default ExpenseDynamicCategory;
