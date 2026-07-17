import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button
} from "@mui/material";

function ConfirmDialog({
    open,
    title,
    message,
    confirmText = "Delete",
    confirmColor = "error",
    loading = false,
    onClose,
    onConfirm
}) {

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="xs"
        >

            <DialogTitle>
                {title}
            </DialogTitle>

            <DialogContent>

                <DialogContentText>

                    {message}

                </DialogContentText>

            </DialogContent>

            <DialogActions>

                <Button
                    onClick={onClose}
                    disabled={loading}
                >
                    Cancel
                </Button>

                <Button
                    variant="contained"
                    color={confirmColor}
                    onClick={onConfirm}
                    disabled={loading}
                >
                    {loading ? "Please wait..." : confirmText}
                </Button>

            </DialogActions>

        </Dialog>
    );

}

export default ConfirmDialog;