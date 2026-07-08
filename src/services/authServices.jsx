import api from "../lib/api";

export const login = (data) => {
  return api.post("/login", data);
};
