import { Box, Toolbar } from "@mui/material";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function MainLayout({ children }) {

    return (

        <Box
            sx={{
                display: "flex"
            }}
        >

            <Navbar />

            <Sidebar />

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3
                }}
            >

                <Toolbar />

                {children}

            </Box>

        </Box>

    );

}

export default MainLayout;