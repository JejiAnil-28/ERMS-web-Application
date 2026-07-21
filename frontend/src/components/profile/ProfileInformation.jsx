import {
    Card,
    CardContent,
    Typography,
    Grid,
    Divider,
    Button,
    Stack
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import LockResetIcon from "@mui/icons-material/LockReset";

function ProfileInformation({

    employee,

    onEdit,

    onChangePassword

}) {

    if (!employee) {

        return null;

    }

    const information = [

        {
            label: "Employee Code",
            value: employee.employeeCode
        },

        {
            label: "Full Name",
            value: `${employee.firstName} ${employee.lastName}`
        },

        {
            label: "Email",
            value: employee.email
        },

        {
            label: "Phone",
            value: employee.phone
        },

        {
            label: "Gender",
            value: employee.gender
        },

        {
            label: "Department",
            value: employee.departmentName
        },

        {
            label: "Role",
            value: employee.roleName
        },

        {
            label: "Hire Date",
            value: employee.hireDate
        },

        {
            label: "Status",
            value: employee.status
        }

    ];

    return (

        <Card
            elevation={3}
            sx={{
                borderRadius: 3,
                height: "100%"
            }}
        >

            <CardContent>

                <Typography
                    variant="h6"
                    fontWeight="bold"
                >

                    Employee Information

                </Typography>

                <Divider sx={{ my: 2 }} />

                <Grid
                    container
                    spacing={2}
                >

                    {information.map((item) => (

                        <Grid
                            key={item.label}
                            size={{ xs: 12, md: 6 }}
                        >

                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >

                                {item.label}

                            </Typography>

                            <Typography
                                variant="subtitle1"
                                fontWeight={600}
                            >

                                {item.value || "--"}

                            </Typography>

                        </Grid>

                    ))}

                </Grid>

                <Divider sx={{ my: 3 }} />

                <Stack
                    direction="row"
                    spacing={2}
                >

                    <Button
                        variant="contained"
                        startIcon={<EditIcon />}
                        onClick={onEdit}
                    >

                        Edit Profile

                    </Button>

                    <Button
                        variant="outlined"
                        color="warning"
                        startIcon={<LockResetIcon />}
                        onClick={onChangePassword}
                    >

                        Change Password

                    </Button>

                </Stack>

            </CardContent>

        </Card>

    );

}

export default ProfileInformation;