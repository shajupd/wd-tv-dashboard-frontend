import axios from "axios";

export const api = axios.create({
  baseURL: "https://tv-dashboard-api.webdura.info",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});
