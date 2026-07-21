import {
    Box,
    Button,
    TextField
} from "@mui/material";

import RefreshIcon from "@mui/icons-material/Refresh";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";

function AttendanceToolbar({

    search,
    setSearch,
    onRefresh,
    onOpenCheckIn,
    onOpenCheckOut,

    checkedIn,
    checkedOut,

    checkInLoading,
    checkOutLoading

}) {

    return (

        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 2,
                mb: 3,
                flexWrap: "wrap"
            }}
        >

            <TextField
                size="small"
                label="Search Employee"
                placeholder="Search by code or name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <Box
                sx={{
                    display: "flex",
                    gap: 2,
                    flexWrap: "wrap"
                }}
            >

                <Button
                    variant="contained"
                    startIcon={<LoginIcon />}
                    onClick={onOpenCheckIn}
                    disabled={checkedIn || checkInLoading}
                >
                    {checkInLoading ? "Checking In..." : "Check In"}
                </Button>

                <Button
                    variant="outlined"
                    color="error"
                    startIcon={<LogoutIcon />}
                    onClick={onOpenCheckOut}
                    disabled={!checkedIn || checkedOut || checkOutLoading}
                >
                    {checkOutLoading ? "Checking Out..." : "Check Out"}
                </Button>

                <Button
                    variant="outlined"
                    startIcon={<RefreshIcon />}
                    onClick={onRefresh}
                >
                    Refresh
                </Button>

            </Box>

        </Box>

    );

}

export default AttendanceToolbar;