import axios from "axios";

axios.defaults.baseURL = "https://taskflow-app-734253c0080e.herokuapp.com/";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();
