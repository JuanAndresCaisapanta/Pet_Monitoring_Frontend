import { createContext } from "react";
import { IEstablishmentType } from "../../interfaces";

interface ContextProps {
  establishmentType?: IEstablishmentType;
  isLoaded?: boolean;
  getEstablishmentTypes: () => void;
  addEstablishmentType: (name: string) => Promise<{ isComplete: boolean }>;
  updateEstablishmentType: (establishmentType_id: number, name: string) => Promise<{ isComplete: boolean }>;
  deleteEstablishmentType: (establishmentType_id: number) => Promise<{ isComplete: boolean }>;
  clearEstablishmentType: () => void;
}

export const EstablishmentTypeContext = createContext({} as ContextProps);
