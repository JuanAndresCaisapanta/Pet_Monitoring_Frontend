import { FC, ReactNode, useReducer } from "react";

import Cookies from "js-cookie";

import { petMonitoringApi } from "../../api";
import { IMedicineType } from "../../interfaces";
import { MedicineTypeContext, medicineTypeReducer } from ".";

export interface MedicineTypeState {
  medicineType?: IMedicineType;
}

const MEDICINE_TYPE_INITIAL_STATE: MedicineTypeState = {
  medicineType: undefined,
};

interface Props {
  children: ReactNode;
}
export const MedicineTypeProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(medicineTypeReducer, MEDICINE_TYPE_INITIAL_STATE);
  
  const getMedicineType = async () => {
    if (!Cookies.get("token")) {
      return;
    }
    try {
      const token = Cookies.get("token") || "";
      const { data } = await petMonitoringApi.get(`/auth/validate-token/${token}`);
      if (data == true) {
        const type = await petMonitoringApi.get(`/medicineType`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        dispatch({
          type: "[MedicineType] - getMedicineType",
          payload: type.data,
        });
      } else {
        Cookies.remove("token");
      }
    } catch (error) {
      Cookies.remove("token");
    }
  };

  return (
    <MedicineTypeContext.Provider
      value={{
        ...state,
        getMedicineType,
      }}
    >
      {children}
    </MedicineTypeContext.Provider>
  );
};
