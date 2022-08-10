import { createContext } from "react";
import { IDeviceDetails, IDevices } from "../../interfaces";

interface ContextProps {
  devices?: IDevices;
  deviceDetails?: IDeviceDetails;

  getDevices: () => void;

  getDeviceDetailsByDevice: (device_id: number) => void;

  addDevice: (code: string, user: number, pet: number, clearForm: ()=>void) => Promise<{ isComplete: boolean }>;

  deleteDevice: (device_id: number) => Promise<{ isComplete: boolean }>;

  clearDevices: () => void;
}

export const DeviceContext = createContext({} as ContextProps);
