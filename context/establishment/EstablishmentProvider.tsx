import axios from "axios";
import Cookies from "js-cookie";
import { FC, ReactNode, useContext, useReducer } from "react";
import Swal from "sweetalert2";
import { petMonitoringApi } from "../../api";
import { IEstablishment } from "../../interfaces";
import { AuthContext } from "../auth";
import { EstablishmentContext, establishmentReducer } from "./";

export interface EstablishmentState {
  establishment?: IEstablishment;
  isLoaded: boolean;
}

const ESTABLISHMENT_INITIAL_STATE: EstablishmentState = {
  establishment: undefined,
  isLoaded: false,
};

interface Props {
  children: ReactNode;
}
export const EstablishmentProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(
    establishmentReducer,
    ESTABLISHMENT_INITIAL_STATE,
  );
  const { checkToken } = useContext(AuthContext);

  const getEstablishment = async (id: number) => {
    if (!Cookies.get("token")) {
      return;
    }
    if (id === undefined) {
      return;
    }
    try {
      const token = Cookies.get("token") || "";
      const { data } = await petMonitoringApi.get(
        `/auth/validate-token/${token}`,
      );
      if (data == true) {
        const establishment = await petMonitoringApi.get(
          `/establishment/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        dispatch({
          type: "[Establishment] - getEstablishment",
          payload: establishment.data,
        });
      } else {
        Cookies.remove("token");
      }
    } catch (error) {
      Cookies.remove("token");
    }
  };

  const addEstablishment = async (
    name: string,
    address: string,
    email: string,
    cell_phone: string,
    phone: string,
    typeEstablishment: number,
    pet: number,
  ): Promise<{ hasError: boolean; message?: string }> => {
    try {
      const token = Cookies.get("token") || "";
      await petMonitoringApi.post(
        `/establishment`,
        {
          name,
          address,
          email,
          cell_phone,
          phone,
          typeEstablishment: { id: typeEstablishment },
          pet: { id: pet },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      checkToken();
      Swal.fire({
        background: "#F4F5FA",
        title: "Listo",
        text: "Establecimiento Agregado",
        icon: "success",
        backdrop: false,
        timer: 1500,
        timerProgressBar: true,
        showConfirmButton: false,
      });
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
        message: "No se pudo agregar el establecimiento - intente de nuevo",
      };
    }
  };

  const updateEstablishment = async (
    id: number,
    name: string,
    address: string,
    email: string,
    cell_phone: string,
    phone: string,
    typeEstablishment: number,
  ): Promise<{ hasError: boolean; message?: string }> => {
    try {
      const token = Cookies.get("token") || "";
      await petMonitoringApi.put(
        `/establishment/${id}`,
        {
          name,
          address,
          email,
          cell_phone,
          phone,
          typeEstablishment: { id: typeEstablishment },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      checkToken();
      Swal.fire({
        background: "#F4F5FA",
        title: "Listo",
        text: "Establecimiento Actualizado",
        icon: "success",
        backdrop: false,
        timer: 1500,
        timerProgressBar: true,
        showConfirmButton: false,
      });
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
        message: "No se pudo actualizar al profesional - intente de nuevo",
      };
    }
  };

  const deleteEstablishment = async (
    id: number,
  ): Promise<{ hasError: boolean; message?: string }> => {
    try {
      const token = Cookies.get("token") || "";
      await petMonitoringApi.delete(`/establishment/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
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
        message: "No se pudo eliminar el establecimiento - intente de nuevo",
      };
    }
  };

  const clearEstablishment = () => {
    dispatch({
      type: "[Establishment] - clearEstablishment",
    });
  };

  const sendEmail = async (
    toEmail: string,
    fromEmail: string,
    subject: string,
    body: string,
  ): Promise<{ hasError: boolean; message?: string }> => {
    try {
      const token = Cookies.get("token") || "";
      await petMonitoringApi.post(
        `/establishment/email`,
        {
          toEmail,
          fromEmail,
          subject,
          body,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      checkToken();
      Swal.fire({
        background: "#F4F5FA",
        title: "Listo",
        text: "Correo Electrónico Enviado",
        icon: "success",
        backdrop: false,
        timer: 1500,
        timerProgressBar: true,
        showConfirmButton: false,
      });
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
        message: "No se pudo enviar el correo electrónico - intente de nuevo",
      };
    }
  };
  return (
    <EstablishmentContext.Provider
      value={{
        ...state,
        getEstablishment,
        addEstablishment,
        updateEstablishment,
        deleteEstablishment,
        clearEstablishment,
        sendEmail,
      }}
    >
      {children}
    </EstablishmentContext.Provider>
  );
};
