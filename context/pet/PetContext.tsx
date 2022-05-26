import { createContext } from "react";
import { IPet } from "../../interfaces";

interface ContextProps {
    addPet: (
        name: string,
        color_main: string,
        color_secondary: string,
        weight: number,
        sex: string,
        sterilization: boolean,
        image: any,
        birth_date: string,
        creation_date: string,
        breed:number,
        users:number
      ) => Promise<{ hasError: boolean; message?: string }>;
}

export const PetContext = createContext({} as ContextProps);
