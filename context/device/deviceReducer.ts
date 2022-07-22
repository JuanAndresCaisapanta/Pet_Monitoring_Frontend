import { IDeviceDetails, IDevices } from "../../interfaces";
import { DeviceState } from "./";

type DeviceActionType = |{ type: "[Device] - addDevice" }
|{type:"[Device] - getDevices"; payload:IDevices}
|{type:"[Device] - getDeviceDetailsByDevice"; payload:IDeviceDetails}
|{type:"[Device] - clearDevices"}

export const deviceReducer = (
  state: DeviceState,
  action: DeviceActionType,
): DeviceState => {
  switch (action.type) {
    case "[Device] - getDevices":
    return{
      ...state,
      devices: action.payload
    }
    case "[Device] - getDeviceDetailsByDevice":
    return{
      ...state,
      deviceDetails: action.payload
    }
    case "[Device] - addDevice":
      return {
        ...state,
      };
      case "[Device] - clearDevices":
    return{
      ...state,
      devices: undefined
    }

    default:
      return state;
  }
};
