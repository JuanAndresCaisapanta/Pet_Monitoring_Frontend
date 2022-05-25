import { createContext } from "react";
import { IBreed } from "../../interfaces";

interface ContextProps {
  breed?: IBreed;
  getBreed: (id: number) => void;
}

export const BreedContext = createContext({} as ContextProps);
