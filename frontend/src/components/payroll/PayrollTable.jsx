import { DataGrid } from "@mui/x-data-grid";
import {
    Chip,
    IconButton,
    Tooltip
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function PayrollTable({

    payrolls,

    loading,

    onEdit,

    onDelete

}) {

    const formatCurrency = (amount) => {

        if (amount == null) return "--";

        return `₹ ${Number(amount).toLocaleString("en-IN", {

            minimumFractionDigits: 2,

            maximumFractionDigits: 2

        })}`;

    };

    const formatDate = (date) => {

        if (!date) return "--";

        return new Date(date).toLocaleDateString("en-GB", {

            day: "2-digit",

            month: "short",

            year: "numeric"

        });

    };

    const columns = [

        {
            field: "employeeCode",
            headerName: "Employee Code",
            width: 140
        },

        {
            field: "employeeName",
            headerName: "Employee Name",
            flex: 1,
            minWidth: 180
        },

        {
            field: "payMonth",
            headerName: "Month",
            width: 90
        },

        {
            field: "payYear",
            headerName: "Year",
            width: 90
        },

        {
            field: "basicSalary",
            headerName: "Basic",
            width: 130,

            valueGetter: (_, row) =>
                formatCurrency(row.basicSalary)
        },

        {
            field: "allowances",
            headerName: "Allowances",
            width: 130,

            valueGetter: (_, row) =>
                formatCurrency(row.allowances)
        },

        {
            field: "deductions",
            headerName: "Deductions",
            width: 130,

            valueGetter: (_, row) =>
                formatCurrency(row.deductions)
        },

        {
            field: "bonus",
            headerName: "Bonus",
            width: 120,

            valueGetter: (_, row) =>
                formatCurrency(row.bonus)
        },

        {
            field: "netSalary",
            headerName: "Net Salary",
            width: 140,

            valueGetter: (_, row) =>
                formatCurrency(row.netSalary)
        },

        {
            field: "paymentDate",
            headerName: "Payment Date",
            width: 140,

            valueGetter: (_, row) =>
                formatDate(row.paymentDate)
        },

        {
            field: "status",
            headerName: "Status",
            width: 120,

            renderCell: (params) => (

                <Chip

                    label={params.value}

                    color={
                        params.value === "PAID"
                            ? "success"
                            : "warning"
                    }

                    size="small"

                />

            )

        },

        {
            field: "actions",
            headerName: "Actions",
            width: 120,
            sortable: false,

            renderCell: (params) => (

                <>

                    <Tooltip title="Edit">

                        <IconButton
                            color="primary"
                            onClick={() => onEdit(params.row)}
                        >

                            <EditIcon />

                        </IconButton>

                    </Tooltip>

                    <Tooltip title="Delete">

                        <IconButton
                            color="error"
                            onClick={() => onDelete(params.row)}
                        >

                            <DeleteIcon />

                        </IconButton>

                    </Tooltip>

                </>

            )

        }

    ];

    return (

        <DataGrid

            rows={payrolls}

            columns={columns}

            loading={loading}

            autoHeight

            disableRowSelectionOnClick

            pageSizeOptions={[5, 10, 20]}

            initialState={{

                pagination: {

                    paginationModel: {

                        pageSize: 5

                    }

                }

            }}

            localeText={{

                noRowsLabel: "No payroll records found."

            }}

        />

    );

}

export default PayrollTable;