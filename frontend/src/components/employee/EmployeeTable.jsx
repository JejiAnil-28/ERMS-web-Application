import { DataGrid } from "@mui/x-data-grid";
import { IconButton, Chip } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function EmployeeTable({
    employees,
    loading,
    onEdit,
    onDelete
}) {

    const columns = [

        {
            field: "employeeCode",
            headerName: "Code",
            width: 120
        },

        {
            field: "fullName",
            headerName: "Employee",
            flex: 1,
            valueGetter: (_, row) =>
                `${row.firstName} ${row.lastName}`
        },

        {
            field: "departmentName",
            headerName: "Department",
            flex: 1
        },

        {
            field: "roleName",
            headerName: "Role",
            width: 140
        },

        {
            field: "status",
            headerName: "Status",
            width: 130,
            renderCell: (params) => (
                <Chip
                    label={params.value}
                    color={
                        params.value === "ACTIVE"
                            ? "success"
                            : "default"
                    }
                    size="small"
                />
            )
        },

        {
            field: "salary",
            headerName: "Salary",
            width: 140,
            valueFormatter: (value) =>
                `₹${Number(value).toLocaleString("en-IN")}`
        },

        {
            field: "actions",
            headerName: "Actions",
            width: 140,
            sortable: false,
            renderCell: (params) => (
                <>
                    <IconButton
                        color="primary"
                        onClick={() => onEdit(params.row)}
                    >
                        <EditIcon />
                    </IconButton>

                    <IconButton
                        color="error"
                        onClick={() => onDelete(params.row)}
                    >
                        <DeleteIcon />
                    </IconButton>
                </>
            )
        }

    ];

    return (
        <DataGrid
            rows={employees}
            columns={columns}
            loading={loading}
            autoHeight
            pageSizeOptions={[5, 10, 20]}
            initialState={{
                pagination: {
                    paginationModel: {
                        pageSize: 5
                    }
                }
            }}
        />
    );

}

export default EmployeeTable;