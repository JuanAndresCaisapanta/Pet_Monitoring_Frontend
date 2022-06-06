import { createContext } from "react";
import { ITypeMedicine } from "../../interfaces";

interface ContextProps {
    typeMedicine?: ITypeMedicine
}

export const TypeMedicineContext = createContext({} as ContextProps);
