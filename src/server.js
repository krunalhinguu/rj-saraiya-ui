import axios from "axios";

export const instance = axios.create({
  baseURL: "http://localhost:8081/v1/",
  timeout: 50000,
});
