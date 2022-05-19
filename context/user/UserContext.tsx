import { createContext } from "react";

interface ContextProps {
  updateUser: (
    name: string,
    last_name: string,
    email: string,
    address: string,
    phone: string,
    image: any
  ) => Promise<{ hasError: boolean; message?: string }>;
}

export const UserContext = createContext({} as ContextProps);
