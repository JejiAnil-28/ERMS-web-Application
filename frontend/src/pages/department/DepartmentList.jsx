import { useEffect, useState } from "react";

import {
    Box,
    Typography,
    Button,
    IconButton
} from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";
import { toast } from "react-toastify";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import DepartmentDialog from "../../components/department/DepartmentDialog";
import DeleteDepartmentDialog from "../../components/department/DeleteDepartmentDialog";

import {
    getDepartments,
    createDepartment,
    updateDepartment,
    deleteDepartment
} from "../../services/departmentService";

function DepartmentList() {

    const [departments, setDepartments] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    const [departmentToDelete, setDepartmentToDelete] = useState(null);
    const [selectedDepartment, setSelectedDepartment] = useState(null);

    useEffect(() => {
        loadDepartments();
    }, []);

    async function loadDepartments() {

        try {

            const response = await getDepartments();

            setDepartments(response.data.data);

        } catch (error) {

            console.error(error);

            toast.error(
                error.response?.data?.message ||
                "Failed to load departments"
            );

        }

    }

    const columns = [

        {
            field: "id",
            headerName: "ID",
            width: 90
        },

        {
            field: "departmentName",
            headerName: "Department",
            flex: 1
        },

        {
            field: "departmentHead",
            headerName: "Department Head",
            flex: 1
        },

        {
            field: "description",
            headerName: "Description",
            flex: 2
        },

        {
            field: "actions",
            headerName: "Actions",
            width: 150,
            sortable: false,

            renderCell: (params) => (
                <>
                    <IconButton
                        color="primary"
                        onClick={() => {
                            setSelectedDepartment(params.row);
                            setOpenDialog(true);
                        }}
                    >
                        <EditIcon />
                    </IconButton>

                    <IconButton
                        color="error"
                        onClick={() => {
                            setDepartmentToDelete(params.row);
                            setDeleteDialogOpen(true);
                        }}
                    >
                        <DeleteIcon />
                    </IconButton>
                </>
            )
        }

    ];

    return (

        <Box>

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 3
                }}
            >

                <Typography variant="h4">
                    Departments
                </Typography>

                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => {
                        setSelectedDepartment(null);
                        setOpenDialog(true);
                    }}
                >
                    Add Department
                </Button>

            </Box>

            <DataGrid
                rows={departments}
                columns={columns}
                autoHeight
                pageSizeOptions={[5, 10]}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5
                        }
                    }
                }}
            />

            <DepartmentDialog
                open={openDialog}
                department={selectedDepartment}
                onClose={() => setOpenDialog(false)}
                onSave={async (department) => {

                    try {

                        if (selectedDepartment) {

                            await updateDepartment(
                                selectedDepartment.id,
                                department
                            );

                            toast.success(
                                "Department updated successfully"
                            );

                        } else {

                            await createDepartment(
                                department
                            );

                            toast.success(
                                "Department created successfully"
                            );

                        }

                        await loadDepartments();

                        setOpenDialog(false);

                    } catch (error) {

                        console.error(error);

                        toast.error(
                            error.response?.data?.message ||
                            "Operation failed"
                        );

                    }

                }}
            />

            <DeleteDepartmentDialog
                open={deleteDialogOpen}
                department={departmentToDelete}
                onClose={() => setDeleteDialogOpen(false)}
                onConfirm={async () => {

                    try {

                        await deleteDepartment(
                            departmentToDelete.id
                        );

                        toast.success(
                            "Department deleted successfully"
                        );

                        await loadDepartments();

                        setDeleteDialogOpen(false);

                    } catch (error) {

                        console.error(error);

                        toast.error(
                            error.response?.data?.message ||
                            "Operation failed"
                        );

                    }

                }}
            />

        </Box>

    );

}

export default DepartmentList;