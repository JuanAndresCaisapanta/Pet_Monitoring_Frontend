import { createContext } from "react";
import { IUser, IUsers } from "../../interfaces";

interface ContextProps {
  users?: IUsers;
  user?: IUser;

  getUsers: () => void;

  getUser: (user_id: number) => void;

  addUser: (
    name: string,
    last_name: string,
    email: string,
    password: string,
    address: string,
    phone: string,
    image: any,
    clearUserForm: () => void,
  ) => Promise<{ isComplete: boolean }>;

  updateUser: (
    user_id: number,
    name: string,
    last_name: string,
    email: string,
    address: string,
    phone: string,
    image: any,
  ) => Promise<{ isComplete: boolean }>;

  deleteUser: (user_id: number, getUsers: any, router: any) => Promise<{ isComplete: boolean }>;

  updatePassword: (
    user_id: number,
    new_password: string,
    confirm_new_password: string,
    clearForm: () => void,
  ) => Promise<{ isComplete: boolean }>;

  clearUsers: () => void;

  clearUser: () => void;
}

export const UserContext = createContext({} as ContextProps);
