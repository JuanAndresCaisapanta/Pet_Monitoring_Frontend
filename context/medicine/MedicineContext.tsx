import { createContext } from "react";
import { IFullNames, IMedicine } from "../../interfaces";

interface ContextProps {
  medicine?: IMedicine;
  medicinesFullName?: IFullNames;
  isLoaded: boolean;

  getMedicine: (medicine_id: any) => void;

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
    medicineType_id: number,
    pet_id: number,
    clearMedicineForm: () => void,
  ) => Promise<{ isComplete: boolean }>;

  updateMedicine: (
    medicine_id: any,
    name: string,
    image: any,
    manufacturer: string,
    batch: number,
    applicator: string,
    description: string,
    production_date: string,
    expiration_date: string,
    application_date: string,
    medicineType_id: number,
  ) => Promise<{ isComplete: boolean }>;

  deleteMedicine: (pet_id: number, medicine_id: number) => Promise<{ isComplete: boolean }>;

  clearMedicine: () => void;

  getMedicinesFullName: (user_id?: number) => Promise<{ isComplete: boolean }>;

  clearMedicinesFullName: () => void;
}

export const MedicineContext = createContext({} as ContextProps);
