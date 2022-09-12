import "../assets/scss/constants.scss"

import { useAuth0 } from "@auth0/auth0-react";

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { THEME } from "../CONSTANTS"
import '../assets/scss/navbar.scss';

import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import LogoutIcon from '@mui/icons-material/Logout';

import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import MenuIcon from '@mui/icons-material/Menu';
import { ProfileNavigatorItem } from "./ProfileNavigatorItem";


export const ProfileNavigator = () => {
    const { logout } = useAuth0();
    const { loginWithRedirect } = useAuth0();

    const [state, setState] = React.useState({
        left: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                <ProfileNavigatorItem name={"Home"} icon={<HomeIcon />} path={"/"}/>
                <ProfileNavigatorItem name={"Settings"} icon={<SettingsIcon />} path={"/settings"}/>
            </List>

            <Divider />

            <List>
                <ProfileNavigatorItem name={"Log Out"} icon={<LogoutIcon />} action={() => { logout() }} path={"/"}/>
            </List>
        </Box>
    );


    return (
        <>
            <Navbar bg="black" variant="dark">
                <Container>

                    <React.Fragment key={"left"}>
                        <Button className="custom-font-light" variant="outlined" theme={THEME} onClick={toggleDrawer("left", true)}><MenuIcon /></Button>

                        <Drawer
                            anchor={"left"}
                            open={state["left"]}
                            onClose={toggleDrawer("left", false)}
                        >
                            {list("left")}
                        </Drawer>
                    </React.Fragment>

                    <Navbar.Brand>
                        <img
                            src="/logo192.png"
                            width="30"
                            height="30"
                            className="d-inline-block align-top logo"
                            style={{ "margin-right": "15px", "margin-left": "15px" }}
                        />
                        <span className="custom-font-light">Walletify</span>
                    </Navbar.Brand>
                </Container>
            </Navbar>
        </>
    );
};

export default ProfileNavigator
