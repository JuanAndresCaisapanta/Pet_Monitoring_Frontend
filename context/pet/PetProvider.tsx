import axios from "axios";
import Cookies from "js-cookie";
import { FC, ReactNode, useContext, useReducer } from "react";
import Swal from "sweetalert2";
import { petMonitoringApi } from "../../api";
import { AuthContext } from "../auth";
import { PetContext, petReducer } from "./";

export interface PetState {}

const PET_INITIAL_STATE: PetState = {};

interface Props {
  children: ReactNode;
}
export const PetProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(petReducer, PET_INITIAL_STATE);
  const { user, checkToken } = useContext(AuthContext);
  const addPet = async (
    name: string,
    color_main: string,
    color_secondary: string,
    weight: number,
    sex: string,
    sterilization: boolean,
    image: any,
    birth_date: string,
    creation_date: string,
    breed: number,
    users: number,
  ): Promise<{ hasError: boolean; message?: string }> => {
    try {
      const token = Cookies.get("token") || "";
      await petMonitoringApi.post(
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
          creation_date,
          breed,
          users,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );
      checkToken();
      Swal.fire({
        background: "#F4F5FA",
        title: "Listo",
        text: "Mascota Agregada",
        icon: "success",
        backdrop: false,
        timer: 1500,
        timerProgressBar: true,
        showConfirmButton: false,
      });
      return {
        hasError: false,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          hasError: true,
          message: error.message,
        };
      }
      return {
        hasError: true,
        message: "No se pudo agregar su mascota - intente de nuevo",
      };
    }
  };

  return (
    <PetContext.Provider
      value={{
        ...state,
        addPet,
      }}
    >
      {children}
    </PetContext.Provider>
  );
};
