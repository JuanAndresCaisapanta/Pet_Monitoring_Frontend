import axios from "axios";
import Cookies from "js-cookie";
import { FC, ReactNode, useContext, useReducer } from "react";
import Swal from "sweetalert2";
import { petMonitoringApi } from "../../api";
import { AuthContext } from "../auth";
import { MedicineContext, medicineReducer } from "./";
import { IMedicine } from "../../interfaces";

export interface MedicineState {
  medicine?: IMedicine;
  loaded: boolean;
}

const MEDICINE_INITIAL_STATE: MedicineState = {
  medicine: undefined,
  loaded: false,
};

interface Props {
  children: ReactNode;
}
export const MedicineProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(medicineReducer, MEDICINE_INITIAL_STATE);
  const { checkToken } = useContext(AuthContext);

  const getMedicine = async (id: any) => {
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
        const medicine = await petMonitoringApi.get(`/medicine/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        dispatch({
          type: "[Medicine] - getMedicine",
          payload: medicine.data,
        });
      } else {
        Cookies.remove("token");
      }
    } catch (error) {
      Cookies.remove("token");
    }
  };

  const addMedicine = async (
    name: string,
    image: any,
    manufacturer: string,
    batch: number,
    applicator: string,
    description: string,
    production_date: string,
    expiration_date: string,
    application_date: string,
    typeMedicine: number,
    pet: number,
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
          pet,
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

  const updateMedicine = async (
    id: any,
    name: string,
    image: any,
    manufacturer: string,
    batch: number,
    applicator: string,
    description: string,
    production_date: string,
    expiration_date: string,
    application_date: string,
    typeMedicine: number,
  ): Promise<{ hasError: boolean; message?: string }> => {
    try {
      const token = Cookies.get("token") || "";
      await petMonitoringApi.put(
        `/medicine/${id}`,
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
        text: "Medicina Actualizada",
        icon: "success",
        confirmButtonText: "Ocultar",
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
        message: "No se pudo actualizar la medicina - intente de nuevo",
      };
    }
  };

  const deleteMedicine = async (
    id: any,
  ): Promise<{ hasError: boolean; message?: string }> => {
    try {
      const token = Cookies.get("token") || "";
      await petMonitoringApi.delete(`/medicine/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      checkToken();
      
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
        message: "No se pudo eliminar la medicina - intente de nuevo",
      };
    }
  };

  return (
    <MedicineContext.Provider
      value={{
        ...state,
        getMedicine,
        addMedicine,
        updateMedicine,
        deleteMedicine,
      }}
    >
      {children}
    </MedicineContext.Provider>
  );
};
