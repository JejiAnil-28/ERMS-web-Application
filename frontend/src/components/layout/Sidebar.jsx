import {
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupsIcon from "@mui/icons-material/Groups";
import BusinessIcon from "@mui/icons-material/Business";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EventNoteIcon from "@mui/icons-material/EventNote";
import LogoutIcon from "@mui/icons-material/Logout";

import { Link } from "react-router-dom";

const drawerWidth = 240;

const menuItems = [
    {
        text: "Dashboard",
        icon: <DashboardIcon />,
        path: "/dashboard"
    },
    {
        text: "Employees",
        icon: <GroupsIcon />,
        path: "/employees"
    },
    {
        text: "Departments",
        icon: <BusinessIcon />,
        path: "/departments"
    },
    {
        text: "Attendance",
        icon: <AccessTimeIcon />,
        path: "/attendance"
    },
    {
    text: "Leave",
    icon: <EventNoteIcon />,
    path: "/leaves"
}
];

function Sidebar() {

    return (

        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: drawerWidth,
                    boxSizing: "border-box"
                }
            }}
        >

            <Toolbar />

            <List>

                {menuItems.map((item) => (

                    <ListItemButton
                        key={item.text}
                        component={Link}
                        to={item.path}
                    >

                        <ListItemIcon>
                            {item.icon}
                        </ListItemIcon>

                        <ListItemText
                            primary={item.text}
                        />

                    </ListItemButton>

                ))}

                <ListItemButton>

                    <ListItemIcon>

                        <LogoutIcon />

                    </ListItemIcon>

                    <ListItemText
                        primary="Logout"
                    />

                </ListItemButton>

            </List>

        </Drawer>

    );

}

export default Sidebar;