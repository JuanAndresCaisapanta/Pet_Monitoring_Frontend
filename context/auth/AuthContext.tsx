import { createContext } from "react";
import { IUser } from "../../interfaces";

interface ContextProps {
  isLoggedIn: boolean;
  user?: IUser;

  login: (email: string, password: string) => Promise<{ isComplete: boolean }>;
  register: (
    name: string,
    last_name: string,
    email: string,
    password: string,
    image: any,
  ) => Promise<{ isComplete: boolean }>;
    forgetPassword: (email: string) => Promise<{ isComplete: boolean }>;
  logout: () => void;
  checkToken: () => void;
}

export const AuthContext = createContext({} as ContextProps);
