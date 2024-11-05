import axios from "axios";

export const api = axios.create({
  //baseURL: "https://wd-tv-dashboard-api.webdura.info",
  baseURL: "http://localhost:8005",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});
