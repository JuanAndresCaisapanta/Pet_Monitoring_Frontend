import { FC, ReactNode, useContext, useReducer } from "react";

import Cookies from "js-cookie";
import Swal from "sweetalert2";

import { petMonitoringApi } from "../../api";
import { AuthContext } from "../auth";
import { MedicineContext, medicineReducer } from "./";
import { IFullNames, IMedicine, IMedicines } from "../../interfaces";
import { swalMessage } from "../../components";
import { PetContext } from "../pet/PetContext";

export interface MedicineState {
  medicine?: IMedicine;
  medicines?: IMedicines;
  medicinesFullName?: IFullNames;
  isLoaded: boolean;
}

const MEDICINE_INITIAL_STATE: MedicineState = {
  medicine: undefined,
  medicines: undefined,
  medicinesFullName: undefined,
  isLoaded: false,
};

interface Props {
  children: ReactNode;
}
export const MedicineProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(medicineReducer, MEDICINE_INITIAL_STATE);
  const { checkToken } = useContext(AuthContext);
  const { getPet } = useContext(PetContext);

  const getMedicine = async (medicine_id: number) => {
    if (!Cookies.get("token")) {
      return;
    }
    if (medicine_id === undefined) {
      return;
    }
    try {
      const token = Cookies.get("token") || "";
      const { data } = await petMonitoringApi.get(`/auth/validate-token/${token}`);
      if (data == true) {
        const medicine = await petMonitoringApi.get(`/medicine/${medicine_id}`, {
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

  const getMedicines = async () => {
    if (!Cookies.get("token")) {
      return;
    }
    try {
      const token = Cookies.get("token") || "";
      const { data } = await petMonitoringApi.get(`/auth/validate-token/${token}`);
      if (data == true) {
        const medicines = await petMonitoringApi.get(`/medicine`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        dispatch({
          type: "[Medicine] - getMedicines",
          payload: medicines.data,
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
    medicineType_id: number,
    pet_id: number,
    clearMedicineForm: () => void,
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
          medicineType: { id: medicineType_id },
          pet: { id: pet_id },
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
        clearMedicineForm();
        return { isComplete: true };
      })
      .catch(() => {
        swalMessage("Error", "No se pudo agregar la medicina", "error");
        return { isComplete: true };
      });
  };

  const updateMedicine = async (
    medicine_id: number,
    name: string,
    image: any,
    manufacturer: string,
    batch: number,
    applicator: string,
    description: string,
    production_date: string,
    expiration_date: string,
    application_date: string,
    medicineType_id: number,
  ): Promise<{ isComplete: boolean }> => {
    const token = Cookies.get("token") || "";
    return await petMonitoringApi
      .put(
        `/medicine/${medicine_id}`,
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
          medicineType: { id: medicineType_id },
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
        getMedicine(medicine_id);
        swalMessage("Listo", "Medicina Actualizada", "success");
        return { isComplete: true };
      })
      .catch(() => {
        swalMessage("Error", "No se pudo actualizar la medicina", "error");
        return { isComplete: true };
      });
  };

  const deleteMedicine = async (pet_id?: number, medicine_id?: number, router?:any): Promise<{ isComplete: boolean }> => {
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
              getPet(pet_id!);
              router.push("/admin/medicines");
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

  const clearMedicine = () => {
    dispatch({
      type: "[Medicine] - clearMedicine",
    });
  };

  const getMedicinesFullName = async (
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
            .get(`/medicine/pets/user/${user_id}`, {
              headers: { Authorization: `Bearer ${token}` },
            })
            .then((medicines_fullName) => {
              dispatch({ type: "[Medicine] - getMedicinesFullName", payload: medicines_fullName.data });
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

  const clearMedicinesFullName = () => {
    dispatch({
      type: "[Medicine] - clearMedicinesFullName",
    });
  }

  const clearMedicines = () => {
    dispatch({
      type: "[Medicine] - clearMedicines",
    });
  }

  return (
    <MedicineContext.Provider
      value={{
        ...state,
        getMedicine,
        getMedicines,
        addMedicine,
        updateMedicine,
        deleteMedicine,
        clearMedicine,
        clearMedicines,
        getMedicinesFullName,
        clearMedicinesFullName,
      }}
    >
      {children}
    </MedicineContext.Provider>
  );
};
