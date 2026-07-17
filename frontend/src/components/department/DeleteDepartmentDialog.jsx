import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button
} from "@mui/material";

function DeleteDepartmentDialog({
    open,
    department,
    onClose,
    onConfirm
}) {

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="xs"
            fullWidth
        >

            <DialogTitle>
                Delete Department
            </DialogTitle>

            <DialogContent>

                <DialogContentText>

                    Are you sure you want to delete
                    <strong> {department?.departmentName}</strong>?

                </DialogContentText>

            </DialogContent>

            <DialogActions>

                <Button onClick={onClose}>
                    Cancel
                </Button>

                <Button
                    color="error"
                    variant="contained"
                    onClick={onConfirm}
                >
                    Delete
                </Button>

            </DialogActions>

        </Dialog>
    );

}

export default DeleteDepartmentDialog;