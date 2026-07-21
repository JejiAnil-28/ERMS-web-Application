import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Grid,
    TextField,
    MenuItem
} from "@mui/material";

function EditProfileDialog({

    open,
    employee,
    onClose,
    onSave

}) {

    const {

        control,
        handleSubmit,
        reset,
        formState: { errors }

    } = useForm({

        defaultValues: {

            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            gender: "",
            dateOfBirth: ""

        }

    });

    useEffect(() => {

        if (employee) {

            reset({

                firstName: employee.firstName,
                lastName: employee.lastName,
                email: employee.email,
                phone: employee.phone,
                gender: employee.gender,
                dateOfBirth: employee.dateOfBirth

            });

        }

    }, [employee, reset]);

    return (

        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="md"
        >

            <DialogTitle>

                Edit Profile

            </DialogTitle>

            <DialogContent>

                <Grid
                    container
                    spacing={2}
                    sx={{ mt: 1 }}
                >

                    <Grid size={{ xs: 12, md: 6 }}>

                        <Controller
                            name="firstName"
                            control={control}
                            rules={{
                                required: "First Name is required"
                            }}
                            render={({ field }) => (

                                <TextField
                                    {...field}
                                    fullWidth
                                    label="First Name"
                                    error={!!errors.firstName}
                                    helperText={errors.firstName?.message}
                                />

                            )}
                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <Controller
                            name="lastName"
                            control={control}
                            rules={{
                                required: "Last Name is required"
                            }}
                            render={({ field }) => (

                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Last Name"
                                    error={!!errors.lastName}
                                    helperText={errors.lastName?.message}
                                />

                            )}
                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <Controller
                            name="email"
                            control={control}
                            rules={{
                                required: "Email is required"
                            }}
                            render={({ field }) => (

                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Email"
                                    type="email"
                                    error={!!errors.email}
                                    helperText={errors.email?.message}
                                />

                            )}
                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <Controller
                            name="phone"
                            control={control}
                            rules={{
                                required: "Phone Number is required"
                            }}
                            render={({ field }) => (

                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Phone Number"
                                    error={!!errors.phone}
                                    helperText={errors.phone?.message}
                                />

                            )}
                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <Controller
                            name="gender"
                            control={control}
                            render={({ field }) => (

                                <TextField
                                    {...field}
                                    select
                                    fullWidth
                                    label="Gender"
                                >

                                    <MenuItem value="Male">Male</MenuItem>

                                    <MenuItem value="Female">Female</MenuItem>

                                    <MenuItem value="Other">Other</MenuItem>

                                </TextField>

                            )}
                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <Controller
                            name="dateOfBirth"
                            control={control}
                            render={({ field }) => (

                                <TextField
                                    {...field}
                                    fullWidth
                                    type="date"
                                    label="Date of Birth"
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                />

                            )}
                        />

                    </Grid>

                </Grid>

            </DialogContent>

            <DialogActions>

                <Button onClick={onClose}>

                    Cancel

                </Button>

                <Button
                    variant="contained"
                    onClick={handleSubmit(onSave)}
                >

                    Save Changes

                </Button>

            </DialogActions>

        </Dialog>

    );

}

export default EditProfileDialog;