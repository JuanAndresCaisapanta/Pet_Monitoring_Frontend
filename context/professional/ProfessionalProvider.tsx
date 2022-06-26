import { FC, ReactNode, useContext, useReducer } from "react";

import axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

import { ProfessionalContext, professionalReducer } from ".";
import { petMonitoringApi } from "../../api";
import { IProfessional } from "../../interfaces";
import { AuthContext } from "../auth";
import { swalMessage } from "../../components";
import { PetContext } from "../pet";

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
  const [state, dispatch] = useReducer(professionalReducer, PROFESSIONAL_INITIAL_STATE);
  const { getPet } = useContext(PetContext);
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
      const { data } = await petMonitoringApi.get(`/auth/validate-token/${token}`);
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
    clearForm: () => void
  ): Promise<{ isComplete: boolean }> => {
    const token = Cookies.get("token") || "";
    return await petMonitoringApi
      .post(
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
      )
      .then(() => {
        checkToken();
        clearForm();
        swalMessage("Listo", "Profesional Agregado", "success");
        return { isComplete: true };
      })
      .catch(() => {
        swalMessage("Error", "No se pudo agregar al profesional - intente de nuevo", "error");
        return { isComplete: true };
      });
  };

  const updateProfessional = async (
    id: number,
    name: string,
    last_name: string,
    address: string,
    email: string,
    cell_phone: string,
    profession: number,
  ): Promise<{ isComplete: boolean }> => {
    const token = Cookies.get("token") || "";
    return await petMonitoringApi
      .put(
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
      )
      .then(() => {
        checkToken();
        getProfessional(id);
        swalMessage("Listo", "Profesional Actualizado", "success");
        return { isComplete: true };
      })
      .catch(() => {
        swalMessage("Error", "No se pudo actualizar al profesional - intente de nuevo", "error");
        return { isComplete: true };
      });
  };

  const deleteProfessional = async (pet_id: number, professional_id: number): Promise<{ isComplete: boolean }> => {
    const token = Cookies.get("token") || "";
    return Swal.fire({
      background: "#F4F5FA",
      title: "¿Está seguro de eliminar al profesional?",
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
            .delete(`/professional/${professional_id}`, {
              headers: { Authorization: `Bearer ${token}` },
            })
            .then(() => {
              checkToken();
              getPet(pet_id);
              swalMessage("Listo", "Profesional Eliminado", "success");
            })
            .catch(() => {
              swalMessage("Error", "No se pudo eliminar al profesional", "error");
            });
        }
        return { isComplete: true };
      })
      .catch(() => {
        return { isComplete: true };
      });
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
  ): Promise<{ isComplete: boolean }> => {
    const token = Cookies.get("token") || "";
    return await petMonitoringApi
      .post(
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
      )
      .then(() => {
        checkToken();
        swalMessage("Listo", "Correo Electrónico Enviado", "success");
        return { isComplete: true };
      })
      .catch(() => {
        swalMessage("Error", "No se pudo enviar el correo electrónico - intente de nuevo", "error");
        return { isComplete: true };
      });
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
