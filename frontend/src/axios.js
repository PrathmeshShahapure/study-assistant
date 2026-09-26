import axios from "axios";

const api = axios.create({
  baseURL: "https://study-assistant-e3jb.onrender.com",
});
export default api;