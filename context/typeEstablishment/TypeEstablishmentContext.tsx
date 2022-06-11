import { createContext } from "react";
import { ITypeEstablishment } from "../../interfaces";

interface ContextProps {
  typeEstablishments?: ITypeEstablishment;
  isLoaded?: boolean;
  getTypeEstablishments: () => void;
  clearTypeEstablishments: () => void;
}

export const TypeEstablishmentContext = createContext({} as ContextProps);
