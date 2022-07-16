import { createContext } from "react";
import { IMedicineType } from "../../interfaces";

interface ContextProps {
  medicineType?: IMedicineType;
  getMedicineType: () => void;
  addMedicineType: (name: string) => Promise<{ isComplete: boolean }>;
  updateMedicineType: (medicineType_id: number, name: string) => Promise<{ isComplete: boolean }>;
  deleteMedicineType: (medicineType_id: number) => Promise<{ isComplete: boolean }>;
}

export const MedicineTypeContext = createContext({} as ContextProps);
