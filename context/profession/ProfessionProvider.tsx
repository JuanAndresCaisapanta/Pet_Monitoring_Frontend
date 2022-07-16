import Cookies from "js-cookie";
import { FC, ReactNode, useContext, useReducer } from "react";
import Swal from "sweetalert2";
import { petMonitoringApi } from "../../api";
import { swalMessage } from "../../components";
import { IProfession } from "../../interfaces";
import { AuthContext } from "../auth";
import { ProfessionContext, professionReducer } from "./";

export interface ProfessionState {
  professions?: IProfession;
  isLoaded: boolean;
}

const PROFESSION_INITIAL_STATE: ProfessionState = {
  professions: undefined,
  isLoaded: false,
};

interface Props {
  children: ReactNode;
}
export const ProfessionProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(professionReducer, PROFESSION_INITIAL_STATE);

  const { checkToken } = useContext(AuthContext);

  const getProfessions = async () => {
    if (!Cookies.get("token")) {
      return;
    }
    try {
      const token = Cookies.get("token") || "";
      const { data } = await petMonitoringApi.get(`/auth/validate-token/${token}`);
      if (data == true) {
        const professions = await petMonitoringApi.get(`/profession`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        dispatch({
          type: "[Profession] - getProfessions",
          payload: professions.data,
        });
      } else {
        Cookies.remove("token");
      }
    } catch (error) {
      Cookies.remove("token");
    }
  };

  const addProfession = async (name: string): Promise<{ isComplete: boolean }> => {
    const token = Cookies.get("token") || "";
    return await petMonitoringApi
      .post(
        `/profession`,
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
        getProfessions();
        swalMessage("Listo", "Profesión agregada", "success");
        return { isComplete: true };
      })
      .catch(() => {
        swalMessage("Error", "No se pudo agregar la profesión - intente de nuevo", "error");
        return { isComplete: true };
      });
  };

  const updateProfession = async (profession_id: any, name: string): Promise<{ isComplete: boolean }> => {
    const token = Cookies.get("token") || "";
    return await petMonitoringApi
      .put(
        `/profession/${profession_id}`,
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
        getProfessions();
        swalMessage("Listo", "Profesión actualizada", "success");
        return { isComplete: true };
      })
      .catch(() => {
        swalMessage("Error", "No se pudo actualizar la profesión", "error");
        return { isComplete: true };
      });
  };

  const deleteProfession = async (profession_id: number): Promise<{ isComplete: boolean }> => {
    const token = Cookies.get("token") || "";
    return Swal.fire({
      background: "#F4F5FA",
      title: "¿Está seguro de eliminar la profesión?",
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
            .delete(`/profession/${profession_id}`, {
              headers: { Authorization: `Bearer ${token}` },
            })
            .then(() => {
              checkToken();
              getProfessions();
              swalMessage("Listo", "Profesión eliminada", "success");
            })
            .catch(() => {
              swalMessage("Error", "Otros datos dependen de esta profesión - Eliminelos Primero", "error");
            });
        }
        return { isComplete: true };
      })
      .catch(() => {
        return { isComplete: true };
      });
  };

  const clearProfessions = () => {
    dispatch({
      type: "[Profession] - clearProfessions",
    });
  };

  return (
    <ProfessionContext.Provider
      value={{
        ...state,
        getProfessions,
        addProfession,
        updateProfession,
        deleteProfession,
        clearProfessions,
      }}
    >
      {children}
    </ProfessionContext.Provider>
  );
};
