import { createContext } from "react";

import { IEstablishment, IFullNames } from "../../interfaces";

interface ContextProps {
  establishment?: IEstablishment;
  establishmentsFullName?: IFullNames;
  isLoaded: boolean;

  getEstablishment: (establishment_id: number) => void;

  addEstablishment: (
    name: string,
    address: string,
    email: string,
    cell_phone: string,
    phone: string,
    establishmentType_id: number,
    pet_id: number,
    clearEstablishmentForm: () => void,
  ) => Promise<{ isComplete: boolean }>;

  updateEstablishment: (
    establishment_id: number,
    name: string,
    address: string,
    email: string,
    cell_phone: string,
    phone: string,
    establishmentType_id: number,
  ) => Promise<{ isComplete: boolean }>;

  deleteEstablishment: (pet_id: number, establishment_id: number) => Promise<{ isComplete: boolean }>;

  getEstablishmentsFullName: (
    user_id?: number,
  )=> Promise<{ isComplete: boolean }>;

  clearEstablishmentsFullName:() => void;

  clearEstablishment: () => void;

  sendEmailEstablishment: (
    to_email: string,
    from_email: string,
    subject: string,
    body: string,
  ) => Promise<{ isComplete: boolean }>;
}

export const EstablishmentContext = createContext({} as ContextProps);
