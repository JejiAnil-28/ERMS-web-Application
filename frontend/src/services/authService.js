import axiosInstance from "../api/axiosConfig";

export const login = (credentials) => {

    return axiosInstance.post(

        "/auth/login",

        credentials

    );

};