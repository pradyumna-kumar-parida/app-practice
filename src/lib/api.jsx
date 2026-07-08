import axios from "axios";
console.log("api", process.env.EXPO_PUBLIC_API_URL);
const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
export default api;
