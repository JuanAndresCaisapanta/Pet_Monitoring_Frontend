import { createContext } from "react";
import { IProfession } from '../../interfaces';

interface ContextProps {
    professions?:IProfession
    isLoaded?:boolean
    getProfessions: () => void
    clearProfessions: () => void
}

export const ProfessionContext = createContext({} as ContextProps);
