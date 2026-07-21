import { useState } from "react";
import { useForm, Controller } from "react-hook-form";

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Grid,
    TextField,
    IconButton,
    InputAdornment
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function ChangePasswordDialog({

    open,
    onClose,
    onSave

}) {

    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const {

        control,
        handleSubmit,
        watch,
        reset,
        formState: { errors }

    } = useForm({

        defaultValues: {

            currentPassword: "",
            newPassword: "",
            confirmPassword: ""

        }

    });

    const newPassword = watch("newPassword");

    const submit = (data) => {

        onSave(data);

        reset();

    };

    return (

        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
        >

            <DialogTitle>

                Change Password

            </DialogTitle>

            <DialogContent>

                <Grid
                    container
                    spacing={2}
                    sx={{ mt: 1 }}
                >

                    {/* Current Password */}

                    <Grid size={12}>

                        <Controller
                            name="currentPassword"
                            control={control}
                            rules={{
                                required: "Current Password is required"
                            }}
                            render={({ field }) => (

                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Current Password"
                                    type={
                                        showCurrentPassword
                                            ? "text"
                                            : "password"
                                    }
                                    error={!!errors.currentPassword}
                                    helperText={
                                        errors.currentPassword?.message
                                    }
                                    InputProps={{
                                        endAdornment: (

                                            <InputAdornment position="end">

                                                <IconButton
                                                    onClick={() =>
                                                        setShowCurrentPassword(
                                                            !showCurrentPassword
                                                        )
                                                    }
                                                >

                                                    {showCurrentPassword
                                                        ? <VisibilityOff />
                                                        : <Visibility />}

                                                </IconButton>

                                            </InputAdornment>

                                        )
                                    }}
                                />

                            )}
                        />

                    </Grid>

                    {/* New Password */}

                    <Grid size={12}>

                        <Controller
                            name="newPassword"
                            control={control}
                            rules={{
                                required: "New Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Minimum 6 characters"
                                }
                            }}
                            render={({ field }) => (

                                <TextField
                                    {...field}
                                    fullWidth
                                    label="New Password"
                                    type={
                                        showNewPassword
                                            ? "text"
                                            : "password"
                                    }
                                    error={!!errors.newPassword}
                                    helperText={
                                        errors.newPassword?.message
                                    }
                                    InputProps={{
                                        endAdornment: (

                                            <InputAdornment position="end">

                                                <IconButton
                                                    onClick={() =>
                                                        setShowNewPassword(
                                                            !showNewPassword
                                                        )
                                                    }
                                                >

                                                    {showNewPassword
                                                        ? <VisibilityOff />
                                                        : <Visibility />}

                                                </IconButton>

                                            </InputAdornment>

                                        )
                                    }}
                                />

                            )}
                        />

                    </Grid>

                    {/* Confirm Password */}

                    <Grid size={12}>

                        <Controller
                            name="confirmPassword"
                            control={control}
                            rules={{
                                required: "Confirm Password is required",
                                validate: value =>
                                    value === newPassword ||
                                    "Passwords do not match"
                            }}
                            render={({ field }) => (

                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Confirm Password"
                                    type={
                                        showConfirmPassword
                                            ? "text"
                                            : "password"
                                    }
                                    error={!!errors.confirmPassword}
                                    helperText={
                                        errors.confirmPassword?.message
                                    }
                                    InputProps={{
                                        endAdornment: (

                                            <InputAdornment position="end">

                                                <IconButton
                                                    onClick={() =>
                                                        setShowConfirmPassword(
                                                            !showConfirmPassword
                                                        )
                                                    }
                                                >

                                                    {showConfirmPassword
                                                        ? <VisibilityOff />
                                                        : <Visibility />}

                                                </IconButton>

                                            </InputAdornment>

                                        )
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
                    onClick={handleSubmit(submit)}
                >

                    Update Password

                </Button>

            </DialogActions>

        </Dialog>

    );

}

export default ChangePasswordDialog;