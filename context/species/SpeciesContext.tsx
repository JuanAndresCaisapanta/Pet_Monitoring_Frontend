import { createContext } from "react";
import { ISpecies } from "../../interfaces";

interface ContextProps {
    species?: ISpecies
    isLoaded?: boolean
    getSpecies: () => void
    clearSpecies: () => void
}

export const SpeciesContext = createContext({} as ContextProps);
