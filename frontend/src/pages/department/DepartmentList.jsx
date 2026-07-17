import { useEffect, useState } from "react";

import { Box } from "@mui/material";
import { toast } from "react-toastify";

import AddIcon from "@mui/icons-material/Add";

import DepartmentDialog from "../../components/department/DepartmentDialog";
import DepartmentTable from "../../components/department/DepartmentTable";

import PageHeader from "../../components/common/PageHeader";
import ConfirmDialog from "../../components/common/ConfirmDialog";

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

    const [selectedDepartment, setSelectedDepartment] = useState(null);

    const [departmentToDelete, setDepartmentToDelete] = useState(null);

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

    async function handleSaveDepartment(department) {

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

            setSelectedDepartment(null);

        } catch (error) {

            console.error(error);

            toast.error(
                error.response?.data?.message ||
                "Operation failed"
            );

        }

    }

    async function handleDeleteDepartment() {

        try {

            await deleteDepartment(
                departmentToDelete.id
            );

            toast.success(
                "Department deleted successfully"
            );

            await loadDepartments();

            setDeleteDialogOpen(false);

            setDepartmentToDelete(null);

        } catch (error) {

            console.error(error);

            toast.error(
                error.response?.data?.message ||
                "Failed to delete department"
            );

        }

    }

    return (

        <Box>

            <PageHeader
                title="Departments"
                buttonText="Add Department"
                buttonIcon={<AddIcon />}
                onButtonClick={() => {

                    setSelectedDepartment(null);

                    setOpenDialog(true);

                }}
            />

            <DepartmentTable
                departments={departments}
                onEdit={(department) => {

                    setSelectedDepartment(department);

                    setOpenDialog(true);

                }}
                onDelete={(department) => {

                    setDepartmentToDelete(department);

                    setDeleteDialogOpen(true);

                }}
            />

            <DepartmentDialog
                open={openDialog}
                department={selectedDepartment}
                onClose={() => {

                    setOpenDialog(false);

                    setSelectedDepartment(null);

                }}
                onSave={handleSaveDepartment}
            />

            <ConfirmDialog
                open={deleteDialogOpen}
                title="Delete Department"
                message={`Are you sure you want to delete "${departmentToDelete?.departmentName}"?`}
                confirmText="Delete"
                confirmColor="error"
                onClose={() => {

                    setDeleteDialogOpen(false);

                    setDepartmentToDelete(null);

                }}
                onConfirm={handleDeleteDepartment}
            />

        </Box>

    );

}

export default DepartmentList;