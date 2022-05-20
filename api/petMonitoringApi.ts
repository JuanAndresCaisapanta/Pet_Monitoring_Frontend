import axios from "axios";

const petMonitoringApi = axios.create({
  baseURL: "https://thick-geckos-sip-157-100-91-151.loca.lt/",
});

export default petMonitoringApi;
