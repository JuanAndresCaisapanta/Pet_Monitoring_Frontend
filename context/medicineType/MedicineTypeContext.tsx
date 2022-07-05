import { createContext } from "react";
import { IMedicineType } from "../../interfaces";

interface ContextProps {
    medicineType?: IMedicineType
    getMedicineType: () => void
}

export const MedicineTypeContext = createContext({} as ContextProps);
