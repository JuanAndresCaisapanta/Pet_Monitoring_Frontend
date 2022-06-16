import { FC, ReactNode, useContext, useReducer } from "react";

import Cookies from "js-cookie";

import { petMonitoringApi } from "../../api";
import { IPet } from "../../interfaces";
import { AuthContext } from "../auth";
import { PetContext, petReducer } from "./";
import { swalMessage } from "../../components";

export interface PetState {
  isLoaded: boolean;
  pet?: IPet;
}

const PET_INITIAL_STATE: PetState = {
  isLoaded: false,
  pet: undefined,
};

interface Props {
  children: ReactNode;
}
export const PetProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(petReducer, PET_INITIAL_STATE);

  const { checkToken } = useContext(AuthContext);

  const getPet = async (id: any) => {
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
        const pet = await petMonitoringApi.get(`/pet/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        dispatch({ type: "[Pet] - getPet", payload: pet.data });
      } else {
        Cookies.remove("token");
      }
    } catch (error) {
      Cookies.remove("token");
    }
  };

  const petChange = () => {
    dispatch({ type: "[Pet] - petChange" });
  };

  const addPet = async (
    name: string,
    color_main: string,
    color_secondary: string,
    weight: number,
    sex: string,
    sterilization: boolean,
    image: any,
    birth_date: string,
    breed: number,
    users: number,
  ): Promise<{ isComplete: boolean }> => {
    const token = Cookies.get("token") || "";
    return await petMonitoringApi
      .post(
        `/pet`,
        {
          name,
          color_main,
          color_secondary,
          weight,
          sex,
          sterilization,
          image,
          birth_date,
          breed,
          users,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      )
      .then(() => {
        checkToken();
        swalMessage("Listo", "Mascota Agregada", "success");
        return { isComplete: true };
      })
      .catch(() => {
        swalMessage("Error", "No se pudo agregar la mascota", "error");
        return { isComplete: true };
      });
  };

  const updatePet = async (
    id: number,
    name: string,
    color_main: string,
    color_secondary: string,
    weight: number,
    sex: string,
    sterilization: boolean,
    image: any,
    birth_date: string,
    breed: number,
  ): Promise<{ isComplete: boolean }> => {
    const token = Cookies.get("token") || "";
    return await petMonitoringApi
      .put(
        `/pet/${id}`,
        {
          name,
          color_main,
          color_secondary,
          weight,
          sex,
          sterilization,
          image,
          birth_date,
          breed: { id: breed },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      )
      .then(() => {
        checkToken();
        swalMessage("Listo", "Mascota Actualizada", "success");
        return { isComplete: true };
      })
      .catch(() => {
        swalMessage("Error", "No se pudo actualizar la mascota", "error");
        return { isComplete: true };
      });
  };

  const deletePet = async (id: number) => {
    const token = Cookies.get("token") || "";
    return await petMonitoringApi
      .delete(`/pet/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        checkToken();
        swalMessage("Listo", "Mascota Eliminada", "success");
        return { isComplete: true };
      })
      .catch(() => {
        swalMessage("Error", "No se pudo eliminar la mascota", "error");
        return { isComplete: true };
      });
  };

  return (
    <PetContext.Provider
      value={{
        ...state,
        addPet,
        updatePet,
        getPet,
        petChange,
        deletePet,
      }}
    >
      {children}
    </PetContext.Provider>
  );
};
