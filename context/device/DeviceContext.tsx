import { createContext } from "react";

interface ContextProps {
  addDevice: (
    code: string,
    pet: number,
  ) => Promise<{  isComplete: boolean  }>;
  deleteDevice: (device_id: number) => Promise<{  isComplete: boolean  }>;
}

export const DeviceContext = createContext({} as ContextProps);
