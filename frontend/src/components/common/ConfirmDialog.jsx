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

    confirmText = "Confirm",

    cancelText = "Cancel",

    confirmColor = "primary",

    loading = false,

    onClose,

    onConfirm

}) {

    return (

        <Dialog
            open={open}
            onClose={loading ? undefined : onClose}
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
                    {cancelText}
                </Button>

                <Button
                    variant="contained"
                    color={confirmColor}
                    onClick={onConfirm}
                    disabled={loading}
                >
                    {loading ? "Please Wait..." : confirmText}
                </Button>

            </DialogActions>

        </Dialog>

    );

}

export default ConfirmDialog;