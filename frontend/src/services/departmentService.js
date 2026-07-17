import axiosInstance from "../api/axiosConfig";

export const getDepartments = () => {
    return axiosInstance.get("/departments");
};

export const createDepartment = (department) => {
    return axiosInstance.post("/departments", department);
};

export const updateDepartment = (id, department) => {
    return axiosInstance.put(`/departments/${id}`, department);
};

export const deleteDepartment = (id) => {
    return axiosInstance.delete(`/departments/${id}`);
};