import { DataGrid } from "@mui/x-data-grid";
import { IconButton } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function DepartmentTable({
    departments,
    onEdit,
    onDelete
}) {

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
    );
}

export default DepartmentTable;