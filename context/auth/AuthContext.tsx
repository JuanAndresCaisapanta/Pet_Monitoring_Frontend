import { createContext } from "react";
import { IUser } from "../../interfaces";

interface ContextProps {
  isLoggedIn: boolean;
  user?: IUser;

  loginUser: (email: string, password: string) => Promise<{ isComplete: boolean }>;
  registerUser: (
    name: string,
    last_name: string,
    email: string,
    password: string,
    image: any,
  ) => Promise<{ isComplete: boolean }>;
  logout: () => void;
  checkToken: () => void;
}

export const AuthContext = createContext({} as ContextProps);
