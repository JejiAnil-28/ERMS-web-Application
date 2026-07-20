import { useEffect, useState } from "react";

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    MenuItem,
    Grid,
    CircularProgress
} from "@mui/material";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";

import * as yup from "yup";

import { getDepartments } from "../../services/departmentService";
import { getRoles } from "../../services/roleService";

const schema = yup.object({

    employeeCode: yup
        .string()
        .required("Employee Code is required"),

    firstName: yup
        .string()
        .required("First Name is required"),

    lastName: yup
        .string()
        .required("Last Name is required"),

    email: yup
        .string()
        .email("Invalid email")
        .required("Email is required"),

    phone: yup
        .string()
        .matches(/^[0-9]{10}$/, "Phone must be 10 digits")
        .required("Phone is required"),

    gender: yup
        .string()
        .required("Gender is required"),

    dateOfBirth: yup
        .string()
        .required("Date of Birth is required"),

    salary: yup
        .number()
        .typeError("Salary is required")
        .positive("Salary must be greater than zero")
        .required("Salary is required"),

    hireDate: yup
        .string()
        .required("Hire Date is required"),

    departmentId: yup
        .number()
        .typeError("Department is required")
        .required("Department is required"),

    roleId: yup
        .number()
        .typeError("Role is required")
        .required("Role is required")

});

