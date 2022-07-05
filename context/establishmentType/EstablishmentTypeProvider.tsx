import { FC, ReactNode, useReducer } from "react";

import Cookies from "js-cookie";

import { petMonitoringApi } from "../../api";
import { IEstablishmentType } from "../../interfaces";
import { EstablishmentTypeContext, establishmentTypeReducer } from ".";

export interface EstablishmentTypeState {
  establishmentType?: IEstablishmentType;
  isLoaded: boolean;
}

const ESTABLISHMENT_TYPE_INITIAL_STATE: EstablishmentTypeState = {
  establishmentType: undefined,
  isLoaded: false,
};

interface Props {
  children: ReactNode;
}
export const EstablishmentTypeProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(establishmentTypeReducer, ESTABLISHMENT_TYPE_INITIAL_STATE);

  const getEstablishmentType = async () => {
    if (!Cookies.get("token")) {
      return;
    }
    try {
      const token = Cookies.get("token") || "";
      const { data } = await petMonitoringApi.get(`/auth/validate-token/${token}`);
      if (data == true) {
        const establishmentType = await petMonitoringApi.get(`/establishmentType`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        dispatch({
          type: "[EstablishmentType] - getEstablishmentType",
          payload: establishmentType.data,
        });
      } else {
        Cookies.remove("token");
      }
    } catch (error) {
      Cookies.remove("token");
    }
  };

  const clearEstablishmentType = () => {
    dispatch({
      type: "[EstablishmentType] - clearEstablishmentType",
    });
  };

  return (
    <EstablishmentTypeContext.Provider
      value={{
        ...state,
        getEstablishmentType,
        clearEstablishmentType,
      }}
    >
      {children}
    </EstablishmentTypeContext.Provider>
  );
};
