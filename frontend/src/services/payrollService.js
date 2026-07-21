import axiosInstance from "../api/axiosConfig";

export const getPayrolls = () => {

    return axiosInstance.get("/payroll");

};

export const createPayroll = (payroll) => {

    return axiosInstance.post(
        "/payroll",
        payroll
    );

};

export const updatePayroll = (id, payroll) => {

    return axiosInstance.put(
        `/payroll/${id}`,
        payroll
    );

};

export const deletePayroll = (id) => {

    return axiosInstance.delete(
        `/payroll/${id}`
    );

};

export const getPayrollByEmployee = (employeeId) => {

    return axiosInstance.get(
        `/payroll/employee/${employeeId}`
    );

};

export const getPayrollByMonth = (month, year) => {

    return axiosInstance.get(
        `/payroll/month/${month}/${year}`
    );

};