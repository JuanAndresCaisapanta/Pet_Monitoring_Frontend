import { FC, ReactNode, useContext, useReducer } from "react";

import Cookies from "js-cookie";

import { petMonitoringApi } from "../../api";
import { AuthContext } from "../auth";
import { DeviceContext, deviceReducer } from "./";
import sigfoxCallbackApi from "../../api/sigfoxCallbackApi";
import { swalMessage } from "../../components";

export interface DeviceState {}

const DEVICE_INITIAL_STATE: DeviceState = {};

interface Props {
  children: ReactNode;
}
export const DeviceProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(deviceReducer, DEVICE_INITIAL_STATE);
  const { user, checkToken } = useContext(AuthContext);

  const addDevice = async (
    code: string,
    pet: number,
  ): Promise<{ isComplete: boolean }> => {
    const token = Cookies.get("token") || "";
    let id: any;
    return await petMonitoringApi
      .post(
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
      )
      .then(async (device) => {
        id = device.data;
        if (device.data) {
          await petMonitoringApi
            .post(
              `/master-detail-data/master`,
              {
                device: { id: device.data },
                users: { id: user?.id },
                pet: { id: pet },
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              },
            )
            .then(async (master) => {
              if (master.data) {
                await sigfoxCallbackApi
                  .post(`/device-types/${code}/callbacks`, {
                    channel: "URL",
                    callbackType: 0,
                    callbackSubtype: 2,
                    payloadConfig:
                      "lat::float:32 long::float:32 temp::int:16 bat::uint:16",
                    enabled: true,
                    url: `${process.env.NEXT_PUBLIC_API_PET_MONITORING}/master-detail-data/detail`,
                    httpMethod: "POST",
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                    sendSni: false,
                    bodyTemplate:
                      '{\n"latitude":{customData#lat},\n"longitude":{customData#long},\n"temperature":{customData#temp},\n"battery":{customData#bat},\n"masterData":{"id":' +
                      master.data +
                      "}\n}",
                    contentType: "application/json",
                  })
                  .then(() => {
                    checkToken();
                    swalMessage("Success", "Dispositivo agregado", "success");
                  })
                  .catch(async () => {
                    await petMonitoringApi.delete(`/device/${id}`, {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    });
                    swalMessage(
                      "Error",
                      "Error al agregar el dispositivo",
                      "error",
                    );
                  });
              }
            });
        }

        return { isComplete: true };
      })
      .catch((error) => {
        console.log(error);
        swalMessage("Error", error.response.data.message, "error");
        return { isComplete: true };
      });
  };

  return (
    <DeviceContext.Provider
      value={{
        ...state,
        addDevice,
      }}
    >
      {children}
    </DeviceContext.Provider>
  );
};
