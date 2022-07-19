import { createContext } from "react";
import { IUser } from "../../interfaces";

interface ContextProps {
  users?: IUser;
  user?: IUser;
  getUsers: () => void;
  updateUser: (
    name: string,
    last_name: string,
    email: string,
    address: string,
    phone: string,
    image: any,
  ) => Promise<{ isComplete: boolean }>;
  clearUsers: () => void;
}

export const UserContext = createContext({} as ContextProps);
