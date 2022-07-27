import { FC, ReactNode, useContext, useReducer } from "react";

import Cookies from "js-cookie";
import Swal from "sweetalert2";

import { ProfessionalContext, professionalReducer } from ".";
import { petMonitoringApi } from "../../api";
import { IProfessional, IFullNames, IProfessionals } from "../../interfaces";
import { AuthContext } from "../auth";
import { swalMessage } from "../../components";
import { PetContext } from "../pet";

export interface ProfessionalState {
  professional?: IProfessional;
  professionals?: IProfessionals;
  professionalsFullName?: IFullNames;
  isLoaded: boolean;
}

const PROFESSIONAL_INITIAL_STATE: ProfessionalState = {
  professional: undefined,
  professionals: undefined,
  professionalsFullName: undefined,
  isLoaded: false,
};

interface Props {
  children: ReactNode;
}
export const ProfessionalProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(professionalReducer, PROFESSIONAL_INITIAL_STATE);
  const { getPet } = useContext(PetContext);
  const { checkToken } = useContext(AuthContext);

  const getProfessional = async (professional_id: number) => {
    if (!Cookies.get("token")) {
      return;
    }
    if (professional_id === undefined) {
      return;
    }
    try {
      const token = Cookies.get("token") || "";
      const { data } = await petMonitoringApi.get(`/auth/validate-token/${token}`);
      if (data == true) {
        const professional = await petMonitoringApi.get(`/professional/${professional_id}`, {
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

  const getProfessionals = async () => {
    if (!Cookies.get("token")) {
      return;
    }
    try {
      const token = Cookies.get("token") || "";
      const { data } = await petMonitoringApi.get(`/auth/validate-token/${token}`);
      if (data == true) {
        const professionals = await petMonitoringApi.get(`/professional`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        dispatch({
          type: "[Professional] - getProfessionals",
          payload: professionals.data,
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
    profession_id: number,
    pet_id: number,
    clearProfessionalForm: () => void,
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
          profession: { id: profession_id },
          pet: { id: pet_id },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(() => {
        checkToken();
        clearProfessionalForm();
        swalMessage("Listo", "Profesional Agregado", "success");
        return { isComplete: true };
      })
      .catch(() => {
        swalMessage("Error", "No se pudo agregar al profesional - intente de nuevo", "error");
        return { isComplete: true };
      });
  };

  const updateProfessional = async (
    professional_id: number,
    name: string,
    last_name: string,
    address: string,
    email: string,
    cell_phone: string,
    profession_id: number,
  ): Promise<{ isComplete: boolean }> => {
    const token = Cookies.get("token") || "";
    return await petMonitoringApi
      .put(
        `/professional/${professional_id}`,
        {
          name,
          last_name,
          address,
          email,
          cell_phone,
          profession: { id: profession_id },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(() => {
        checkToken();
        getProfessional(professional_id);
        swalMessage("Listo", "Profesional Actualizado", "success");
        return { isComplete: true };
      })
      .catch(() => {
        swalMessage("Error", "No se pudo actualizar al profesional - intente de nuevo", "error");
        return { isComplete: true };
      });
  };

  const deleteProfessional = async (pet_id?: number, professional_id?: number, router?:any): Promise<{ isComplete: boolean }> => {
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
              getPet(pet_id!);
              if(router){
              router.push("/admin/professionals");
              }
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

  const clearProfessionals = () => {
    dispatch({
      type: "[Professional] - clearProfessionals",
    });
  }

  const getProfessionalsFullName = async (
    user_id?: number,
  ): Promise<{ isComplete: boolean }> => {
    if (!Cookies.get("token")) {
      return { isComplete: true };
    }
    if (user_id === undefined) {
      return { isComplete: true };
    }
    const token = Cookies.get("token") || "";
    return await petMonitoringApi
      .get(`/auth/validate-token/${token}`)
      .then(async (validation) => {
        if (validation.data == true) {
          await petMonitoringApi
            .get(`/professional/pets/user/${user_id}`, {
              headers: { Authorization: `Bearer ${token}` },
            })
            .then((professionalsFullName) => {
              dispatch({ type: "[Professional] - getProfessionalsFullName", payload: professionalsFullName.data });
            })
            .catch(() => {
              Cookies.remove("token");
            });
        }
        return { isComplete: true };
      })
      .catch(() => {
        Cookies.remove("token");
        return { isComplete: true };
      });
  };

  const clearProfessionalsFullName = () => {
    dispatch({
      type: "[Professional] - clearProfessionalsFullName",
    });
  }
  const sendEmailProfessional = async (
    to_email: string,
    from_email: string,
    subject: string,
    body: string,
  ): Promise<{ isComplete: boolean }> => {
    const token = Cookies.get("token") || "";
    return await petMonitoringApi
      .post(
        `/professional/emailProfessional`,
        {
          to_email,
          from_email,
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
        getProfessionals,
        addProfessional,
        updateProfessional,
        deleteProfessional,
        clearProfessional,
        sendEmailProfessional,
        getProfessionalsFullName,
        clearProfessionals,
        clearProfessionalsFullName
      }}
    >
      {children}
    </ProfessionalContext.Provider>
  );
};
