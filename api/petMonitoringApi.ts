import axios from "axios";

const petMonitoringApi = axios.create({
  baseURL: "https://beige-cougars-melt-157-100-91-151.loca.lt/",
});

export default petMonitoringApi;
