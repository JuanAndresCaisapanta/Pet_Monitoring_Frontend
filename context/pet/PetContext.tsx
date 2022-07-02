import { createContext } from "react";

import { IPet, IPets } from "../../interfaces";

interface ContextProps {
  isLoaded: boolean;

  pet?: IPet;

  pets?: IPets;

  getPet: (id: any) => void;

  petChange: () => void;

  addPet: (
    name: string,
    color_main: string,
    color_secondary: string,
    weight: number,
    sex: string,
    sterilization: boolean,
    image: any,
    birth_date: string,
    breed: number,
    users: number,
    clear: () => void,
  ) => Promise<{ isComplete: boolean }>;

  updatePet: (
    id: number,
    name: string,
    color_main: string,
    color_secondary: string,
    weight: number,
    sex: string,
    sterilization: boolean,
    image: any,
    birth_date: string,
    breed: number,
  ) => Promise<{ isComplete: boolean }>;

  deletePet: (name?:string,user_id?:number,id?: number) => Promise<{ isComplete: boolean }>;

  getPetsEstablishment: (text: string, user_id: number) => Promise<{ isComplete: boolean }>;

  clearPetsEstablishment: () => void;
}

export const PetContext = createContext({} as ContextProps);
