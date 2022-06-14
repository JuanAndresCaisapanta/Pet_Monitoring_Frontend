import { FC, ReactNode, useEffect, useReducer } from "react";
import { ISpecies } from "../../interfaces";

import { SpeciesContext } from ".";
import Cookies from "js-cookie";
import { petMonitoringApi } from "../../api";
import { speciesReducer } from "./speciesReducer";

export interface SpeciesState {
  species?: ISpecies;
  isLoaded?: boolean;
}

const SPECIES_INITIAL_STATE: SpeciesState = {
  species: undefined,
  isLoaded: false,
};

interface Props {
  children: ReactNode;
}

export const SpeciesProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(speciesReducer, SPECIES_INITIAL_STATE);

  const getSpecies = async () => {
    if (!Cookies.get("token")) {
      return;
    }
    try {
      const token = Cookies.get("token") || "";
      const { data } = await petMonitoringApi.get(
        `/auth/validate-token/${token}`,
      );
      if (data == true) {
        const { data } = await petMonitoringApi.get(`/species`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        dispatch({ type: "[Species] - getSpecies", payload: data });
      } else {
        Cookies.remove("token");
      }
    } catch (error) {
      Cookies.remove("token");
    }
  };

  const clearSpecies = () => {
    dispatch({ type: "[Species] - clearSpecies" });
  };

  return (
    <SpeciesContext.Provider
      value={{
        ...state,
        getSpecies,
        clearSpecies,
      }}
    >
      {children}
    </SpeciesContext.Provider>
  );
};
