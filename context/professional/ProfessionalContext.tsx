import { createContext } from "react";
import { IProfessional } from "../../interfaces";

interface ContextProps {
  professional?: IProfessional;

  isLoaded: boolean;

  getProfessional: (id: number) => void;

  addProfessional: (
    name: string,
    last_name: string,
    address: string,
    email: string,
    cell_phone: string,
    profession: number,
    pet: number,
    clearForm: () => void
  ) => Promise<{ isComplete: boolean }>;

  updateProfessional: (
    id: number,
    name: string,
    last_name: string,
    address: string,
    email: string,
    cell_phone: string,
    profession: number,
  ) => Promise<{ isComplete: boolean }>;

  deleteProfessional: (pet_id: number, professional_id: number) => Promise<{ isComplete: boolean }>;

  clearProfessional: () => void;

  sendEmail: (
    toEmail: string,
    fromEmail: string,
    subject: string,
    body: string,
  ) => Promise<{ isComplete: boolean }>;
}

export const ProfessionalContext = createContext({} as ContextProps);
