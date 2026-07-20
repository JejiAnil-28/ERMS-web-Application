import axiosInstance from "../api/axiosConfig";

export const getRoles = () => {

    return axiosInstance.get("/roles");

};