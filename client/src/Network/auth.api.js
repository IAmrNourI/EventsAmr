import { axiosInstance } from "./index";

const registerApi = async(data) => {
    return await axiosInstance.post("/api/auth/register", data)
}

const LoginApi = async(data) => {
    return await axiosInstance.post("/api/auth/login", data)
}




export { registerApi, LoginApi }