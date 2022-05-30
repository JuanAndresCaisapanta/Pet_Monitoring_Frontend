import axios from "axios";

const petMonitoringApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_PET_MONITORING,
});

export default petMonitoringApi;
