import axios from "axios";

const petMonitoringApi = axios.create({
  baseURL: "https://spotty-suns-run-157-100-91-151.loca.lt/",
});

export default petMonitoringApi;
