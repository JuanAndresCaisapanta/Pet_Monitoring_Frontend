import { FC, ReactNode, useReducer } from "react";

import Cookies from "js-cookie";

import { petMonitoringApi } from "../../api";
import { IBreed } from "../../interfaces";
import { BreedContext, breedReducer } from "./";

export interface BreedState {
  breeds?: IBreed;
  isLoaded?: boolean;
}

const BREED_INITIAL_STATE: BreedState = {
  breeds: undefined,
  isLoaded: false,
};

interface Props {
  children: ReactNode;
}

export const BreedProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(breedReducer, BREED_INITIAL_STATE);

  const getBreeds = async (species_id: number) => {
    if (!Cookies.get("token")) {
      return;
    }
    try {
      const token = Cookies.get("token") || "";
      const { data } = await petMonitoringApi.get(
        `/auth/validate-token/${token}`,
      );
      if (data == true) {
        const { data } = await petMonitoringApi.get(`breed/species/${species_id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        dispatch({ type: "[Breed] - getBreeds", payload: data });
      } else {
        Cookies.remove("token");
      }
    } catch (error) {
      Cookies.remove("token");
    }
  };

  const clearBreeds = () => {
    dispatch({ type: "[Breed] - clearBreeds" });
  };

  return (
    <BreedContext.Provider
      value={{
        ...state,
        getBreeds,
        clearBreeds,
      }}
    >
      {children}
    </BreedContext.Provider>
  );
};
