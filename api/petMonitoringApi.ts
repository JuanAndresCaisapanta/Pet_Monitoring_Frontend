import axios from "axios";

const petMonitoringApi = axios.create({
  baseURL: "https://honest-webs-add-157-100-91-151.loca.lt/",
});

export default petMonitoringApi;
