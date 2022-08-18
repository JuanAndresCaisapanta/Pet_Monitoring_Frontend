import { FC, ReactNode, useContext, useReducer } from "react";

import Cookies from "js-cookie";

import { petMonitoringApi } from "../../api";
import { IBreed } from "../../interfaces";
import { BreedContext, breedReducer } from "./";
import { AuthContext } from "../auth";
import { swalMessage } from "../../components";
import Swal from "sweetalert2";

export interface BreedState {
  breeds?: IBreed;
  isLoaded?: boolean;
}

const BREED_INITIAL_STATE: BreedState = {
  breeds: undefined,
  isLoaded: false,
};

interface Props {
  children: ReactNode;
}

export const BreedProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(breedReducer, BREED_INITIAL_STATE);
  const { checkToken } = useContext(AuthContext);
  
  const getBreedsBySpecies = async (species_id: number) => {
    if (!Cookies.get("token")) {
      return;
    }
    try {
      const token = Cookies.get("token") || "";
      const { data } = await petMonitoringApi.get(`/auth/validate-token/${token}`);
      if (data == true) {
        const { data } = await petMonitoringApi.get(`breed/species/${species_id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        dispatch({ type: "[Breed] - getBreeds", payload: data });
      } else {
        Cookies.remove("token");
      }
    } catch (error) {
      Cookies.remove("token");
    }
  };

  const getBreeds = async () => {
    if (!Cookies.get("token")) {
      return;
    }
    try {
      const token = Cookies.get("token") || "";
      const { data } = await petMonitoringApi.get(`/auth/validate-token/${token}`);
      if (data == true) {
        const { data } = await petMonitoringApi.get(`/breed`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        dispatch({ type: "[Breed] - getBreeds", payload: data });
      } else {
        Cookies.remove("token");
      }
    } catch (error) {
      Cookies.remove("token");
    }
  };

  const addBreed = async (name: string, species_id: any): Promise<{ isComplete: boolean }> => {
    const token = Cookies.get("token") || "";
    return await petMonitoringApi
      .post(
        `/breed`,
        {
          name,
          species: { id: species_id },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(() => {
        checkToken();
        getBreeds();
        swalMessage("Listo", "Raza agregada", "success");
        return { isComplete: true };
      })
      .catch(() => {
        swalMessage("Error", "No se pudo agregar la raza - intente de nuevo", "error");
        return { isComplete: true };
      });
  };

  const updateBreed = async (breed_id: any, name: string, species_id: any): Promise<{ isComplete: boolean }> => {
    const token = Cookies.get("token") || "";
    return await petMonitoringApi
      .put(
        `/breed/${breed_id}`,
        {
          name,
          species: { id: species_id },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(() => {
        checkToken();
        getBreeds();
        swalMessage("Listo", "Raza actualizada", "success");
        return { isComplete: true };
      })
      .catch(() => {
        swalMessage("Error", "No se pudo actualizar la raza", "error");
        return { isComplete: true };
      });
  };

  const deleteBreed = async (breed_id: number): Promise<{ isComplete: boolean }> => {
    const token = Cookies.get("token") || "";
    return Swal.fire({
      background: "#F4F5FA",
      title: "¿Está seguro de eliminar la raza?",
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
            .delete(`/breed/${breed_id}`, {
              headers: { Authorization: `Bearer ${token}` },
            })
            .then(() => {
              checkToken();
              getBreeds();
              swalMessage("Listo", "Raza eliminada", "success");
            })
            .catch(() => {
              swalMessage("Error", "Otros datos dependen de esta raza - Eliminelos Primero", "error");
            });
        }
        return { isComplete: true };
      })
      .catch(() => {
        return { isComplete: true };
      });
  };

  const clearBreeds = () => {
    dispatch({ type: "[Breed] - clearBreeds" });
  };

  return (
    <BreedContext.Provider
      value={{
        ...state,
        getBreedsBySpecies,
        getBreeds,
        addBreed,
        updateBreed,
        deleteBreed,
        clearBreeds,
      }}
    >
      {children}
    </BreedContext.Provider>
  );
};
