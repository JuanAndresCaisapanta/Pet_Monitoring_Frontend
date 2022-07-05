import { createContext } from "react";

import { IBreed } from "../../interfaces";

interface ContextProps {
  breeds?: IBreed;
  isLoaded?: boolean;
  getBreeds: (species_id: number) => void;
  clearBreeds: () => void;
}

export const BreedContext = createContext({} as ContextProps);
