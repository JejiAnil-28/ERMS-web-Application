import { useEffect } from "react";
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

import { useForm, Controller } from "react-hook-form";

const leaveTypes = [
    "CASUAL",
    "SICK",
    "EARNED",
    "MATERNITY",
    "PATERNITY"
];

function LeaveDialog({

    open,

    onClose,

    onSubmit,

    loading

}) {

    const {

        control,

        handleSubmit,

        reset

    } = useForm({

        defaultValues: {

            employeeId: 2, // Temporary (JWT later)

            leaveType: "",

            startDate: "",

            endDate: "",

            reason: ""

        }

    });

    useEffect(() => {

        if (!open) {

            reset();

        }

    }, [open, reset]);

    return (

        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
        >

            <DialogTitle>
                Apply Leave
            </DialogTitle>

            <DialogContent>

                <Grid
                    container
                    spacing={2}
                    mt={1}
                >

                    {/* Leave Type */}

                    <Grid size={{ xs: 12 }}>

                        <Controller
                            name="leaveType"
                            control={control}
                            rules={{
                                required: "Leave type is required"
                            }}
                            render={({ field, fieldState }) => (

                                <TextField
                                    {...field}
                                    select
                                    label="Leave Type"
                                    fullWidth
                                    error={!!fieldState.error}
                                    helperText={fieldState.error?.message}
                                >

                                    {leaveTypes.map((type) => (

                                        <MenuItem
                                            key={type}
                                            value={type}
                                        >

                                            {type}

                                        </MenuItem>

                                    ))}

                                </TextField>

                            )}
                        />

                    </Grid>

                    {/* Start Date */}

                    <Grid size={{ xs: 6 }}>

                        <Controller
                            name="startDate"
                            control={control}
                            rules={{
                                required: "Start date is required"
                            }}
                            render={({ field, fieldState }) => (

                                <TextField
                                    {...field}
                                    type="date"
                                    label="Start Date"
                                    fullWidth
                                    slotProps={{
                                        inputLabel: {
                                            shrink: true
                                        }
                                    }}
                                    inputProps={{
                                        min: new Date().toISOString().split("T")[0]
                                    }}
                                    error={!!fieldState.error}
                                    helperText={fieldState.error?.message}
                                />

                            )}
                        />

                    </Grid>

                    {/* End Date */}

                    <Grid size={{ xs: 6 }}>

                        <Controller
                            name="endDate"
                            control={control}
                            rules={{
                                required: "End date is required"
                            }}
                            render={({ field, fieldState }) => (

                                <TextField
                                    {...field}
                                    type="date"
                                    label="End Date"
                                    fullWidth
                                    slotProps={{
                                        inputLabel: {
                                            shrink: true
                                        }
                                    }}
                                    error={!!fieldState.error}
                                    helperText={fieldState.error?.message}
                                />

                            )}
                        />

                    </Grid>

                    {/* Reason */}

                    <Grid size={{ xs: 12 }}>

                        <Controller
                            name="reason"
                            control={control}
                            rules={{
                                required: "Reason is required",
                                minLength: {
                                    value: 10,
                                    message: "Reason should be at least 10 characters"
                                }
                            }}
                            render={({ field, fieldState }) => (

                                <TextField
                                    {...field}
                                    label="Reason"
                                    multiline
                                    rows={3}
                                    fullWidth
                                    error={!!fieldState.error}
                                    helperText={fieldState.error?.message}
                                />

                            )}
                        />

                    </Grid>

                </Grid>

            </DialogContent>

            <DialogActions>

                <Button
                    onClick={onClose}
                >
                    Cancel
                </Button>

                <Button
                    variant="contained"
                    onClick={handleSubmit(onSubmit)}
                    disabled={loading}
                >
                    Apply
                </Button>

            </DialogActions>

        </Dialog>

    );

}

export default LeaveDialog;