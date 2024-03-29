import { FC, ReactNode, useEffect, useReducer } from "react";

import { useRouter } from "next/router";

import Cookies from "js-cookie";
import jwt from "jsonwebtoken";

import { petMonitoringApi } from "../../api";
import { IUser } from "../../interfaces";
import { AuthContext, authReducer } from "./";
import { swalMessage } from "../../components";

export interface AuthState {
  isLoggedIn: boolean;
  user?: IUser;
}

const AUTH_INITIAL_STATE: AuthState = {
  isLoggedIn: false,
  user: undefined,
};

interface Props {
  children: ReactNode;
}

export const AuthProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);
  const router = useRouter();

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async (): Promise<{ isComplete: boolean }> => {
    if (!Cookies.get("token")) {
      return { isComplete: true };
    }
    const token = Cookies.get("token") || "";
    return await petMonitoringApi
      .get(`/auth/validate-token/${token}`)
      .then(async (validate) => {
        if (validate.data === true) {
          const { sub: email } = jwt.decode(token) as { sub: string };
          return await petMonitoringApi
            .get(`/user/${email}`, {
              headers: { Authorization: `Bearer ${token}` },
            })
            .then((user) => {
              dispatch({ type: "[Auth] - Login", payload: user.data });
              return { isComplete: true };
            })
            .catch(() => {
              Cookies.remove("token");
              return { isComplete: true };
            });
        }
        return { isComplete: true };
      })
      .catch(() => {
        Cookies.remove("token");
        return { isComplete: true };
      });
  };

  const login = async (email: string, password: string): Promise<{ isComplete: boolean }> => {
    return await petMonitoringApi
      .post("/auth/login", {
        email,
        password,
      })
      .then((response) => {
        if (response.data.authorities[0].authority === "Admin") {
          Cookies.set("token", response.data.token);
          checkToken();
          router.replace("/admin", undefined, { shallow: true });
          swalMessage("Bienvenido", "Ingreso realizado con éxito", "success");
        } else if (response.data.authorities[0].authority === "User") {
          Cookies.set("token", response.data.token);
          checkToken();
          router.replace("/users", undefined, { shallow: true });
          swalMessage("Bienvenido", "Ingreso realizado con éxito", "success");
        } else {
          swalMessage("Error", "Error al ingresar - verifique la información proporcionada", "error");
          router.replace("/auth/login", undefined, { shallow: true });
        }
        return { isComplete: true };
      })
      .catch(() => {
        swalMessage("Error", "Error al ingresar - verifique la información proporcionada", "error");
        return { isComplete: true };
      });
  };

  const register = async (
    name: string,
    last_name: string,
    email: string,
    phone: string,
    password: string,
    image: any,
  ): Promise<{ isComplete: boolean }> => {
    return await petMonitoringApi
      .post(
        "/auth/register",
        {
          name: name,
          last_name: last_name,
          email: email,
          phone: phone,
          password: password,
          image: image,
        },
        { headers: { "Content-Type": "multipart/form-data" } },
      )
      .then((response) => {
        const { token, user } = response.data;
        Cookies.set("token", token);
        dispatch({ type: "[Auth] - Login", payload: user });
        swalMessage("Listo", "Registro realizado con éxito", "success");
        return { isComplete: true };
      })
      .catch(() => {
        swalMessage("Error", "Error al registrarse - verifique la información proporcionada", "error");
        return { isComplete: true };
      });
  };

  const forgetPassword = async (email: string, router: any): Promise<{ isComplete: boolean }> => {
    return await petMonitoringApi
      .get(`/auth/forget-password/${email}`)
      .then(() => {
        swalMessage("Listo", "Se ha enviado un correo con su nueva contraseña", "success");
        router.replace("/auth/login");
        return { isComplete: true };
      })
      .catch(() => {
        swalMessage("Error", "Error al enviar el correo - verifique la información proporcionada", "error");
        return { isComplete: true };
      });
  };

  const logout = () => {
    router.reload();
    Cookies.remove("token");
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        forgetPassword,
        logout,
        checkToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
