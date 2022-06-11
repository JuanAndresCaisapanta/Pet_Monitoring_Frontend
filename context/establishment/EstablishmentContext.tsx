import { createContext } from "react";
import { IEstablishment } from "../../interfaces";

interface ContextProps {
  establishment?: IEstablishment;

  isLoaded: boolean;

  getEstablishment: (id: number) => void;

  addEstablishment: (
    name: string,
    address: string,
    email: string,
    cell_phone: string,
    phone: string,
    typeEstablishment: number,
    pet: number,
  ) => Promise<{ hasError: boolean; message?: string }>;

  updateEstablishment: (
    id: number,
    name: string,
    address: string,
    email: string,
    cell_phone: string,
    phone: string,
    typeEstablishment: number,
  ) => Promise<{ hasError: boolean; message?: string }>;

  deleteEstablishment: (
    id: number,
  ) => Promise<{ hasError: boolean; message?: string }>;

  clearEstablishment: () => void;

  sendEmail: (
    toEmail: string,
    fromEmail: string,
    subject: string,
    body: string,
  ) => Promise<{ hasError: boolean; message?: string }>;
}

export const EstablishmentContext = createContext({} as ContextProps);
