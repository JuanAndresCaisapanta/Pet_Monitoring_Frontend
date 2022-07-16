import { createContext } from "react";

import { IBreed } from "../../interfaces";

interface ContextProps {
  breeds?: IBreed;
  isLoaded?: boolean;
  getBreedsBySpecies: (species_id: number) => void;
  getBreeds: () => void;
  addBreed: (name: string, species_id: any) => Promise<{ isComplete: boolean }>;
  updateBreed: (breed_id: any,name: string, species_id: any) => Promise<{ isComplete: boolean }>;
  deleteBreed: (breed_id: number) => Promise<{ isComplete: boolean }>;
  clearBreeds: () => void;
}

export const BreedContext = createContext({} as ContextProps);
