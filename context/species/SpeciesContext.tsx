import { createContext } from "react";
import { ISpecies } from "../../interfaces";

interface ContextProps {
  species?: ISpecies;
  lastSpecies?: ISpecies;
  isLoaded?: boolean;
  getSpecies: () => void;
  addSpecies: (name: string) => Promise<{ isComplete: boolean }>;
  updateSpecies: (species_id: number, name: string) => Promise<{ isComplete: boolean }>;
  deleteSpecies: (species_id: number) => Promise<{ isComplete: boolean }>;
  clearSpecies: () => void;
}

export const SpeciesContext = createContext({} as ContextProps);
