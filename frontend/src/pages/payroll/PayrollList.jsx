import { useEffect, useMemo, useState } from "react";
import { Box } from "@mui/material";
import { toast } from "react-toastify";

import PageHeader from "../../components/common/PageHeader";
import PayrollStatistics from "../../components/payroll/PayrollStatistics";
import PayrollToolbar from "../../components/payroll/PayrollToolbar";
import PayrollTable from "../../components/payroll/PayrollTable";
import PayrollDialog from "../../components/payroll/PayrollDialog";

import {
    getPayrolls,
    createPayroll,
    updatePayroll,
    deletePayroll
} from "../../services/payrollService";

import { getEmployees } from "../../services/employeeService";

function PayrollList() {

    const [payrolls, setPayrolls] = useState([]);
    const [employees, setEmployees] = useState([]);

    const [loading, setLoading] = useState(false);

    const [search, setSearch] = useState("");

    const [dialogOpen, setDialogOpen] = useState(false);

    const [selectedPayroll, setSelectedPayroll] = useState(null);

    useEffect(() => {

        loadPayrolls();

        loadEmployees();

    }, []);

    const loadPayrolls = async () => {

        try {

            setLoading(true);

            const response = await getPayrolls();

            setPayrolls(response.data.data);

        } catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Failed to load payrolls"

            );

        } finally {

            setLoading(false);

        }

    };

    const loadEmployees = async () => {

        try {

            const response = await getEmployees();

            setEmployees(response.data.data.content);

        } catch {

            toast.error("Failed to load employees");

        }

    };

    const handleCreate = () => {

        setSelectedPayroll(null);

        setDialogOpen(true);

    };

    const handleEdit = (payroll) => {

        setSelectedPayroll(payroll);

        setDialogOpen(true);

    };

    const handleClose = () => {

        setDialogOpen(false);

        setSelectedPayroll(null);

    };

    const handleSubmit = async (data) => {

        try {

            if (selectedPayroll) {

                await updatePayroll(selectedPayroll.id, data);

                toast.success("Payroll updated successfully");

            } else {

                await createPayroll(data);

                toast.success("Payroll generated successfully");

            }

            handleClose();

            loadPayrolls();

        } catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Operation failed"

            );

        }

    };

    const handleDelete = async (payroll) => {

        if (!window.confirm("Delete this payroll?")) {

            return;

        }

        try {

            await deletePayroll(payroll.id);

            toast.success("Payroll deleted successfully");

            loadPayrolls();

        } catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Delete failed"

            );

        }

    };

    const filteredPayrolls = useMemo(() => {

        const keyword = search.toLowerCase();

        return payrolls.filter((payroll) =>

            payroll.employeeCode
                ?.toLowerCase()
                .includes(keyword)

            ||

            payroll.employeeName
                ?.toLowerCase()
                .includes(keyword)

        );

    }, [payrolls, search]);

    return (

        <Box>

            <PageHeader title="Payroll Management" />

            <PayrollStatistics

                payrolls={payrolls}

            />

            <PayrollToolbar

                search={search}

                setSearch={setSearch}

                onRefresh={loadPayrolls}

                onCreate={handleCreate}

            />

            <PayrollDialog

                open={dialogOpen}

                payroll={selectedPayroll}

                employees={employees}

                onClose={handleClose}

                onSubmit={handleSubmit}

            />

            <PayrollTable

                payrolls={filteredPayrolls}

                loading={loading}

                onEdit={handleEdit}

                onDelete={handleDelete}

            />

        </Box>

    );

}

export default PayrollList;