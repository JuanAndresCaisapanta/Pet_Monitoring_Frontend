import axios from "axios";
import Cookies from "js-cookie";
import { FC, ReactNode, useContext, useReducer } from "react";
import Swal from "sweetalert2";
import { petMonitoringApi } from "../../api";
import { AuthContext } from "../auth";
import { MedicineContext, medicineReducer } from "./";

export interface MedicineState {}

const MEDICINE_INITIAL_STATE: MedicineState = {};

interface Props {
  children: ReactNode;
}
export const MedicineProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(medicineReducer, MEDICINE_INITIAL_STATE);
  const { checkToken } = useContext(AuthContext);
  const addMedicine = async (
    name: string,
        image:any,
        manufacturer: string,
        batch: number,
        applicator: string,
        description: string,
        production_date: string,
        expiration_date: string,
        application_date: string,
        typeMedicine:number,
        pet:number

  ): Promise<{ hasError: boolean; message?: string }> => {
    try {
      const token = Cookies.get("token") || "";
      await petMonitoringApi.post(
        `/medicine`,
        {
          name,
          image,
          manufacturer,
          batch,
          applicator,
          description,
          production_date,
          expiration_date,
          application_date,
          typeMedicine,
          pet
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
        message: "No se pudo agregar la medicina - intente de nuevo",
      };
    }
  };

  return (
    <MedicineContext.Provider
      value={{
        ...state,
        addMedicine,
      }}
    >
      {children}
    </MedicineContext.Provider>
  );
};
