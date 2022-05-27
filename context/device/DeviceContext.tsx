import { createContext } from "react";

interface ContextProps {
    addCallback: (code: string, pet: number) => Promise<{ hasError: boolean; message?: string }>;
}

export const DeviceContext = createContext({} as ContextProps);
