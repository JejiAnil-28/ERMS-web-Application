import { DataGrid } from "@mui/x-data-grid";
import { Chip } from "@mui/material";

function AttendanceTable({

    attendance,

    loading

}) {

    const formatDate = (date) => {

        if (!date) return "--";

        return new Date(date).toLocaleDateString("en-GB", {

            day: "2-digit",

            month: "short",

            year: "numeric"

        });

    };

    const formatTime = (time) => {

        if (!time) return "--";

        const [hours, minutes] = time.split(":");

        const date = new Date();

        date.setHours(hours);
        date.setMinutes(minutes);

        return date.toLocaleTimeString([], {

            hour: "2-digit",

            minute: "2-digit"

        });

    };

    const columns = [

        {
            field: "employeeCode",
            headerName: "Employee Code",
            width: 150
        },

        {
            field: "employeeName",
            headerName: "Employee Name",
            flex: 1,
            minWidth: 180
        },

        {
            field: "attendanceDate",
            headerName: "Date",
            width: 140,

            valueGetter: (_, row) =>
                formatDate(row.attendanceDate)
        },

        {
            field: "checkInTime",
            headerName: "Check In",
            width: 120,

            valueGetter: (_, row) =>
                formatTime(row.checkInTime)
        },

        {
            field: "checkOutTime",
            headerName: "Check Out",
            width: 120,

            valueGetter: (_, row) =>
                formatTime(row.checkOutTime)
        },

        {
            field: "status",
            headerName: "Status",
            width: 130,

            renderCell: (params) => {

                let color = "default";

                switch (params.value) {

                    case "PRESENT":
                        color = "success";
                        break;

                    case "ABSENT":
                        color = "error";
                        break;

                    case "LATE":
                        color = "warning";
                        break;

                    case "LEAVE":
                        color = "info";
                        break;

                    default:
                        color = "default";
                }

                return (

                    <Chip
                        label={params.value}
                        color={color}
                        size="small"
                        variant="filled"
                    />

                );

            }

        },

        {
            field: "remarks",
            headerName: "Remarks",
            flex: 1.5,
            minWidth: 220,

            valueGetter: (_, row) =>
                row.remarks || "--"
        }

    ];

    return (

        <DataGrid

            rows={attendance}

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

                noRowsLabel: "No attendance records found."

            }}

        />

    );

}

export default AttendanceTable;