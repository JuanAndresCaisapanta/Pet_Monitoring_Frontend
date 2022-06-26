import axios from "axios";
import Cookies from "js-cookie";
import { FC, ReactNode, useContext, useReducer } from "react";
import Swal from "sweetalert2";
import { petMonitoringApi } from "../../api";
import { AuthContext } from "../auth";
import { MedicineContext, medicineReducer } from "./";
import { IMedicine } from "../../interfaces";
import { swalMessage } from "../../components";
import { PetContext } from "../pet/PetContext";

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
  const { getPet } = useContext(PetContext);

  const getMedicine = async (id: any) => {
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
    clear_form: () => void,
  ): Promise<{ isComplete: boolean }> => {
    const token = Cookies.get("token") || "";
    return await petMonitoringApi
      .post(
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
          typeMedicine: { id: typeMedicine },
          pet: { id: pet },
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
        swalMessage("Listo", "Medicina Agregada", "success");
        clear_form();
        return { isComplete: true };
      })
      .catch(() => {
        swalMessage("Error", "No se pudo agregar la medicina", "error");
        return { isComplete: true };
      });
  };

  const updateMedicine = async (
    id: number,
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
  ): Promise<{ isComplete: boolean }> => {
    const token = Cookies.get("token") || "";
    return await petMonitoringApi
      .put(
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
          typeMedicine: { id: typeMedicine },
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
        getMedicine(id);
        swalMessage("Listo", "Medicina Actualizada", "success");
        return { isComplete: true };
      })
      .catch(() => {
        swalMessage("Error", "No se pudo actualizar la medicina", "error");
        return { isComplete: true };
      });
  };

  const deleteMedicine = async (pet_id: number, medicine_id: number): Promise<{ isComplete: boolean }> => {
    const token = Cookies.get("token") || "";
    return Swal.fire({
      background: "#F4F5FA",
      title: "¿Está seguro de eliminar la medicina?",
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
            .delete(`/medicine/${medicine_id}`, {
              headers: { Authorization: `Bearer ${token}` },
            })
            .then(() => {
              checkToken();
              getPet(pet_id);
              swalMessage("Listo", "Medicina Eliminada", "success");
            })
            .catch(() => {
              swalMessage("Error", "No se pudo eliminar la medicina", "error");
            });
        }
        return { isComplete: true };
      })
      .catch(() => {
        return { isComplete: true };
      });
  };

  const clearMedicine= () => {
    dispatch({
      type: "[Medicine] - clearMedicine",
    });
  }

  return (
    <MedicineContext.Provider
      value={{
        ...state,
        getMedicine,
        addMedicine,
        updateMedicine,
        deleteMedicine,
        clearMedicine,
      }}
    >
      {children}
    </MedicineContext.Provider>
  );
};
