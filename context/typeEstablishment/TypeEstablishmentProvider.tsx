import Cookies from "js-cookie";
import { FC, ReactNode, useReducer } from "react";
import { petMonitoringApi } from "../../api";

import { ITypeEstablishment } from "../../interfaces";
import { TypeEstablishmentContext, typeEstablishmentReducer } from "./";

export interface TypeEstablishmentState {
  typeEstablishments?: ITypeEstablishment;
  isLoaded: boolean;
}

const TYPE_ESTABLISHMENT_INITIAL_STATE: TypeEstablishmentState = {
  typeEstablishments: undefined,
  isLoaded: false,
};

interface Props {
  children: ReactNode;
}
export const TypeEstablishmentProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(
    typeEstablishmentReducer,
    TYPE_ESTABLISHMENT_INITIAL_STATE,
  );

  const getTypeEstablishments = async () => {
    if (!Cookies.get("token")) {
      return;
    }
    try {
      const token = Cookies.get("token") || "";
      const { data } = await petMonitoringApi.get(
        `/auth/validate-token/${token}`,
      );
      if (data == true) {
        const typeEstablishments = await petMonitoringApi.get(`/typeEstablishment`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        dispatch({
          type: "[TypeEstablishments] - getTypeEstablishments",
          payload: typeEstablishments.data,
        });
      } else {
        Cookies.remove("token");
      }
    } catch (error) {
      Cookies.remove("token");
    }
  };

  const clearTypeEstablishments = () => {
    dispatch({
      type: "[TypeEstablishments] - clearTypeEstablishments",
    });
  };

  return (
    <TypeEstablishmentContext.Provider
      value={{
        ...state,
        getTypeEstablishments,
        clearTypeEstablishments,
      }}
    >
      {children}
    </TypeEstablishmentContext.Provider>
  );
};
