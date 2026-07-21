import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Avatar,
    Menu,
    MenuItem,
    Divider,
    ListItemIcon,
    ListItemText
} from "@mui/material";

import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import LockResetIcon from "@mui/icons-material/LockReset";
import LogoutIcon from "@mui/icons-material/Logout";

function Navbar() {

    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);

    const handleMenuOpen = (event) => {

        setAnchorEl(event.currentTarget);

    };

    const handleMenuClose = () => {

        setAnchorEl(null);

    };

    const handleNavigate = (path) => {

        handleMenuClose();

        navigate(path);

    };

    const handleLogout = () => {

        handleMenuClose();

        // TODO: Clear JWT / Local Storage after auth integration
        navigate("/login");

    };

    return (

        <AppBar
            position="fixed"
            sx={{
                zIndex: 1201
            }}
        >

            <Toolbar>

                <Typography
                    variant="h6"
                    sx={{
                        flexGrow: 1
                    }}
                >

                    Employee Resource Management System

                </Typography>

                <IconButton color="inherit">

                    <NotificationsIcon />

                </IconButton>

                <IconButton
                    color="inherit"
                    onClick={handleMenuOpen}
                    sx={{ ml: 1 }}
                >

                    <Avatar
    sx={{
        bgcolor: "secondary.main"
    }}
>

    AJ

</Avatar>

                </IconButton>

                <Menu
    anchorEl={anchorEl}
    open={open}
    onClose={handleMenuClose}
    anchorOrigin={{
        vertical: "bottom",
        horizontal: "right"
    }}
    transformOrigin={{
        vertical: "top",
        horizontal: "right"
    }}
    PaperProps={{
        sx: {
            width: 250,
            borderRadius: 3,
            mt: 1
        }
    }}
>

    <MenuItem
        disableRipple
        sx={{
            pointerEvents: "none",
            py: 2
        }}
    >

        <Avatar
            sx={{
                mr: 2,
                bgcolor: "primary.main"
            }}
        >
            AJ
        </Avatar>

        <ListItemText
            primary="Anil Jeji"
            secondary="EMPLOYEE"
        />

    </MenuItem>

    <Divider />

    <MenuItem
        onClick={() => handleNavigate("/profile")}
    >

        <ListItemIcon>

            <PersonIcon fontSize="small" />

        </ListItemIcon>

        My Profile

    </MenuItem>

    <MenuItem
        onClick={() => handleNavigate("/settings")}
    >

        <ListItemIcon>

            <SettingsIcon fontSize="small" />

        </ListItemIcon>

        Settings

    </MenuItem>

    <MenuItem
        onClick={() => handleNavigate("/profile")}
    >

        <ListItemIcon>

            <LockResetIcon fontSize="small" />

        </ListItemIcon>

        Change Password

    </MenuItem>

    <Divider />

    <MenuItem
        onClick={handleLogout}
    >

        <ListItemIcon>

            <LogoutIcon
                fontSize="small"
                color="error"
            />

        </ListItemIcon>

        Logout

    </MenuItem>

</Menu>

            </Toolbar>

        </AppBar>

    );

}

export default Navbar;