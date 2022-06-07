import Cookies from "js-cookie";
import { FC, ReactNode, useEffect, useReducer } from "react";
import { petMonitoringApi } from "../../api";
import { ITypeMedicine } from "../../interfaces";
import { TypeMedicineContext, typeMedicineReducer } from "./";

export interface TypeMedicineState {
  typeMedicine?: ITypeMedicine;
}

const TYPE_MEDICINE_INITIAL_STATE: TypeMedicineState = {
  typeMedicine: undefined,
};

interface Props {
  children: ReactNode;
}
export const TypeMedicineProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(
    typeMedicineReducer,
    TYPE_MEDICINE_INITIAL_STATE,
  );

  const getTypeMedicine = async () => {
    if (!Cookies.get("token")) {
      return;
    }
    try {
      const token = Cookies.get("token") || "";
      const { data } = await petMonitoringApi.get(
        `/auth/validate-token/${token}`,
      );
      if (data == true) {
        const type = await petMonitoringApi.get(`/typeMedicine`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        dispatch({
          type: "[Type_Medicine] - getTypeMedicine",
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
    <TypeMedicineContext.Provider
      value={{
        ...state,
        getTypeMedicine,
      }}
    >
      {children}
    </TypeMedicineContext.Provider>
  );
};
