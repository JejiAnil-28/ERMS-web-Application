import {
    Box,
    Button,
    TextField
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import RefreshIcon from "@mui/icons-material/Refresh";

function PayrollToolbar({

    search,
    setSearch,

    onRefresh,

    onCreate

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

                value={search}

                onChange={(e) =>

                    setSearch(e.target.value)

                }

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

                    startIcon={<AddIcon />}

                    onClick={onCreate}

                >

                    Generate Payroll

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

export default PayrollToolbar;