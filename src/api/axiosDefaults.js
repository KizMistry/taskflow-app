import axios from "axios";

axios.defaults.baseURL = 'https://taskflow-app-fe0b343d965d.herokuapp.com/';
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
axios.defaults.withCredentials = true;