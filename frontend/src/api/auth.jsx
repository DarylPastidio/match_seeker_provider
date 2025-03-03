import axios from "./defaultsettingAxios";

export const loginUser = (credentials) => axios.post("/login", credentials);
export const registerUser = (userData) => axios.post("/register", userData);
