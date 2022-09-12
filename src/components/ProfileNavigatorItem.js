import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import MenuIcon from '@mui/icons-material/Menu';
import { PropaneSharp } from '@mui/icons-material';
import { Link } from 'react-router-dom';

export const ProfileNavigatorItem = (props) => {

    console.log(props.path)

    return (
        <>
            <List>
                <Link to={props.path}>
                    <ListItem key={props.name} onClick={props.action} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {props.icon}
                            </ListItemIcon>
                            <ListItemText primary={props.name} />
                        </ListItemButton>
                    </ListItem>
                </Link>
            </List>
        </>


    );

}
