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
  user: undefined,
};

interface Props {
  children: ReactNode;
}

export const UserProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, USER_INITIAL_STATE);

  const { user, checkToken } = useContext(AuthContext);

  const getUsers = async () => {
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

  const getUser = async (user_id: number) => {
    if (!Cookies.get("token")) {
      return;
    }
    if (user_id === undefined) {
      return;
    }
    try {
      const token = Cookies.get("token") || "";
      const { data } = await petMonitoringApi.get(`/auth/validate-token/${token}`);
      if (data == true) {
        const user = await petMonitoringApi.get(`/user/id/${user_id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        dispatch({
          type: "[User] - getUser",
          payload: user.data,
        });
      } else {
        Cookies.remove("token");
      }
    } catch (error) {
      Cookies.remove("token");
    }
  };

  const addUser = async (
    name: string,
    last_name: string,
    email: string,
    password: string,
    address: string,
    phone: string,
    image: any,
    clearUserForm: () => void,
  ): Promise<{ isComplete: boolean }> => {
    return await petMonitoringApi
      .post(
        "/auth/register",
        {
          name,
          last_name,
          email,
          password,
          address,
          phone,
          image,
        },
        { headers: { "Content-Type": "multipart/form-data" } },
      )
      .then(() => {
        checkToken();
        swalMessage("Listo", "Usuario Agregado", "success");
        clearUserForm();
        return { isComplete: true };
      })
      .catch(() => {
        swalMessage("Error", "No se pudo agregar al usuario  - intente de nuevo", "error");
        return { isComplete: true };
      });
  };

  const updateUser = async (
    user_id: number,
    name: string,
    last_name: string,
    email: string,
    address: string,
    phone: string,
    image: any,
  ): Promise<{ isComplete: boolean }> => {
    const token = Cookies.get("token") || "";
    return await petMonitoringApi
      .put(
        `/user/${user_id}`,
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
        return { isComplete: true };
      })
      .catch(() => {
        swalMessage("Error", "No se pudo actualizar el perfil", "error");
        return { isComplete: true };
      });
  };

  const deleteUser = async (user_id: number, getUsers: any, router: any): Promise<{ isComplete: boolean }> => {
    const token = Cookies.get("token") || "";
    return Swal.fire({
      background: "#F4F5FA",
      title: "¿Está seguro de eliminar al Usuario?",
      text: "No podrá revertir esta acción",
      icon: "warning",
      showCancelButton: true,
      backdrop: false,
      confirmButtonColor: "#9E69FD",
      cancelButtonColor: "#9C9FA4",
      confirmButtonText: "Si, Eliminar",
    })
      .then(async (result) => {
        if (result.isConfirmed) {
          await petMonitoringApi
            .delete(`/user/${user_id}`, {
              headers: { Authorization: `Bearer ${token}` },
            })
            .then(() => {
              checkToken();
              swalMessage("Listo", "Usuario Eliminado", "success");
              getUsers();
              router.push("/admin/users");
            })
            .catch(() => {
              swalMessage("Error", "No se pudo eliminar al usuario", "error");
            });
        }
        return { isComplete: true };
      })
      .catch(() => {
        return { isComplete: true };
      });
  };

  const clearUsers = () => {
    dispatch({
      type: "[User] - clearUsers",
    });
  };
  const clearUser = () => {
    dispatch({
      type: "[User] - clearUser",
    });
  };
  return (
    <UserContext.Provider
      value={{
        ...state,
        getUsers,
        getUser,
        addUser,
        updateUser,
        deleteUser,
        clearUsers,
        clearUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
