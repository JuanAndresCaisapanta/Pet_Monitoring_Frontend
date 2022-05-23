import axios from "axios";

const petMonitoringApi = axios.create({
  baseURL: "http://192.168.100.84:8080/",
});

export default petMonitoringApi;
