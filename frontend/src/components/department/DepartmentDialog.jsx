import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField
} from "@mui/material";

import { useState, useEffect } from "react";

function DepartmentDialog({

    open,
    onClose,
    onSave,
    department

}) {

    const [formData, setFormData] = useState({

        departmentName: "",
        departmentHead: "",
        description: ""

    });

    useEffect(() => {

        if (department) {

            setFormData(department);

        } else {

            setFormData({

                departmentName: "",
                departmentHead: "",
                description: ""

            });

        }

    }, [department]);

    const handleChange = (e) => {

        setFormData({

            ...formData,
            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = () => {

        onSave(formData);

    };

    return (

        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
        >

            <DialogTitle>

                {department
                    ? "Edit Department"
                    : "Add Department"}

            </DialogTitle>

            <DialogContent>

                <TextField
                    fullWidth
                    margin="normal"
                    label="Department Name"
                    name="departmentName"
                    value={formData.departmentName}
                    onChange={handleChange}
                />

                <TextField
                    fullWidth
                    margin="normal"
                    label="Department Head"
                    name="departmentHead"
                    value={formData.departmentHead}
                    onChange={handleChange}
                />

                <TextField
                    fullWidth
                    margin="normal"
                    label="Description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                />

            </DialogContent>

            <DialogActions>

                <Button onClick={onClose}>

                    Cancel

                </Button>

                <Button
                    variant="contained"
                    onClick={handleSubmit}
                >

                    Save

                </Button>

            </DialogActions>

        </Dialog>

    );

}

export default DepartmentDialog;