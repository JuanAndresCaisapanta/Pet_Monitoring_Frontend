import { IFullNames, IMedicine, IMedicines } from "../../interfaces";
import { MedicineState } from "./";

type MedicineActionType =
  | { type: "[Medicine] - getMedicine"; payload: IMedicine }
  | { type: "[Medicine] - getMedicinesFullName"; payload: IFullNames }
  | { type: "[Medicine] - getMedicines"; payload: IMedicines }
  | { type: "[Medicine] - clearMedicinesFullName" }
  | { type: "[Medicine] - clearMedicine" }
  | { type: "[Medicine] - clearMedicines" };

export const medicineReducer = (state: MedicineState, action: MedicineActionType): MedicineState => {
  switch (action.type) {
    case "[Medicine] - getMedicine":
      return {
        ...state,
        medicine: action.payload,
        isLoaded: true,
      };
    case "[Medicine] - getMedicines":
      return {
        ...state,
        medicines: action.payload,
      };
    case "[Medicine] - clearMedicine":
      return {
        ...state,
        medicine: undefined,
        isLoaded: false,
      };
      case "[Medicine] - clearMedicines":
      return {
        ...state,
        medicines: undefined,
      };
    case "[Medicine] - getMedicinesFullName":
      return {
        ...state,
        medicinesFullName: action.payload,
        isLoaded: true,
      };
    case "[Medicine] - clearMedicinesFullName":
      return {
        ...state,
        medicinesFullName: undefined,
        isLoaded: false,
      };
    default:
      return state;
  }
};
