import axiosInstance from "../api/axiosConfig";

// Get all employees
export const getEmployees = () => {
    return axiosInstance.get("/employees");
};

// Get employees with pagination
export const getEmployeesPage = (
    page = 0,
    size = 10,
    sortBy = "id",
    direction = "asc"
) => {
    return axiosInstance.get(
        `/employees/page?page=${page}&size=${size}&sortBy=${sortBy}&direction=${direction}`
    );
};

// Create employee
export const createEmployee = (employee) => {
    return axiosInstance.post("/employees", employee);
};

// Update employee
export const updateEmployee = (id, employee) => {
    return axiosInstance.put(`/employees/${id}`, employee);
};

// Delete employee
export const deleteEmployee = (id) => {
    return axiosInstance.delete(`/employees/${id}`);
};

// Search employee
export const searchEmployees = (keyword) => {
    return axiosInstance.get(
        `/employees/search?keyword=${keyword}`
    );
};