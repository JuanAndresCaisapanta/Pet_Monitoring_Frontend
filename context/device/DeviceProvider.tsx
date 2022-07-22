import { FC, ReactNode, useContext, useReducer } from "react";

import Cookies from "js-cookie";

import { petMonitoringApi } from "../../api";
import { AuthContext } from "../auth";
import { DeviceContext, deviceReducer } from "./";
import sigfoxCallbackApi from "../../api/sigfoxCallbackApi";
import { swalMessage } from "../../components";
import Swal from "sweetalert2";
import { IDeviceDetails, IDevices } from "../../interfaces";

export interface DeviceState {
  devices?: IDevices;
  deviceDetails?: IDeviceDetails;
}

const DEVICE_INITIAL_STATE: DeviceState = {
  devices: undefined,
  deviceDetails: undefined,
};

interface Props {
  children: ReactNode;
}
export const DeviceProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(deviceReducer, DEVICE_INITIAL_STATE);
  const { checkToken } = useContext(AuthContext);

  const getDevices = async () => {
    if (!Cookies.get("token")) {
      return;
    }
    try {
      const token = Cookies.get("token") || "";
      const { data } = await petMonitoringApi.get(`/auth/validate-token/${token}`);
      if (data == true) {
        const { data } = await petMonitoringApi.get(`/device`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        dispatch({ type: "[Device] - getDevices", payload: data });
      } else {
        Cookies.remove("token");
      }
    } catch (error) {
      Cookies.remove("token");
    }
  };

  const getDeviceDetailsByDevice = async (device_id: number) => {
    if (!Cookies.get("token")) {
      return;
    }
    if (device_id === undefined) {
      return;
    }
    try {
      const token = Cookies.get("token") || "";
      const { data } = await petMonitoringApi.get(`/auth/validate-token/${token}`);
      if (data == true) {
        const deviceDetails = await petMonitoringApi.get(`/device-detail/device/${device_id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        dispatch({ type: "[Device] - getDeviceDetailsByDevice", payload: deviceDetails.data });
      } else {
        Cookies.remove("token");
      }
    } catch (error) {
      Cookies.remove("token");
    }
  };

  const addDevice = async (code: string, user: number, pet: number): Promise<{ isComplete: boolean }> => {
    const token = Cookies.get("token") || "";
    let id: any;
    return await petMonitoringApi
      .post(
        `/device`,
        {
          code,
          users: { id: user },
          pet: { id: pet },
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
          await sigfoxCallbackApi
            .post(`/device-types/${code}/callbacks`, {
              channel: "URL",
              callbackType: 0,
              callbackSubtype: 2,
              payloadConfig: "lat::float:32 long::float:32 temp::int:16 bat::uint:16",
              enabled: true,
              url: `${process.env.NEXT_PUBLIC_API_PET_MONITORING}/device-detail`,
              httpMethod: "POST",
              headers: {
                Authorization: `Bearer ${token}`,
              },
              sendSni: false,
              bodyTemplate:
                '{\n"latitude":{customData#lat},\n"longitude":{customData#long},\n"temperature":{customData#temp},\n"battery":{customData#bat},\n"device":{"id":' +
                device.data +
                "}\n}",
              contentType: "application/json",
            })
            .then(async (callback) => {
              if (callback.data) {
                await petMonitoringApi.put(
                  `/device/${id}`,
                  {
                    callback_code: callback.data.id,
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
        return { isComplete: true };
      })
      .catch(async () => {
        swalMessage("Error", "Error al agregar el dispositivo - revise su código", "error");
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
      text: "Se borraran los datos asociados al dispositivo - No podrá revertir esta acción",
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
                callback = device.data.callback_code;
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
                          getDevices();
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

  const clearDevices = () => {
    dispatch({ type: "[Device] - clearDevices" });
  };

  return (
    <DeviceContext.Provider
      value={{
        ...state,
        getDevices,
        getDeviceDetailsByDevice,
        addDevice,
        deleteDevice,
        clearDevices,
      }}
    >
      {children}
    </DeviceContext.Provider>
  );
};
