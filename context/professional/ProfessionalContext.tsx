import { createContext } from "react";
import { IProfessional, IProfessionals } from "../../interfaces";
import { IFullNames } from "../../interfaces/fullName";

interface ContextProps {
  professional?: IProfessional;

  professionals?: IProfessionals

  professionalsFullName?: IFullNames;

  isLoaded: boolean;

  getProfessional: (professional_id: number) => void;

  getProfessionals: () => void;

  addProfessional: (
    name: string,
    last_name: string,
    address: string,
    email: string,
    cell_phone: string,
    profession_id: number,
    pet_id: number,
    clearProfessionalForm: () => void,
  ) => Promise<{ isComplete: boolean }>;

  updateProfessional: (
    professional_id: number,
    name: string,
    last_name: string,
    address: string,
    email: string,
    cell_phone: string,
    profession_id: number,
  ) => Promise<{ isComplete: boolean }>;

  deleteProfessional: (pet_id: number, professional_id: number) => Promise<{ isComplete: boolean }>;

  clearProfessional: () => void;

  clearProfessionals: () => void;

  sendEmailProfessional: (
    to_email: string,
    from_email: string,
    subject: string,
    body: string,
  ) => Promise<{ isComplete: boolean }>;

  getProfessionalsFullName: (user_id?: number) => Promise<{ isComplete: boolean }>;

  clearProfessionalsFullName: () => void;
}

export const ProfessionalContext = createContext({} as ContextProps);
