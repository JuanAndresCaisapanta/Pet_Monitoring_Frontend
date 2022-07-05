import { MedicineTypeState } from ".";
import { IMedicineType } from "../../interfaces/medicineType";

type MedicineTypeActionType = { type: "[MedicineType] - getMedicineType"; payload: IMedicineType };

export const medicineTypeReducer = (
  state: MedicineTypeState,
  action: MedicineTypeActionType,
): MedicineTypeState => {
  switch (action.type) {
    case "[MedicineType] - getMedicineType":
      return {
        ...state,
        medicineType: action.payload,
      };
    default:
      return state;
  }
};
