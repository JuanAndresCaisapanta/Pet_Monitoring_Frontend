import { createContext } from "react";
import { IUser } from "../../interfaces";

interface ContextProps {
  isLoggedIn: boolean;
  user?: IUser;

  loginUser: (email: string, password: string) => Promise<boolean>;
  registerUser: (
    name: string,
    last_name: string,
    email: string,
    password: string,
    creation_date: string,
    image: any,
  ) => Promise<{ hasError: boolean; message?: string }>;
  logout: () => void;
  checkToken: () => void;
}

export const AuthContext = createContext({} as ContextProps);
