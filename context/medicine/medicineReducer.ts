import { IFullNames, IMedicine } from "../../interfaces";
import { MedicineState } from "./";

type MedicineActionType =
  | { type: "[Medicine] - getMedicine"; payload: IMedicine }
  | { type: "[Medicine] - getMedicinesFullName"; payload: IFullNames }
  | { type: "[Medicine] - clearMedicinesFullName" }
  | { type: "[Medicine] - clearMedicine" };

export const medicineReducer = (state: MedicineState, action: MedicineActionType): MedicineState => {
  switch (action.type) {
    case "[Medicine] - getMedicine":
      return {
        ...state,
        medicine: action.payload,
        isLoaded: true,
      };
    case "[Medicine] - clearMedicine":
      return {
        ...state,
        medicine: undefined,
        isLoaded: false,
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
