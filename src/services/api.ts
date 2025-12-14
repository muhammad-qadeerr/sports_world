import axios from "axios";

const BASE_URL = "https://localhost:7096/api";

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "accept": "text/plain",
  },
});

export default apiClient;
