import { DataGrid } from "@mui/x-data-grid";
import { Chip, IconButton, Tooltip } from "@mui/material";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

function LeaveTable({

    leaves,

    loading,

    onApprove,

    onReject,

    isAdmin = false

}) {

    const columns = [

        {
            field: "employeeCode",
            headerName: "Employee Code",
            width: 140
        },

        {
            field: "employeeName",
            headerName: "Employee Name",
            flex: 1
        },

        {
            field: "leaveType",
            headerName: "Leave Type",
            width: 140
        },

        {
            field: "startDate",
            headerName: "Start Date",
            width: 140
        },

        {
            field: "endDate",
            headerName: "End Date",
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

                        params.value === "APPROVED"

                            ? "success"

                            : params.value === "REJECTED"

                                ? "error"

                                : "warning"

                    }

                    size="small"

                />

            )

        },

        {
            field: "reason",
            headerName: "Reason",
            flex: 1.5
        }

    ];

    if (isAdmin) {

        columns.push({

            field: "actions",

            headerName: "Actions",

            width: 130,

            sortable: false,

            renderCell: (params) => (

                <>

                    <Tooltip title="Approve">

                        <IconButton

                            color="success"

                            onClick={() => onApprove(params.row)}

                        >

                            <CheckCircleIcon />

                        </IconButton>

                    </Tooltip>

                    <Tooltip title="Reject">

                        <IconButton

                            color="error"

                            onClick={() => onReject(params.row)}

                        >

                            <CancelIcon />

                        </IconButton>

                    </Tooltip>

                </>

            )

        });

    }

    

    return (

        <DataGrid

            rows={leaves}

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

export default LeaveTable;