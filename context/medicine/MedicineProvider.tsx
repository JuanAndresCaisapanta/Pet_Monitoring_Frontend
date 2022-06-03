import { FC, ReactNode, useReducer } from "react";
import { MedicineContext, medicineReducer } from "./";

export interface MedicineState {}

const MEDICINE_INITIAL_STATE: MedicineState = {};

interface Props {
  children: ReactNode;
}
export const MedicineProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(medicineReducer, MEDICINE_INITIAL_STATE);

  const getMedicines = async () => {
      
  }

  return (
    <MedicineContext.Provider
      value={{
        ...state,
      }}
    >
      {children}
    </MedicineContext.Provider>
  );
};
