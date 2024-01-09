import axios from "axios";

let api = axios.create({
  baseURL: "http://localhost:5151/",
});

export default api;
