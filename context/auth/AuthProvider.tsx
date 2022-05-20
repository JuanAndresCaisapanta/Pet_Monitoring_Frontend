import { FC, ReactNode, useEffect, useReducer } from "react";
import { useRouter } from "next/router";

import Cookies from "js-cookie";
import axios from "axios";
import jwt from "jsonwebtoken";

import { petMonitoringApi } from "../../api";
import { IUser } from "../../interfaces";
import { AuthContext, authReducer } from "./";

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

  const checkToken = async () => {
    if (!Cookies.get("token")) {
      return;
    }
    try {
      const token = Cookies.get("token") || "";
      const { data } = await petMonitoringApi.get(
        `/auth/validate-token/${token}`
      );
      if (data == true) {
        const { sub: email } = jwt.decode(token) as { sub: string };
        const { data } = await petMonitoringApi.get(`/user/${email}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        dispatch({ type: "[Auth] - Login", payload: data });
      } else {
        Cookies.remove("token");
      }
    } catch (error) {
      Cookies.remove("token");
    }
  };

  const loginUser = async (
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      const { data } = await petMonitoringApi.post("/auth/login", {
        email,
        password,
      });
      const { token } = data;
      Cookies.set("token", token);
      checkToken();
      return true;
    } catch (error) {
      return false;
    }
  };

  const registerUser = async (
    name: string,
    last_name: string,
    email: string,
    password: string,
    creation_date: string,
    image: any
  ): Promise<{ hasError: boolean; message?: string }> => {
    try {
      const { data } = await petMonitoringApi.post(
        "/auth/register",
        {
          name,
          last_name,
          email,
          password,
          creation_date,
          image,
        },
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      const { token, user } = data;
      Cookies.set("token", token);
      dispatch({ type: "[Auth] - Login", payload: user });
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
        message: "No se pudo crear el usuario - intente de nuevo",
      };
    }
  };

  const logout = () => {
    router.reload();
    Cookies.remove("token");
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        loginUser,
        registerUser,
        logout,
        checkToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
