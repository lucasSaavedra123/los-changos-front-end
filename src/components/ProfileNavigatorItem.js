import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Link from '@mui/material/Link';

export const ProfileNavigatorItem = (props) => {

    return (
        <>
                
                <ListItem  style={{width:"100%", padding:0}} key={props.name} onClick={props.action} disablePadding>
                    <Link style={{color:"white",textDecoration:"none" }} href={props.path}>
                    <ListItemButton>
                        <ListItemIcon>
                            {props.icon}
                        </ListItemIcon>
                        <ListItemText primary={props.name} />
                    </ListItemButton>
                    </Link>
                </ListItem>
        </>


    );

}