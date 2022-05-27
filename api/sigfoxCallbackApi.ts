import axios from "axios";

const sigfoxCallbackApi = axios.create({
  baseURL: "/device-types/",
  auth: {
    username: "6267947d7a36e32515ad0d72",
    password: "57d5d416531dac4083ac0f61c4f226f5",
  },
 
  headers: {
    'Access-Control-Allow-Origin': '*',
    "Content-Type": "application/json",
  },
});

export default sigfoxCallbackApi;
