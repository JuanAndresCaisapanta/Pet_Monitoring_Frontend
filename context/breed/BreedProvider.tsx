import Cookies from "js-cookie";
import { FC, ReactNode, useReducer } from "react";
import { petMonitoringApi } from "../../api";
import { IBreed } from "../../interfaces";
import { BreedContext, breedReducer } from "./";

export interface BreedState {
  breed?: IBreed;
}

const BREED_INITIAL_STATE: BreedState = {
  breed: undefined,
};

interface Props {
  children: ReactNode;
}

export const BreedProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(breedReducer, BREED_INITIAL_STATE);

  const getBreed = async (id: number) => {
    if (!Cookies.get("token")) {
      return;
    }
    try {
      const token = Cookies.get("token") || "";
      const { data } = await petMonitoringApi.get(
        `/auth/validate-token/${token}`,
      );
      if (data == true) {
        const { data } = await petMonitoringApi.get(`breed/species/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        dispatch({ type: "[Breed] - getBreed", payload: data });
      } else {
        Cookies.remove("token");
      }
    } catch (error) {
      Cookies.remove("token");
    }
  };

  return (
    <BreedContext.Provider
      value={{
        ...state,getBreed,
      }}
    >
      {children}
    </BreedContext.Provider>
  );
};
