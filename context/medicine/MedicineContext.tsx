import { createContext } from "react";
import { IMedicine } from "../../interfaces";

interface ContextProps {
  medicine?: IMedicine;

  loaded: boolean;

  getMedicine: (id: any) => void;

  addMedicine: (
    name: string,
    image: any,
    manufacturer: string,
    batch: number,
    applicator: string,
    description: string,
    production_date: string,
    expiration_date: string,
    application_date: string,
    typeMedicine: number,
    pet: number,
    clear_form: () => void,
  ) => Promise<{ isComplete: boolean }>;

  updateMedicine: (
    id: any,
    name: string,
    image: any,
    manufacturer: string,
    batch: number,
    applicator: string,
    description: string,
    production_date: string,
    expiration_date: string,
    application_date: string,
    typeMedicine: number,
  ) => Promise<{ isComplete: boolean }>;

  deleteMedicine: (pet_id: number, medicine_id: number) => Promise<{ isComplete: boolean }>;

  clearMedicine: () => void;
}

export const MedicineContext = createContext({} as ContextProps);
