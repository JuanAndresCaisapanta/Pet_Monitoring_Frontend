import { createContext } from "react";
import { ITypeMedicine } from "../../interfaces";

interface ContextProps {
    typeMedicine?: ITypeMedicine
    getTypeMedicine: () => void
}

export const TypeMedicineContext = createContext({} as ContextProps);
