import { FC, ReactNode, useContext, useReducer } from "react";

import axios from "axios";
import Cookies from "js-cookie";

import { petMonitoringApi } from "../../api";
import { UserContext, userReducer } from "./";
import { AuthContext } from "../auth/AuthContext";

export interface UserState {}

const USER_INITIAL_STATE: UserState = {};

interface Props {
  children: ReactNode;
}

export const UserProvider: FC<Props> = ({ children }) => {
  const { user, checkToken } = useContext(AuthContext);

  const [state, dispatch] = useReducer(userReducer, USER_INITIAL_STATE);
  const updateUser = async (
    name: string,
    last_name: string,
    email: string,
    address: string,
    phone: string,
    image: any
  ): Promise<{ hasError: boolean; message?: string }> => {
    try {
      const token = Cookies.get("token") || "";
      await petMonitoringApi.put(
        `/user/${user?.id}`,
        {
          name,
          last_name,
          email,
          address,
          phone,
          image,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      checkToken();
      return {
        hasError: false,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          hasError: true,
          message: error.message,
        };
      }
      return {
        hasError: true,
        message: "No se pudo actualizar el usuario - intente de nuevo",
      };
    }
  };
  return (
    <UserContext.Provider
      value={{
        ...state,
        updateUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
