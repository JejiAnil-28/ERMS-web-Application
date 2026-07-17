import { useEffect, useState } from "react";

import {
    Grid,
    Card,
    CardContent,
    Typography,
    CircularProgress,
    Box
} from "@mui/material";

import GroupsIcon from "@mui/icons-material/Groups";
import BusinessIcon from "@mui/icons-material/Business";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EventNoteIcon from "@mui/icons-material/EventNote";

import { getDashboardSummary } from "../../services/dashboardService";

function Dashboard() {

    const [dashboard, setDashboard] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function loadDashboard() {

            try {

                const response =
                    await getDashboardSummary();

                setDashboard(response.data.data);

            } catch (error) {

                console.error(error);

            } finally {

                setLoading(false);

            }

        }

        loadDashboard();

    }, []);

    if (loading) {

        return (
            <Box
                display="flex"
                justifyContent="center"
                mt={5}
            >
                <CircularProgress />
            </Box>
        );

    }

    const cards = [

        {
            title: "Employees",
            value: dashboard.totalEmployees,
            icon: <GroupsIcon fontSize="large" />
        },

        {
            title: "Departments",
            value: dashboard.totalDepartments,
            icon: <BusinessIcon fontSize="large" />
        },

        {
            title: "Today's Attendance",
            value: dashboard.todayAttendance,
            icon: <AccessTimeIcon fontSize="large" />
        },

        {
            title: "Pending Leaves",
            value: dashboard.pendingLeaves,
            icon: <EventNoteIcon fontSize="large" />
        }

    ];

    return (

        <>

            <Typography
                variant="h4"
                mb={4}
            >
                Dashboard
            </Typography>

            <Grid container spacing={3}>

                {cards.map((card) => (

                    <Grid
                        item
                        xs={12}
                        sm={6}
                        md={3}
                        key={card.title}
                    >

                        <Card elevation={4}>

                            <CardContent>

                                {card.icon}

                                <Typography
                                    variant="h6"
                                    mt={2}
                                >
                                    {card.title}
                                </Typography>

                                <Typography
                                    variant="h4"
                                >
                                    {card.value}
                                </Typography>

                            </CardContent>

                        </Card>

                    </Grid>

                ))}

            </Grid>

        </>

    );

}

export default Dashboard;