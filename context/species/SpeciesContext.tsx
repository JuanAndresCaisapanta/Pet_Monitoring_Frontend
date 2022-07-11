import { createContext } from "react";
import { ISpecies } from "../../interfaces";

interface ContextProps {
    species?: ISpecies
    lastSpecies?: ISpecies
    isLoaded?: boolean
    getSpecies: () => void
    getLastSpecies: () => void
    addSpecies: (
        name: string,
      ) => Promise<{ isComplete: boolean }>;
    clearSpecies: () => void
}

export const SpeciesContext = createContext({} as ContextProps);
