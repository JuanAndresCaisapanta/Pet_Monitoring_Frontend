import axios from "axios";

const sigfoxCallbackApi = axios.create({
  baseURL: `/v2/`,
  auth: {
    username: process.env.NEXT_PUBLIC_API_SIGFOX_USERNAME!,
    password: process.env.NEXT_PUBLIC_API_SIGFOX_PASSWORD!,
  },

  headers: {
    "Content-Type": "application/json",
  },
});

export default sigfoxCallbackApi;
