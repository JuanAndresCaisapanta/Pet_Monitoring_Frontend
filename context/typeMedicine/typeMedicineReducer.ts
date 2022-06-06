import { TypeMedicineState } from "./";
import { ITypeMedicine } from '../../interfaces/typeMedicine';

type TypeMedicineActionType = { type: "[Type_Medicine] - getTypeMedicine"; payload: ITypeMedicine };

export const typeMedicineReducer = (
  state: TypeMedicineState,
  action: TypeMedicineActionType,
): TypeMedicineState => {
  switch (action.type) {
    case "[Type_Medicine] - getTypeMedicine":
      return {
        ...state,
        typeMedicine: action.payload
      };

    default:
      return state;
  }
};
