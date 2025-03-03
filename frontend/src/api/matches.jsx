import axios from "./defaultsettingAxios";

export const getMatches = (token) =>
  axios.get("/matches", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
