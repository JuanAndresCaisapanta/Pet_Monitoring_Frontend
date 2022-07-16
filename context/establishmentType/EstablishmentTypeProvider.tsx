import { FC, ReactNode, useContext, useReducer } from "react";

import Cookies from "js-cookie";

import { petMonitoringApi } from "../../api";
import { IEstablishmentType } from "../../interfaces";
import { EstablishmentTypeContext, establishmentTypeReducer } from ".";
import { AuthContext } from "../auth";
import { swalMessage } from "../../components";
import Swal from "sweetalert2";

export interface EstablishmentTypeState {
  establishmentType?: IEstablishmentType;
  isLoaded: boolean;
}

const ESTABLISHMENT_TYPE_INITIAL_STATE: EstablishmentTypeState = {
  establishmentType: undefined,
  isLoaded: false,
};

interface Props {
  children: ReactNode;
}
export const EstablishmentTypeProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(establishmentTypeReducer, ESTABLISHMENT_TYPE_INITIAL_STATE);
  const { checkToken } = useContext(AuthContext);

  const getEstablishmentType = async () => {
    if (!Cookies.get("token")) {
      return;
    }
    try {
      const token = Cookies.get("token") || "";
      const { data } = await petMonitoringApi.get(`/auth/validate-token/${token}`);
      if (data == true) {
        const establishmentType = await petMonitoringApi.get(`/establishmentType`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        dispatch({
          type: "[EstablishmentType] - getEstablishmentType",
          payload: establishmentType.data,
        });
      } else {
        Cookies.remove("token");
      }
    } catch (error) {
      Cookies.remove("token");
    }
  };

  const addEstablishmentType = async (name: string): Promise<{ isComplete: boolean }> => {
    const token = Cookies.get("token") || "";
    return await petMonitoringApi
      .post(
        `/establishmentType`,
        {
          name,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(() => {
        checkToken();
        getEstablishmentType();
        swalMessage("Listo", "Tipo de establecimiento agregado", "success");
        return { isComplete: true };
      })
      .catch(() => {
        swalMessage("Error", "No se pudo agregar el tipo de establecimiento - intente de nuevo", "error");
        return { isComplete: true };
      });
  };

  const updateEstablishmentType = async (
    establishmentType_id: any,
    name: string,
  ): Promise<{ isComplete: boolean }> => {
    const token = Cookies.get("token") || "";
    return await petMonitoringApi
      .put(
        `/establishmentType/${establishmentType_id}`,
        {
          name,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(() => {
        checkToken();
        getEstablishmentType();
        swalMessage("Listo", "Tipo de establecimiento actualizado", "success");
        return { isComplete: true };
      })
      .catch(() => {
        swalMessage("Error", "No se pudo actualizar el tipo de establecimiento", "error");
        return { isComplete: true };
      });
  };

  const deleteEstablishmentType = async (establishmentType_id: number): Promise<{ isComplete: boolean }> => {
    const token = Cookies.get("token") || "";
    return Swal.fire({
      background: "#F4F5FA",
      title: "¿Está seguro de eliminar el tipo de establecimiento?",
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
            .delete(`/establishmentType/${establishmentType_id}`, {
              headers: { Authorization: `Bearer ${token}` },
            })
            .then(() => {
              checkToken();
              getEstablishmentType();
              swalMessage("Listo", "Tipo de establecimiento eliminado", "success");
            })
            .catch(() => {
              swalMessage("Error", "Otros datos dependen de este tipo de establecimiento - Eliminelos Primero", "error");
            });
        }
        return { isComplete: true };
      })
      .catch(() => {
        return { isComplete: true };
      });
  };

  const clearEstablishmentType = () => {
    dispatch({
      type: "[EstablishmentType] - clearEstablishmentType",
    });
  };

  return (
    <EstablishmentTypeContext.Provider
      value={{
        ...state,
        getEstablishmentType,
        addEstablishmentType,
        updateEstablishmentType,
        deleteEstablishmentType,
        clearEstablishmentType,
      }}
    >
      {children}
    </EstablishmentTypeContext.Provider>
  );
};
