import {
    Grid,
    Paper,
    Typography,
    Box
} from "@mui/material";

import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import CancelIcon from "@mui/icons-material/Cancel";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EventBusyIcon from "@mui/icons-material/EventBusy";

function AttendanceStatistics({ attendance }) {

    const present = attendance.filter(
        (item) => item.status === "PRESENT"
    ).length;

    const absent = attendance.filter(
        (item) => item.status === "ABSENT"
    ).length;

    const late = attendance.filter(
        (item) => item.status === "LATE"
    ).length;

    const leave = attendance.filter(
        (item) => item.status === "LEAVE"
    ).length;

    const cards = [

        {
            title: "Present",
            value: present,
            color: "#2e7d32",
            icon: <PeopleAltIcon fontSize="large" />
        },

        {
            title: "Absent",
            value: absent,
            color: "#d32f2f",
            icon: <CancelIcon fontSize="large" />
        },

        {
            title: "Late",
            value: late,
            color: "#ed6c02",
            icon: <AccessTimeIcon fontSize="large" />
        },

        {
            title: "Leave",
            value: leave,
            color: "#0288d1",
            icon: <EventBusyIcon fontSize="large" />
        }

    ];

    return (

        <Grid
            container
            spacing={3}
            mb={3}
        >

            {cards.map((card) => (

                <Grid
                    size={{ xs: 12, sm: 6, md: 3 }}
                    key={card.title}
                >

                    <Paper
                        elevation={3}
                        sx={{
                            p: 3,
                            borderRadius: 2,
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center"
                        }}
                    >

                        <Box>

                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                {card.title}
                            </Typography>

                            <Typography
                                variant="h4"
                                fontWeight="bold"
                            >
                                {card.value}
                            </Typography>

                        </Box>

                        <Box
                            sx={{
                                color: card.color
                            }}
                        >
                            {card.icon}
                        </Box>

                    </Paper>

                </Grid>

            ))}

        </Grid>

    );

}

export default AttendanceStatistics;