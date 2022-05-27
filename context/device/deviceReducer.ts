import { DeviceState } from "./";

type DeviceActionType = { type: "[Device] - addDevice" };

export const deviceReducer = (
  state: DeviceState,
  action: DeviceActionType,
): DeviceState => {
  switch (action.type) {
    case "[Device] - addDevice":
      return {
        ...state,
      };

    default:
      return state;
  }
};
