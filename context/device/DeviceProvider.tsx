import { FC, ReactNode, useContext, useReducer } from "react";

import Cookies from "js-cookie";

import { petMonitoringApi } from "../../api";
import { AuthContext } from "../auth";
import { DeviceContext, deviceReducer } from "./";
import sigfoxCallbackApi from "../../api/sigfoxCallbackApi";
import { swalMessage } from "../../components";
import Swal from "sweetalert2";

export interface DeviceState {}

const DEVICE_INITIAL_STATE: DeviceState = {};

interface Props {
  children: ReactNode;
}
export const DeviceProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(deviceReducer, DEVICE_INITIAL_STATE);
  const { user, checkToken } = useContext(AuthContext);

  const addDevice = async (code: string, pet: number): Promise<{ isComplete: boolean }> => {
    const token = Cookies.get("token") || "";
    let id: any;
    return await petMonitoringApi
      .post(
        `/device`,
        {
          code,
          users: { id: user?.id },
          callback: "en espera",
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
                    payloadConfig: "lat::float:32 long::float:32 temp::int:16 bat::uint:16",
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
                  .then(async (callback) => {
                    if (callback.data) {
                      await petMonitoringApi.put(
                        `/device/${id}`,
                        {
                          callback: callback.data.id,
                        },
                        {
                          headers: {
                            Authorization: `Bearer ${token}`,
                          },
                        },
                      );
                      checkToken();
                      swalMessage("Success", "Dispositivo agregado", "success");
                    }
                  })
                  .catch(async () => {
                    await petMonitoringApi.delete(`/device/${id}`, {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    });
                    swalMessage("Error", "Error al agregar el dispositivo - revise su código", "error");
                  });
              }
            });
        }
        return { isComplete: true };
      })
      .catch((error) => {
        swalMessage("Error", error.response.data.message, "error");
        return { isComplete: true };
      });
  };

  const deleteDevice = async (device_id: number): Promise<{ isComplete: boolean }> => {
    const token = Cookies.get("token") || "";
    let code: any;
    let callback: any;
    return Swal.fire({
      background: "#F4F5FA",
      title: "¿Está seguro de eliminar el dispositivo?",
      text: "No podrá revertir esta acción",
      icon: "warning",
      showCancelButton: true,
      backdrop: false,
      confirmButtonColor: "#9E69FD",
      cancelButtonColor: "#9C9FA4",
      confirmButtonText: "Si, Eliminar",
    })
      .then(async (result) => {
        if (result.isConfirmed) {
          await petMonitoringApi
            .get(`/device/${device_id}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then(async (device) => {
              if (device.data) {
                code = device.data.code;
                callback = device.data.callback;
                await petMonitoringApi
                  .delete(`/device/${device.data.id}`, {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  })
                  .then(async (device) => {
                    if (device.data) {
                      await sigfoxCallbackApi
                        .delete(`/device-types/${code}/callbacks/${callback}`)
                        .then(async () => {
                          swalMessage("Success", "Dispositivo eliminado", "success");
                          checkToken();
                        })
                        .catch(async () => {
                          swalMessage("Error", "Error al eliminar el dispositivo", "error");
                        });
                    }
                  })
                  .catch(async () => {
                    swalMessage("Error", "Error al eliminar el dispositivo", "error");
                  });
              }
            })
            .catch(() => {
              swalMessage("Error", "Error al eliminar el dispositivo", "error");
            });
        }
        return { isComplete: true };
      })
      .catch(() => {
        return { isComplete: true };
      });
  };

  return (
    <DeviceContext.Provider
      value={{
        ...state,
        addDevice,
        deleteDevice,
      }}
    >
      {children}
    </DeviceContext.Provider>
  );
};
