import { IMedicine } from "../../interfaces";
import { MedicineState } from "./";

type MedicineActionType =
  | { type: "[Medicine] - getMedicine"; payload: IMedicine }
  | { type: "[Medicine] - clearMedicine" };

export const medicineReducer = (state: MedicineState, action: MedicineActionType): MedicineState => {
  switch (action.type) {
    case "[Medicine] - getMedicine":
      return {
        ...state,
        medicine: action.payload,
        loaded: true,
      };
    case "[Medicine] - clearMedicine":
      return {
        ...state,
        medicine: undefined,
        loaded: false,
      };
    default:
      return state;
  }
};
