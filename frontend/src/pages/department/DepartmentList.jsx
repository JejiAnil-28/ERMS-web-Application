import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { getDepartments } from "../../services/departmentService";

function DepartmentList() {

    const [departments, setDepartments] = useState([]);

    useEffect(() => {

        loadDepartments();

    }, []);

    async function loadDepartments() {

        try {

            const response = await getDepartments();

            setDepartments(response.data.data);

        } catch (error) {

            console.error(error);

        }

    }

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
        }

    ];

    return (

        <Box>

            <Typography
                variant="h4"
                mb={3}
            >
                Departments
            </Typography>

            <DataGrid
                rows={departments}
                columns={columns}
                autoHeight
                pageSizeOptions={[5,10]}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5
                        }
                    }
                }}
            />

        </Box>

    );

}

export default DepartmentList;