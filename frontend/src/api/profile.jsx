import axios from "./defaultsettingAxios";

export const getProfile = (token) =>
  {
    return axios.get("/profile", { headers: { Authorization: `Bearer ${token}` } });}

export const updateProfile = (token, profileData) =>
  axios.put("/profile", profileData, {
    headers: { Authorization: `Bearer ${token}` },
  });
