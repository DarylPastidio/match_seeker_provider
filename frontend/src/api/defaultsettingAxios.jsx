import axios from "axios";
axios.defaults.baseURL = "http://127.0.0.1:5000/";
axios.defaults.headers.post["Content-Type"] = "application/json";
export default axios;
