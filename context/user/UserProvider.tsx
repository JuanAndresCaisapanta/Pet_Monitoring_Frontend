import { FC, ReactNode, useContext, useReducer } from "react";

import axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

import { petMonitoringApi } from "../../api";
import { UserContext, userReducer } from "./";
import { AuthContext } from "../auth/AuthContext";
import { swalMessage } from "../../components/ui/utils/swalMessage";

export interface UserState {}

const USER_INITIAL_STATE: UserState = {};

interface Props {
  children: ReactNode;
}

export const UserProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, USER_INITIAL_STATE);

  const { user, checkToken } = useContext(AuthContext);

  const updateUser = async (
    name: string,
    last_name: string,
    email: string,
    address: string,
    phone: string,
    image: any,
  ): Promise<{isComplete:boolean;}> => {
    const token = Cookies.get("token") || "";
    return await petMonitoringApi
      .put(
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
        },
      )
      .then(() => {
        checkToken();
        swalMessage("Listo", "Perfil Actualizado", "success");
        return {isComplete: true};
      })
      .catch(() => {
        swalMessage("Error", "No se pudo actualizar el perfil", "error");
        return {isComplete: true};
      });
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
