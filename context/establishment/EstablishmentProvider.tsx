import { FC, ReactNode, useContext, useReducer } from "react";

import Cookies from "js-cookie";
import Swal from "sweetalert2";

import { petMonitoringApi } from "../../api";
import { swalMessage } from "../../components";
import { IEstablishment, IFullNames } from "../../interfaces";
import { AuthContext } from "../auth";
import { PetContext } from "../pet";
import { EstablishmentContext, establishmentReducer } from "./";

export interface EstablishmentState {
  establishment?: IEstablishment;
  establishmentsFullName?: IFullNames;
  isLoaded: boolean;
}

const ESTABLISHMENT_INITIAL_STATE: EstablishmentState = {
  establishment: undefined,
  establishmentsFullName: undefined,
  isLoaded: false,
};

interface Props {
  children: ReactNode;
}
export const EstablishmentProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(establishmentReducer, ESTABLISHMENT_INITIAL_STATE);
  const { getPet } = useContext(PetContext);
  const { checkToken } = useContext(AuthContext);

  const getEstablishment = async (establishment_id: number) => {
    if (!Cookies.get("token")) {
      return;
    }
    if (establishment_id === undefined) {
      return;
    }
    try {
      const token = Cookies.get("token") || "";
      const { data } = await petMonitoringApi.get(`/auth/validate-token/${token}`);
      if (data == true) {
        const establishment = await petMonitoringApi.get(`/establishment/${establishment_id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
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
    establishmentType_id: number,
    petId: number,
    clearEstablishmentForm: () => void,
  ): Promise<{ isComplete: boolean }> => {
    const token = Cookies.get("token") || "";
    return await petMonitoringApi
      .post(
        `/establishment`,
        {
          name,
          address,
          email,
          cell_phone,
          phone,
          establishmentType: { id: establishmentType_id },
          pet: { id: petId },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(() => {
        checkToken();
        clearEstablishmentForm();
        swalMessage("Listo", "Establecimiento Agregado", "success");
        return { isComplete: true };
      })
      .catch(() => {
        swalMessage("Error", "No se pudo agregar el establecimiento - intente de nuevo", "error");
        return { isComplete: true };
      });
  };

  const updateEstablishment = async (
    establishment_id: number,
    name: string,
    address: string,
    email: string,
    cell_phone: string,
    phone: string,
    establishmentType_id: number,
  ): Promise<{ isComplete: boolean }> => {
    const token = Cookies.get("token") || "";
    return await petMonitoringApi
      .put(
        `/establishment/${establishmentType_id}`,
        {
          name,
          address,
          email,
          cell_phone,
          phone,
          establishmentType: { id: establishmentType_id },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(() => {
        checkToken();
        getEstablishment(establishment_id);
        swalMessage("Listo", "Establecimiento Actualizado", "success");
        return { isComplete: true };
      })
      .catch(() => {
        swalMessage("Error", "No se pudo actualizar el establecimiento - intente de nuevo", "error");
        return { isComplete: true };
      });
  };

  const deleteEstablishment = async (
    pet_id: number,
    establishment_id: number,
  ): Promise<{ isComplete: boolean }> => {
    const token = Cookies.get("token") || "";
    return Swal.fire({
      background: "#F4F5FA",
      title: "¿Está seguro de eliminar el establecimiento?",
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
            .delete(`/establishment/${establishment_id}`, {
              headers: { Authorization: `Bearer ${token}` },
            })
            .then(() => {
              checkToken();
              getPet(pet_id);
              swalMessage("Listo", "Establecimiento Eliminado", "success");
            })
            .catch(() => {
              swalMessage("Error", "No se pudo eliminar el establecimiento", "error");
            });
        }
        return { isComplete: true };
      })
      .catch(() => {
        return { isComplete: true };
      });
  };

  const getEstablishmentsFullName = async (
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
            .get(`/establishment/pets/user/${user_id}`, {
              headers: { Authorization: `Bearer ${token}` },
            })
            .then((establishments_fullName) => {
              dispatch({ type: "[Establishment] - getEstablishmentsFullName", payload: establishments_fullName.data });
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

  const clearEstablishmentsFullName = () => {
    dispatch({
      type: "[Establishment] - clearEstablishmentsFullName",
    });
  }

  const clearEstablishment = () => {
    dispatch({
      type: "[Establishment] - clearEstablishment",
    });
  };

  const sendEmailEstablishment = async (
    to_email: string,
    from_email: string,
    subject: string,
    body: string,
  ): Promise<{ isComplete: boolean }> => {
    const token = Cookies.get("token") || "";
    return await petMonitoringApi
      .post(
        `/establishment/emailEstablishment`,
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
    <EstablishmentContext.Provider
      value={{
        ...state,
        getEstablishment,
        addEstablishment,
        updateEstablishment,
        deleteEstablishment,
        getEstablishmentsFullName,
        clearEstablishmentsFullName,
        clearEstablishment,
        sendEmailEstablishment,
      }}
    >
      {children}
    </EstablishmentContext.Provider>
  );
};
