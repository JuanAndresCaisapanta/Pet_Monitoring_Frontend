import { createContext } from "react";
import { ISpecies } from "../../interfaces";

interface ContextProps {
    species?: ISpecies
    getSpecies: () => void
}

export const SpeciesContext = createContext({} as ContextProps);
