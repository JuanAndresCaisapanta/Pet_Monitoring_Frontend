import { createContext } from "react";

interface ContextProps {
  updateUser: (
    name: string,
    last_name: string,
    email: string,
    address: string,
    phone: string,
    image: any,
  ) => Promise<{ isComplete: boolean }>;
}

export const UserContext = createContext({} as ContextProps);
