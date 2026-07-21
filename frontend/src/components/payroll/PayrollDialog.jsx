import { useEffect, useMemo } from "react";
import { useForm, Controller } from "react-hook-form";

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Grid,
    TextField,
    MenuItem,
    Typography
} from "@mui/material";

function PayrollDialog({

    open,
    onClose,
    onSubmit,

    payroll,

    employees

}) {

    const {

        control,

        handleSubmit,

        reset,

        watch,

        formState: { errors }

    } = useForm({

        defaultValues: {

            employeeId: "",

            basicSalary: "",

            allowances: 0,

            deductions: 0,

            bonus: 0,

            payMonth: new Date().getMonth() + 1,

            payYear: new Date().getFullYear(),

            paymentDate: "",

            remarks: ""

        }

    });

    useEffect(() => {

        if (payroll) {

            reset(payroll);

        } else {

            reset({

                employeeId: "",

                basicSalary: "",

                allowances: 0,

                deductions: 0,

                bonus: 0,

                payMonth: new Date().getMonth() + 1,

                payYear: new Date().getFullYear(),

                paymentDate: "",

                remarks: ""

            });

        }

    }, [payroll, reset]);

    const basicSalary = Number(watch("basicSalary")) || 0;

    const allowances = Number(watch("allowances")) || 0;

    const deductions = Number(watch("deductions")) || 0;

    const bonus = Number(watch("bonus")) || 0;

    const netSalary = useMemo(() => {

        return (

            basicSalary +
            allowances +
            bonus -
            deductions

        );

    }, [

        basicSalary,

        allowances,

        deductions,

        bonus

    ]);

    return (

        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="md"
        >

            <DialogTitle>

                {payroll
                    ? "Update Payroll"
                    : "Generate Payroll"}

            </DialogTitle>

            <DialogContent>

                <Grid
                    container
                    spacing={2}
                    sx={{ mt: 1 }}
                >

                    {/* Employee */}

                    <Grid size={{ xs: 12, md: 6 }}>

                        <Controller
                            name="employeeId"
                            control={control}
                            rules={{
                                required: "Employee is required"
                            }}
                            render={({ field }) => (

                                <TextField
                                    {...field}
                                    select
                                    fullWidth
                                    label="Employee"
                                    error={!!errors.employeeId}
                                    helperText={errors.employeeId?.message}
                                >

                                    {employees.map((employee) => (

                                        <MenuItem
                                            key={employee.id}
                                            value={employee.id}
                                        >

                                            {employee.employeeCode}
                                            {" - "}
                                            {employee.firstName}
                                            {" "}
                                            {employee.lastName}

                                        </MenuItem>

                                    ))}

                                </TextField>

                            )}
                        />

                    </Grid>

                    {/* Basic Salary */}

                    <Grid size={{ xs: 12, md: 6 }}>

                        <Controller
                            name="basicSalary"
                            control={control}
                            rules={{
                                required: "Basic Salary is required"
                            }}
                            render={({ field }) => (

                                <TextField
                                    {...field}
                                    fullWidth
                                    type="number"
                                    label="Basic Salary"
                                    error={!!errors.basicSalary}
                                    helperText={errors.basicSalary?.message}
                                />

                            )}
                        />

                    </Grid>

                    {/* Allowances */}

                    <Grid size={{ xs: 12, md: 6 }}>

                        <Controller
                            name="allowances"
                            control={control}
                            render={({ field }) => (

                                <TextField
                                    {...field}
                                    fullWidth
                                    type="number"
                                    label="Allowances"
                                />

                            )}
                        />

                    </Grid>

                    {/* Bonus */}

                    <Grid size={{ xs: 12, md: 6 }}>

                        <Controller
                            name="bonus"
                            control={control}
                            render={({ field }) => (

                                <TextField
                                    {...field}
                                    fullWidth
                                    type="number"
                                    label="Bonus"
                                />

                            )}
                        />

                    </Grid>

                    {/* Deductions */}

                    <Grid size={{ xs: 12, md: 6 }}>

                        <Controller
                            name="deductions"
                            control={control}
                            render={({ field }) => (

                                <TextField
                                    {...field}
                                    fullWidth
                                    type="number"
                                    label="Deductions"
                                />

                            )}
                        />

                    </Grid>

                    {/* Payment Date */}

                    <Grid size={{ xs: 12, md: 6 }}>

                        <Controller
                            name="paymentDate"
                            control={control}
                            rules={{
                                required: "Payment Date is required"
                            }}
                            render={({ field }) => (

                                <TextField
                                    {...field}
                                    fullWidth
                                    type="date"
                                    label="Payment Date"
                                    slotProps={{
                                        inputLabel: {
                                            shrink: true
                                        }
                                    }}
                                    error={!!errors.paymentDate}
                                    helperText={errors.paymentDate?.message}
                                />

                            )}
                        />

                    </Grid>

                    {/* Pay Month */}

                    <Grid size={{ xs: 12, md: 6 }}>

                        <Controller
                            name="payMonth"
                            control={control}
                            render={({ field }) => (

                                <TextField
                                    {...field}
                                    fullWidth
                                    type="number"
                                    label="Pay Month"
                                />

                            )}
                        />

                    </Grid>

                    {/* Pay Year */}

                    <Grid size={{ xs: 12, md: 6 }}>

                        <Controller
                            name="payYear"
                            control={control}
                            render={({ field }) => (

                                <TextField
                                    {...field}
                                    fullWidth
                                    type="number"
                                    label="Pay Year"
                                />

                            )}
                        />

                    </Grid>

                    {/* Remarks */}

                    <Grid size={12}>

                        <Controller
                            name="remarks"
                            control={control}
                            render={({ field }) => (

                                <TextField
                                    {...field}
                                    fullWidth
                                    multiline
                                    rows={3}
                                    label="Remarks"
                                />

                            )}
                        />

                    </Grid>

                    {/* Net Salary Preview */}

                    <Grid size={12}>

                        <Typography
                            variant="h6"
                            sx={{
                                mt: 2,
                                fontWeight: 600,
                                color: "success.main"
                            }}
                        >

                            Net Salary : ₹ {netSalary.toLocaleString("en-IN")}

                        </Typography>

                    </Grid>

                </Grid>

            </DialogContent>

            <DialogActions>

                <Button onClick={onClose}>

                    Cancel

                </Button>

                <Button
                    variant="contained"
                    onClick={handleSubmit(onSubmit)}
                >

                    {payroll
                        ? "Update"
                        : "Generate"}

                </Button>

            </DialogActions>

        </Dialog>

    );

}

export default PayrollDialog;