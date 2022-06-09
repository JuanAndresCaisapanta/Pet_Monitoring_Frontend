import { FC, ReactNode, useContext, useReducer } from "react";

import axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

import { ProfessionalContext, professionalReducer } from ".";
import { petMonitoringApi } from "../../api";
import { IProfessional } from "../../interfaces";
import { AuthContext } from "../auth";

export interface ProfessionalState {
  professional?: IProfessional;
  isLoaded: boolean;
}

const PROFESSIONAL_INITIAL_STATE: ProfessionalState = {
  professional: undefined,
  isLoaded: false,
};

interface Props {
  children: ReactNode;
}
export const ProfessionalProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(
    professionalReducer,
    PROFESSIONAL_INITIAL_STATE,
  );

  const { checkToken } = useContext(AuthContext);

  const getProfessional = async (id: number) => {
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
        const professional = await petMonitoringApi.get(`/professional/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        dispatch({
          type: "[Professional] - getProfessional",
          payload: professional.data,
        });
      } else {
        Cookies.remove("token");
      }
    } catch (error) {
      Cookies.remove("token");
    }
  };

  const addProfessional = async (
    name: string,
    last_name: string,
    address: string,
    email: string,
    cell_phone: string,
    profession: number,
    pet: number,
  ): Promise<{ hasError: boolean; message?: string }> => {
    try {
      const token = Cookies.get("token") || "";
      await petMonitoringApi.post(
        `/professional`,
        {
          name,
          last_name,
          address,
          email,
          cell_phone,
          profession: { id: profession },
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
        text: "Profesional Agregado",
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
        message: "No se pudo agregar al profesional - intente de nuevo",
      };
    }
  };

  const updateProfessional = async (
    id: number,
    name: string,
    last_name: string,
    address: string,
    email: string,
    cell_phone: string,
    profession: number,
  ): Promise<{ hasError: boolean; message?: string }> => {
    try {
      const token = Cookies.get("token") || "";
      await petMonitoringApi.put(
        `/professional/${id}`,
        {
          name,
          last_name,
          address,
          email,
          cell_phone,
          profession: { id: profession },
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
        text: "Professional Actualizado",
        icon: "success",
        confirmButtonText: "Ocultar",
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

  const deleteProfessional = async (
    id: number,
  ): Promise<{ hasError: boolean; message?: string }> => {
    try {
      const token = Cookies.get("token") || "";
      await petMonitoringApi.delete(`/professional/${id}`, {
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
        message: "No se pudo eliminar al profesional - intente de nuevo",
      };
    }
  };

  const clearProfessional = () => {
    dispatch({
      type: "[Professional] - clearProfessional",
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
        `/professional/email`,
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
    <ProfessionalContext.Provider
      value={{
        ...state,
        getProfessional,
        addProfessional,
        updateProfessional,
        deleteProfessional,
        clearProfessional,
        sendEmail,
      }}
    >
      {children}
    </ProfessionalContext.Provider>
  );
};
