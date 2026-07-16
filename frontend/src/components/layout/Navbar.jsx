import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    IconButton,
    Avatar
} from "@mui/material";

import NotificationsIcon
from "@mui/icons-material/Notifications";

function Navbar() {

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

                <Avatar
                    sx={{
                        ml: 2
                    }}
                >

                    A

                </Avatar>

            </Toolbar>

        </AppBar>

    );

}

export default Navbar;