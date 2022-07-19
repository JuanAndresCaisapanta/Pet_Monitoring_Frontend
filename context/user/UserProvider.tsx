import { FC, ReactNode, useContext, useReducer } from "react";

import axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

import { petMonitoringApi } from "../../api";
import { UserContext, userReducer } from "./";
import { AuthContext } from "../auth/AuthContext";
import { swalMessage } from "../../components/ui/utils/swalMessage";
import { IUser } from "../../interfaces";

export interface UserState {
  users?: IUser;
  user?: IUser;
}

const USER_INITIAL_STATE: UserState = {
  users: undefined,
  user: undefined
};

interface Props {
  children: ReactNode;
}

export const UserProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, USER_INITIAL_STATE);

  const { user, checkToken } = useContext(AuthContext);

  const getUsers= async () => {
    if (!Cookies.get("token")) {
      return;
    }
    try {
      const token = Cookies.get("token") || "";
      const { data } = await petMonitoringApi.get(`/auth/validate-token/${token}`);
      if (data == true) {
        const users = await petMonitoringApi.get(`/user`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        dispatch({
          type: "[User] - getUsers",
          payload: users.data,
        });
      } else {
        Cookies.remove("token");
      }
    } catch (error) {
      Cookies.remove("token");
    }
  };


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

  const clearUsers= () => {
    dispatch({
      type: "[User] - clearUsers"
    });
  }
  return (
    <UserContext.Provider
      value={{
        ...state,
        getUsers,
        updateUser,
        clearUsers,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
