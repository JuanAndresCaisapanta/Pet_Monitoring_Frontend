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
      const device_id = await petMonitoringApi.post(
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

      const master_id = await petMonitoringApi.post(
        `/master-detail-data/master`,
        {
          device: { id: device_id.data },
          users: { id: user?.id },
          pet: { id: pet },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      await sigfoxCallbackApi.post(
        `/device-types/${code}/callbacks`,
        {
            channel: "URL",
            callbackType: 0,
            callbackSubtype: 2,
            payloadConfig:
              "lat::float:32 long::float:32 temp::int:16 bat::uint:16",
            enabled: true,
            url:`${process.env.NEXT_PUBLIC_API_PET_MONITORING}/master-detail-data/detail`,
            httpMethod: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            sendSni: false,
            bodyTemplate:
              '{\n"latitude":{customData#lat},\n"longitude":{customData#long},\n"temperature":{customData#temp},\n"battery":{customData#bat},\n"masterData":{"id":' +
              master_id.data +
              "}\n}",
            contentType: "application/json",
        }
      );

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
