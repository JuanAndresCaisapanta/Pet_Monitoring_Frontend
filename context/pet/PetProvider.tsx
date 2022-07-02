import { FC, ReactNode, useContext, useReducer } from "react";

import Cookies from "js-cookie";

import { petMonitoringApi } from "../../api";
import { IPet, IPets } from "../../interfaces";
import { AuthContext } from "../auth";
import { PetContext, petReducer } from "./";
import { swalMessage } from "../../components";
import Swal from "sweetalert2";

export interface PetState {
  isLoaded: boolean;
  pet?: IPet;
  pets?: IPets;
}

const PET_INITIAL_STATE: PetState = {
  isLoaded: false,
  pet: undefined,
  pets: undefined,
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
      const { data } = await petMonitoringApi.get(`/auth/validate-token/${token}`);
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
    clear: () => void,
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
        clear();
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
        getPet(id);
        swalMessage("Listo", "Mascota Actualizada", "success");
        return { isComplete: true };
      })
      .catch(() => {
        swalMessage("Error", "No se pudo actualizar la mascota", "error");
        return { isComplete: true };
      });
  };

  const deletePet = async (name?:string,user_id?:number,id?: number) => {
    const token = Cookies.get("token") || "";
    return Swal.fire({
      background: "#F4F5FA",
      title: "¿Está seguro de eliminar la mascota?",
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
            .delete(`/pet/${id}`, {
              headers: { Authorization: `Bearer ${token}` },
            })
            .then(() => {
              checkToken();
              getPetsEstablishment(name,user_id);
              swalMessage("Listo", "Mascota Eliminada", "success");
            })
            .catch(() => {
              swalMessage("Error", "No se pudo eliminar la mascota", "error");
            });
        }
        return { isComplete: true };
      })
      .catch(() => {
        return { isComplete: true };
      });
  };

  const getPetsEstablishment = async (text: string|undefined, user_id: number|undefined): Promise<{ isComplete: boolean }> => {
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
            .get(`/establishment/pets/${text}/${user_id}`, {
              headers: { Authorization: `Bearer ${token}` },
            })
            .then((pets) => {
              dispatch({ type: "[Pet] - getPetsEstablishment", payload: pets.data });
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

  const clearPetsEstablishment = () => {
    dispatch({ type: "[Pet] - clearPetsEstablishment" });
  }

  return (
    <PetContext.Provider
      value={{
        ...state,
        addPet,
        updatePet,
        getPet,
        petChange,
        deletePet,
        getPetsEstablishment,
        clearPetsEstablishment,
      }}
    >
      {children}
    </PetContext.Provider>
  );
};
