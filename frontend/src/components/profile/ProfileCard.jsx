import {
    Avatar,
    Box,
    Card,
    CardContent,
    Chip,
    Divider,
    Stack,
    Typography
} from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";

function ProfileCard({ employee }) {

    if (!employee) {

        return null;

    }
    
    return (

        <Card
            elevation={3}
            sx={{
                borderRadius: 3,
                height: "100%"
            }}
        >

            <CardContent>

                <Box
    sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    }}
>

                    <Avatar
                        sx={{
                            width: 100,
                            height: 100,
                            bgcolor: "primary.main",
                            fontSize: 40
                        }}
                    >

                        <PersonIcon fontSize="large" />

                    </Avatar>

                    <Typography
                        variant="h5"
                        mt={2}
                        fontWeight="bold"
                    >

                        {employee.firstName} {employee.lastName}

                    </Typography>

                    <Typography
                        color="text.secondary"
                    >

                        {employee.employeeCode}

                    </Typography>

                    <Stack
    direction="row"
    spacing={1}
    sx={{ mt: 2 }}
>

                        <Chip
                            label={employee.roleName}
                            color="primary"
                        />

                        <Chip
                            label={employee.departmentName}
                            color="secondary"
                        />

                    </Stack>

                    <Divider
                        sx={{
                            width: "100%",
                            my: 3
                        }}
                    />

                    <Chip

                        label={employee.status}

                        color={
                            employee.status === "ACTIVE"
                                ? "success"
                                : "error"
                        }

                    />

                </Box>

            </CardContent>

        </Card>

    );
    

}

export default ProfileCard;