import axios from "axios";

axios.defaults.baseURL = "https://taskflow-api-poz9.onrender.com";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();
