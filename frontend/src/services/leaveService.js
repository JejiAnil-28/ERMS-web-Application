import axiosInstance from "../api/axiosConfig";

// Get all leave requests
export const getLeaves = () => {
    return axiosInstance.get("/leaves");
};

// Apply leave
export const applyLeave = (leave) => {
    return axiosInstance.post("/leaves", leave);
};

// Employee leave history
export const getLeaveHistory = () => {
    return axiosInstance.get("/leaves/history");
};

// Pending leave requests
export const getPendingLeaves = () => {
    return axiosInstance.get("/leaves/pending");
};

export const approveLeave = (leaveId, approverId) => {

    return axiosInstance.put(
        `/leaves/${leaveId}/approve/${approverId}`
    );

};

export const rejectLeave = (leaveId, approverId) => {

    return axiosInstance.put(
        `/leaves/${leaveId}/reject/${approverId}`
    );

};

