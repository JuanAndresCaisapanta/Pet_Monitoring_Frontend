import axios from "axios";
import Cookies from "js-cookie";
import { FC, ReactNode, useContext, useReducer } from "react";
import Swal from "sweetalert2";
import { petMonitoringApi } from "../../api";
import { AuthContext } from "../auth";
import { DeviceContext, deviceReducer } from "./";
import sigfoxCallbackApi from "../../api/sigfoxCallbackApi";

export interface DeviceState {}

const DEVICE_INITIAL_STATE: DeviceState = {};

interface Props {
  children: ReactNode;
}
export const DeviceProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(deviceReducer, DEVICE_INITIAL_STATE);
  const { user, checkToken } = useContext(AuthContext);

  const addCallback = async (
    code: string,
    pet: number,
  ): Promise<{ hasError: boolean; message?: string }> => {
    try {
      const token = Cookies.get("token") || "";
      const {data} = await petMonitoringApi.post(
        `/device`,
        {
          code,
          users: { id: user?.id },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      await fetch(`/v2/device-types/${code}/callbacks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic NjI2Nzk0N2Q3YTM2ZTMyNTE1YWQwZDcyOjU3ZDVkNDE2NTMxZGFjNDA4M2FjMGY2MWM0ZjIyNmY1`,
        },
        body: JSON.stringify({
          channel: "URL",
          callbackType: 0,
          callbackSubtype: 2,
          payloadConfig:
            "lat::float:32 long::float:32 temp::int:16 bat::uint:16",
          enabled: true,
          url: "https://spotty-suns-run-157-100-91-151.loca.lt/deviceData",
          httpMethod: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          sendSni: false,
          bodyTemplate:
            '{\n"latitude":{customData#lat},\n"longitude":{customData#long},\n"temperature":{customData#temp},\n"battery":{customData#bat},\n"device":{"id":' +
            data +
            '},\n"pet":{"id":' +
            pet +
            "}\n}",

          contentType: "application/json",
        }),
      });

      checkToken();
      Swal.fire({
        background: "#F4F5FA",
        title: "Listo",
        text: "Mascota Agregada",
        icon: "success",
        backdrop: false,
        timer: 1500,
        timerProgressBar: true,
        showConfirmButton: false,
      });
      return {
        hasError: false,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          hasError: true,
          message: error.message,
        };
      }
      return {
        hasError: true,
        message: "No se pudo agregar su dispositivo - intente de nuevo",
      };
    }
  };

  return (
    <DeviceContext.Provider
      value={{
        ...state,
        addCallback,
      }}
    >
      {children}
    </DeviceContext.Provider>
  );
};
