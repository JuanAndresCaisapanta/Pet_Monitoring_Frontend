import axios from "axios";

const petMonitoringApi = axios.create({
  baseURL: "http://localhost:8080/",
});

export default petMonitoringApi;
