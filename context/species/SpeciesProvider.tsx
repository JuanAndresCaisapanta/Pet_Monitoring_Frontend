import { FC, ReactNode, useContext, useEffect, useReducer } from "react";
import { ISpecies } from "../../interfaces";

import { SpeciesContext } from ".";
import Cookies from "js-cookie";
import { petMonitoringApi } from "../../api";
import { speciesReducer } from "./speciesReducer";
import { AuthContext } from "../auth";
import { swalMessage } from "../../components";
import Swal from "sweetalert2";

export interface SpeciesState {
  species?: ISpecies;
  lastSpecies?: ISpecies;
  isLoaded?: boolean;
}

const SPECIES_INITIAL_STATE: SpeciesState = {
  species: undefined,
  isLoaded: false,
};

interface Props {
  children: ReactNode;
}

export const SpeciesProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(speciesReducer, SPECIES_INITIAL_STATE);
  const { checkToken } = useContext(AuthContext);

  const getSpecies = async () => {
    if (!Cookies.get("token")) {
      return;
    }
    try {
      const token = Cookies.get("token") || "";
      const { data } = await petMonitoringApi.get(`/auth/validate-token/${token}`);
      if (data == true) {
        const { data } = await petMonitoringApi.get(`/species`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        dispatch({ type: "[Species] - getSpecies", payload: data });
      } else {
        Cookies.remove("token");
      }
    } catch (error) {
      Cookies.remove("token");
    }
  };

  const addSpecies = async (name: string): Promise<{ isComplete: boolean }> => {
    const token = Cookies.get("token") || "";
    return await petMonitoringApi
      .post(
        `/species`,
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
        getSpecies();
        swalMessage("Listo", "Especie Agregada", "success");
        return { isComplete: true };
      })
      .catch(() => {
        swalMessage("Error", "No se pudo agregar la especie - intente de nuevo", "error");
        return { isComplete: true };
      });
  };

  const updateSpecies = async (species_id: any, name: string): Promise<{ isComplete: boolean }> => {
    const token = Cookies.get("token") || "";
    return await petMonitoringApi
      .put(
        `/species/${species_id}`,
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
        getSpecies();
        swalMessage("Listo", "Especie actualizada", "success");
        return { isComplete: true };
      })
      .catch(() => {
        swalMessage("Error", "No se pudo actualizar la especie", "error");
        return { isComplete: true };
      });
  };

  const deleteSpecies = async (species_id: number): Promise<{ isComplete: boolean }> => {
    const token = Cookies.get("token") || "";
    return Swal.fire({
      background: "#F4F5FA",
      title: "¿Está seguro de eliminar la especie?",
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
            .delete(`/species/${species_id}`, {
              headers: { Authorization: `Bearer ${token}` },
            })
            .then(() => {
              checkToken();
              getSpecies();
              swalMessage("Listo", "Especie eliminada", "success");
            })
            .catch(() => {
              swalMessage("Error", "Otros datos dependen de esta especie - Eliminelos Primero", "error");
            });
        }
        return { isComplete: true };
      })
      .catch(() => {
        return { isComplete: true };
      });
  };

  const clearSpecies = () => {
    dispatch({ type: "[Species] - clearSpecies" });
  };

  return (
    <SpeciesContext.Provider
      value={{
        ...state,
        getSpecies,
        addSpecies,
        updateSpecies,
        deleteSpecies,
        clearSpecies,
      }}
    >
      {children}
    </SpeciesContext.Provider>
  );
};
