import { createContext } from "react";

import { IEstablishment } from "../../interfaces";

interface ContextProps {
  establishment?: IEstablishment;

  isLoaded: boolean;

  getEstablishment: (establishment_id: number) => void;

  addEstablishment: (
    name: string,
    address: string,
    email: string,
    cell_phone: string,
    phone: string,
    typeEstablishment_id: number,
    pet_id: number,
    clearForm: () => void,
  ) => Promise<{ isComplete: boolean }>;

  updateEstablishment: (
    establishment_id: number,
    name: string,
    address: string,
    email: string,
    cell_phone: string,
    phone: string,
    typeEstablishment_id: number,
  ) => Promise<{ isComplete: boolean }>;

  deleteEstablishment: (pet_id: number, establishment_id: number) => Promise<{ isComplete: boolean }>;

  clearEstablishment: () => void;

  sendEmail: (
    toEmail: string,
    fromEmail: string,
    subject: string,
    body: string,
  ) => Promise<{ isComplete: boolean }>;
}

export const EstablishmentContext = createContext({} as ContextProps);
