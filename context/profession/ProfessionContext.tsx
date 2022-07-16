import { createContext } from "react";
import { IProfession } from "../../interfaces";

interface ContextProps {
  professions?: IProfession;
  isLoaded?: boolean;
  getProfessions: () => void;
  addProfession: (name: string) => Promise<{ isComplete: boolean }>;
  updateProfession: (profession_id: number, name: string) => Promise<{ isComplete: boolean }>;
  deleteProfession: (profession_id: number) => Promise<{ isComplete: boolean }>;
  clearProfessions: () => void;
}

export const ProfessionContext = createContext({} as ContextProps);
