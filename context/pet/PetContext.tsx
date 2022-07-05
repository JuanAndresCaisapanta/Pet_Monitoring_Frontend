import { createContext } from "react";

import { IPet, IPets } from "../../interfaces";

interface ContextProps {
  isLoaded: boolean;

  pet?: IPet;

  pets?: IPets;

  getPet: (pet_id: number) => void;

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
    clearPetForm: () => void,
  ) => Promise<{ isComplete: boolean }>;

  updatePet: (
    pet_id: number,
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

  deletePet: (
    type_id?: number,
    fullName?: string,
    user_id?: number,
    pet_id?: number,
  ) => Promise<{ isComplete: boolean }>;

  getPetsEstablishment: (
    establishmentType_id?: number,
    establishment_fullName?: string,
    user_id?: number,
  ) => Promise<{ isComplete: boolean }>;

  getPetsMedicine: (
    medicineType_id?: number,
    medicine_fullName?: string,
    user_id?: number,
  ) => Promise<{ isComplete: boolean }>;

  getPetsProfessional: (
    profession_id?: number,
    professional_fullName?: string,
    user_id?: number,
  ) => Promise<{ isComplete: boolean }>;

  clearPets: () => void;
}

export const PetContext = createContext({} as ContextProps);
