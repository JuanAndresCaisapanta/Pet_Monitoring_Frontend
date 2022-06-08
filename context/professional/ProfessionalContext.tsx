import { createContext } from "react";
import { IProfessional } from "../../interfaces";

interface ContextProps {
  professional?: IProfessional;

  loaded: boolean;

  getProfessional: (id: number) => void;

  addProfessional: (
    name: string,
    last_name: string,
    address: string,
    email: string,
    cell_phone: string,
    profession: number,
    pet: number,
  ) => Promise<{ hasError: boolean; message?: string }>;

  updateProfessional: (
    id: number,
    name: string,
    last_name: string,
    address: string,
    email: string,
    cell_phone: string,
    profession: number,
  ) => Promise<{ hasError: boolean; message?: string }>;

  deleteProfessional: (
    id: number,
  ) => Promise<{ hasError: boolean; message?: string }>;
}

export const ProfessionalContext = createContext({} as ContextProps);
