import axiosInstance from "../api/axiosConfig";

// Today's attendance
export const getTodayAttendance = () => {
    return axiosInstance.get("/attendance/today");
};

// Employee Attendance History
export const getEmployeeAttendance = (employeeId) => {
    return axiosInstance.get(`/attendance/employee/${employeeId}`);
};

// Check In
export const checkIn = (data) => {
    return axiosInstance.post("/attendance/check-in", data);
};

// Check Out
export const checkOut = (employeeId) => {
    return axiosInstance.post(`/attendance/check-out/${employeeId}`);
};