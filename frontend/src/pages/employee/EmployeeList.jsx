import { useEffect, useState } from "react";

import { Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { toast } from "react-toastify";

import PageHeader from "../../components/common/PageHeader";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import EmployeeTable from "../../components/employee/EmployeeTable";


import EmployeeDialog from "../../components/employee/EmployeeDialog";

import {
    getEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee
} from "../../services/employeeService";

function EmployeeList() {

    const [employees, setEmployees] = useState([]);

    const [loading, setLoading] = useState(false);

    const [openDialog, setOpenDialog] = useState(false);

    const [selectedEmployee, setSelectedEmployee] = useState(null);

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    const [employeeToDelete, setEmployeeToDelete] = useState(null);
    const [dialogLoading, setDialogLoading] = useState(false);

    useEffect(() => {

        loadEmployees();

    }, []);

    async function loadEmployees() {

        try {

            setLoading(true);

            const response = await getEmployees();

            setEmployees(response.data.data);

        } catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Failed to load employees"

            );

        } finally {

            setLoading(false);

        }

    }

    async function handleDeleteEmployee() {

        try {

            await deleteEmployee(employeeToDelete.id);

            toast.success("Employee deleted successfully");

            await loadEmployees();

            setDeleteDialogOpen(false);

            setEmployeeToDelete(null);

        } catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Failed to delete employee"

            );

        }
    }

    async function handleSaveEmployee(employeeData) {

    try {

        setDialogLoading(true);

        if (selectedEmployee) {

            await updateEmployee(
                selectedEmployee.id,
                employeeData
            );

            toast.success(
                "Employee updated successfully"
            );

        } else {

            await createEmployee(employeeData);

            toast.success(
                "Employee created successfully"
            );

        }

        setOpenDialog(false);

        setSelectedEmployee(null);

        await loadEmployees();

    } catch (error) {

        toast.error(

            error.response?.data?.message ||

            "Failed to save employee"

        );

    } finally {

        setDialogLoading(false);

    }

}

    return (

        <Box>

            <PageHeader
                title="Employees"
                buttonText="Add Employee"
                buttonIcon={<AddIcon />}
                onButtonClick={() => {

                    setSelectedEmployee(null);

                    setOpenDialog(true);

                }}
            />

            <EmployeeTable
                employees={employees}
                loading={loading}
                onEdit={(employee) => {

                    setSelectedEmployee(employee);

                    setOpenDialog(true);

                }}
                onDelete={(employee) => {

                    setEmployeeToDelete(employee);

                    setDeleteDialogOpen(true);

                }}
            />

            <EmployeeDialog
    open={openDialog}
    employee={selectedEmployee}
    loading={dialogLoading}
    onClose={() => {

        setOpenDialog(false);

        setSelectedEmployee(null);

    }}
    onSubmit={handleSaveEmployee}
/>

            <ConfirmDialog
                open={deleteDialogOpen}
                title="Delete Employee"
                message={`Are you sure you want to delete "${employeeToDelete?.firstName} ${employeeToDelete?.lastName}"?`}
                confirmText="Delete"
                confirmColor="error"
                onClose={() => {

                    setDeleteDialogOpen(false);

                    setEmployeeToDelete(null);

                }}
                onConfirm={handleDeleteEmployee}
            />

        </Box>

    );

}

export default EmployeeList;