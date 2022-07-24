import { FC, ReactNode, useContext, useReducer } from "react";

import Swal from "sweetalert2";
import Cookies from "js-cookie";

import { petMonitoringApi } from "../../api";
import { IPet, IPets } from "../../interfaces";
import { AuthContext } from "../auth";
import { PetContext, petReducer } from "./";
import { swalMessage } from "../../components";

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

  const getPet = async (pet_id: number) => {
    if (!Cookies.get("token")) {
      return;
    }
    if (pet_id === undefined) {
      return;
    }
    try {
      const token = Cookies.get("token") || "";
      const { data } = await petMonitoringApi.get(`/auth/validate-token/${token}`);
      if (data == true) {
        const pet = await petMonitoringApi.get(`/pet/${pet_id}`, {
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

  const getPetsByUser = async (user_id: number) => {
    if (!Cookies.get("token")) {
      return;
    }
    if (user_id === undefined) {
      return;
    }
    try {
      const token = Cookies.get("token") || "";
      const { data } = await petMonitoringApi.get(`/auth/validate-token/${token}`);
      if (data == true) {
        const pets = await petMonitoringApi.get(`/pet/users/${user_id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        dispatch({ type: "[Pet] - getPetsByUser", payload: pets.data });
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

  const getPets = async () => {
    if (!Cookies.get("token")) {
      return;
    }
    try {
      const token = Cookies.get("token") || "";
      const { data } = await petMonitoringApi.get(`/auth/validate-token/${token}`);
      if (data == true) {
        const pets = await petMonitoringApi.get(`/pet`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        dispatch({
          type: "[Pet] - getPets",
          payload: pets.data,
        });
      } else {
        Cookies.remove("token");
      }
    } catch (error) {
      Cookies.remove("token");
    }
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
    clearPetForm: () => void,
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
        clearPetForm();
        return { isComplete: true };
      })
      .catch(() => {
        swalMessage("Error", "No se pudo agregar la mascota", "error");
        return { isComplete: true };
      });
  };

  const updatePet = async (
    pet_id: number,
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
        `/pet/${pet_id}`,
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
        getPet(pet_id);
        swalMessage("Listo", "Mascota Actualizada", "success");
        return { isComplete: true };
      })
      .catch(() => {
        swalMessage("Error", "No se pudo actualizar la mascota", "error");
        return { isComplete: true };
      });
  };

  const deletePet = async (type_id?: number, fullName?: string, user_id?: number, pet_id?: number, router?:any) => {
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
            .delete(`/pet/${pet_id}`, {
              headers: { Authorization: `Bearer ${token}` },
            })
            .then(() => {
              checkToken();
              getPetsEstablishment(type_id, fullName, user_id);
              router.push("/admin/pets");
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

  const getPetsEstablishment = async (
    establishmentType_id?: number,
    establishment_fullName?: string,
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
            .get(`/establishment/pets/${establishmentType_id}/${establishment_fullName}/${user_id}`, {
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

  const getPetsMedicine = async (
    medicineType_id?: number,
    medicine_fullName?: string,
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
            .get(`/medicine/pets/${medicineType_id}/${medicine_fullName}/${user_id}`, {
              headers: { Authorization: `Bearer ${token}` },
            })
            .then((pets) => {
              dispatch({ type: "[Pet] - getPetsMedicine", payload: pets.data });
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

  const getPetsProfessional = async (
    profession_id?: number,
    professional_fullName?: string,
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
            .get(`/professional/pets/${profession_id}/${professional_fullName}/${user_id}`, {
              headers: { Authorization: `Bearer ${token}` },
            })
            .then((pets) => {
              dispatch({ type: "[Pet] - getPetsProfessional", payload: pets.data });
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

  const clearPets = () => {
    dispatch({ type: "[Pet] - clearPets" });
  };

  return (
    <PetContext.Provider
      value={{
        ...state,
        addPet,
        updatePet,
        getPet,
        getPetsByUser,
        getPets,
        petChange,
        deletePet,
        getPetsEstablishment,
        getPetsMedicine,
        getPetsProfessional,
        clearPets,
      }}
    >
      {children}
    </PetContext.Provider>
  );
};
