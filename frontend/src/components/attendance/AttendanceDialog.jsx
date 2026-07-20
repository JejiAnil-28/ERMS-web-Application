import { useState, useEffect } from "react";

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Typography
} from "@mui/material";

function AttendanceDialog({
    open,
    onClose,
    onSubmit,
    type = "CHECK_IN"
}) {

    const [remarks, setRemarks] = useState("");

    useEffect(() => {

        if (open) {
            setRemarks("");
        }

    }, [open]);

    const handleSubmit = () => {

        if (type === "CHECK_IN") {

            onSubmit({
                employeeId: 2, // TODO: Replace with logged-in employee ID
                remarks
            });

        } else {

            onSubmit();

        }

    };

    return (

        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
        >

            <DialogTitle>

                {type === "CHECK_IN"
                    ? "Check In"
                    : "Check Out"}

            </DialogTitle>

            <DialogContent>

                {type === "CHECK_IN" ? (

                    <TextField
                        fullWidth
                        margin="normal"
                        label="Remarks (Optional)"
                        placeholder="Example: Work From Home, Client Visit..."
                        value={remarks}
                        onChange={(e) =>
                            setRemarks(e.target.value)
                        }
                    />

                ) : (

                    <Typography sx={{ mt: 1 }}>
                        Are you sure you want to check out?
                    </Typography>

                )}

            </DialogContent>

            <DialogActions>

                <Button onClick={onClose}>
                    Cancel
                </Button>

                <Button
                    variant="contained"
                    color={type === "CHECK_IN" ? "primary" : "error"}
                    onClick={handleSubmit}
                >
                    {type === "CHECK_IN"
                        ? "Check In"
                        : "Check Out"}
                </Button>

            </DialogActions>

        </Dialog>

    );

}

export default AttendanceDialog;