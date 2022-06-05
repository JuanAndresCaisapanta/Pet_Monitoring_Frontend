import { createContext } from "react";

interface ContextProps {
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
  ) => Promise<{ hasError: boolean; message?: string }>;
}

export const MedicineContext = createContext({} as ContextProps);
