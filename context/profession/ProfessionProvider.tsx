import Cookies from "js-cookie";
import { FC, ReactNode, useReducer } from "react";
import { petMonitoringApi } from "../../api";
import { IProfession } from "../../interfaces";
import { ProfessionContext, professionReducer } from "./";

export interface ProfessionState {
  professions?: IProfession;
  isLoaded: boolean;
}

const PROFESSION_INITIAL_STATE: ProfessionState = {
  professions: undefined,
  isLoaded: false,
};

interface Props {
  children: ReactNode;
}
export const ProfessionProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(
    professionReducer,
    PROFESSION_INITIAL_STATE,
  );
  const getProfessions = async () => {
    if (!Cookies.get("token")) {
      return;
    }
    try {
      const token = Cookies.get("token") || "";
      const { data } = await petMonitoringApi.get(
        `/auth/validate-token/${token}`,
      );
      if (data == true) {
        const professions = await petMonitoringApi.get(`/profession`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        dispatch({
          type: "[Profession] - getProfessions",
          payload: professions.data,
        });
      } else {
        Cookies.remove("token");
      }
    } catch (error) {
      Cookies.remove("token");
    }
  };

  const clearProfessions = () => {
    dispatch({
      type: "[Profession] - clearProfessions",
    });
  };

  return (
    <ProfessionContext.Provider
      value={{
        ...state,
        getProfessions,
        clearProfessions,
      }}
    >
      {children}
    </ProfessionContext.Provider>
  );
};