function EmployeeDialog({

    open,
    employee,
    loading,
    onClose,
    onSubmit

}) {

    const [departments, setDepartments] = useState([]);
    const [roles, setRoles] = useState([]);



    const {

        control,
        handleSubmit,
        reset,

        formState: {
            errors
        }

    } = useForm({

        resolver: yupResolver(schema),

        defaultValues: {

            employeeCode: "",
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            gender: "",
            dateOfBirth: "",
            salary: "",
            hireDate: "",
            departmentId: "",
            roleId: ""

        }

    });

    useEffect(() => {

        if (open) {

            loadDepartments();
            loadRoles();

        }

    }, [open]);

    useEffect(() => {

        if (employee) {

            reset({

    employeeCode: employee?.employeeCode ?? "",

    firstName: employee?.firstName ?? "",

    lastName: employee?.lastName ?? "",

    email: employee?.email ?? "",

    phone: employee?.phone ?? "",

    gender: employee?.gender ?? "",

    salary: employee?.salary ?? "",

    hireDate: employee?.hireDate ?? "",

    dateOfBirth: employee?.dateOfBirth ?? "",

    departmentId: employee?.departmentId ?? "",

    roleId: employee?.roleId ?? ""

});

        } else {

            reset();

        }

    }, [employee, reset]);

    async function loadDepartments() {

        try {

            const response = await getDepartments();

            setDepartments(response.data.data);

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to load departments"
            );

        }

    }

    async function loadRoles() {

        try {

            const response = await getRoles();

            setRoles(response.data.data);

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to load roles"
            );

        }

    }

    // async function handleFormSubmit(data) {

    //     try {

    //         setLoading(true);

    //         await onSubmit(data);

    //     } finally {

    //         setLoading(false);

    //     }

    // }
        return (

        <Dialog
            open={open}
            onClose={loading ? undefined : onClose}
            maxWidth="md"
            fullWidth
        >

            <DialogTitle>
                {employee ? "Edit Employee" : "Add Employee"}
            </DialogTitle>

            <DialogContent sx={{ mt: 2 }}>

                <Grid
                    container
                    spacing={2}
                >

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Controller
                            name="employeeCode"
                            control={control}
                            render={({ field }) => (
                                <TextField
    {...field}
    value={field.value ?? ""}
                                    fullWidth
                                    label="Employee Code"
                                    error={!!errors.employeeCode}
                                    helperText={errors.employeeCode?.message}
                                />
                            )}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Controller
                            name="firstName"
                            control={control}
                            render={({ field }) => (
                                <TextField
    {...field}
    value={field.value ?? ""}
                                    fullWidth
                                    label="First Name"
                                    error={!!errors.firstName}
                                    helperText={errors.firstName?.message}
                                />
                            )}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Controller
                            name="lastName"
                            control={control}
                            render={({ field }) => (
                                <TextField
    {...field}
    value={field.value ?? ""}
                                    fullWidth
                                    label="Last Name"
                                    error={!!errors.lastName}
                                    helperText={errors.lastName?.message}
                                />
                            )}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Controller
                            name="email"
                            control={control}
                            render={({ field }) => (
                                <TextField
    {...field}
    value={field.value ?? ""}
                                    fullWidth
                                    label="Email"
                                    error={!!errors.email}
                                    helperText={errors.email?.message}
                                />
                            )}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Controller
                            name="phone"
                            control={control}
                            render={({ field }) => (
                                <TextField
    {...field}
    value={field.value ?? ""}
                                    fullWidth
                                    label="Phone"
                                    error={!!errors.phone}
                                    helperText={errors.phone?.message}
                                />
                            )}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Controller
                            name="gender"
                            control={control}
                            render={({ field }) => (
                                <TextField
    {...field}
    value={field.value ?? ""}
                                    select
                                    fullWidth
                                    label="Gender"
                                    error={!!errors.gender}
                                    helperText={errors.gender?.message}
                                >
                                    <MenuItem value="Male">Male</MenuItem>
                                    <MenuItem value="Female">Female</MenuItem>
                                </TextField>
                            )}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Controller
                            name="departmentId"
                            control={control}
                            render={({ field }) => (
                                <TextField
    {...field}
    value={field.value ?? ""}
                                    select
                                    fullWidth
                                    label="Department"
                                    error={!!errors.departmentId}
                                    helperText={errors.departmentId?.message}
                                >
                                    {departments.map((department) => (
                                        <MenuItem
                                            key={department.id}
                                            value={department.id}
                                        >
                                            {department.departmentName}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            )}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Controller
                            name="roleId"
                            control={control}
                            render={({ field }) => (
                                <TextField
    {...field}
    value={field.value ?? ""}
                                    select
                                    fullWidth
                                    label="Role"
                                    error={!!errors.roleId}
                                    helperText={errors.roleId?.message}
                                >
                                    {roles.map((role) => (
                                        <MenuItem
                                            key={role.id}
                                            value={role.id}
                                        >
                                            {role.roleName}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            )}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Controller
                            name="salary"
                            control={control}
                            render={({ field }) => (
                                <TextField
    {...field}
    value={field.value ?? ""}
                                    type="number"
                                    fullWidth
                                    label="Salary"
                                    error={!!errors.salary}
                                    helperText={errors.salary?.message}
                                />
                            )}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Controller
                            name="hireDate"
                            control={control}
                            render={({ field }) => (
                                <TextField
    {...field}
    value={field.value ?? ""}
                                    type="date"
                                    fullWidth
                                    slotProps={{
                                        inputLabel: {
                                            shrink: true
                                        }
                                    }}
                                    label="Hire Date"
                                    error={!!errors.hireDate}
                                    helperText={errors.hireDate?.message}
                                />
                            )}
                        />
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                        <Controller
                            name="dateOfBirth"
                            control={control}
                            render={({ field }) => (
                                <TextField
    {...field}
    value={field.value ?? ""}
                                    type="date"
                                    fullWidth
                                    slotProps={{
                                        inputLabel: {
                                            shrink: true
                                        }
                                    }}
                                    label="Date of Birth"
                                    error={!!errors.dateOfBirth}
                                    helperText={errors.dateOfBirth?.message}
                                />
                            )}
                        />
                    </Grid>

                </Grid>

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
    onClick={handleSubmit(onSubmit)}
    disabled={loading}
    startIcon={
        loading
            ? <CircularProgress
                size={18}
                color="inherit"
            />
            : null
    }
>
    {loading
        ? "Saving..."
        : employee
            ? "Update Employee"
            : "Add Employee"}
</Button>

            </DialogActions>

        </Dialog>

    );

}

export default EmployeeDialog;