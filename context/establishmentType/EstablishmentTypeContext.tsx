import { createContext } from "react";
import { IEstablishmentType } from "../../interfaces";

interface ContextProps {
  establishmentType?: IEstablishmentType;
  isLoaded?: boolean;
  getEstablishmentType: () => void;
  clearEstablishmentType: () => void;
}

export const EstablishmentTypeContext = createContext({} as ContextProps);
