import { FC, ReactNode, useContext, useReducer } from "react";

import Cookies from "js-cookie";

import { petMonitoringApi } from "../../api";
import { IMedicineType } from "../../interfaces";
import { MedicineTypeContext, medicineTypeReducer } from ".";
import { AuthContext } from "../auth";
import { swalMessage } from "../../components";
import Swal from "sweetalert2";

export interface MedicineTypeState {
  medicineType?: IMedicineType;
}

const MEDICINE_TYPE_INITIAL_STATE: MedicineTypeState = {
  medicineType: undefined,
};

interface Props {
  children: ReactNode;
}
export const MedicineTypeProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(medicineTypeReducer, MEDICINE_TYPE_INITIAL_STATE);
  const { checkToken } = useContext(AuthContext);

  const getMedicineTypes = async () => {
    if (!Cookies.get("token")) {
      return;
    }
    try {
      const token = Cookies.get("token") || "";
      const { data } = await petMonitoringApi.get(`/auth/validate-token/${token}`);
      if (data == true) {
        const type = await petMonitoringApi.get(`/medicineType`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        dispatch({
          type: "[MedicineType] - getMedicineType",
          payload: type.data,
        });
      } else {
        Cookies.remove("token");
      }
    } catch (error) {
      Cookies.remove("token");
    }
  };

  const addMedicineType = async (name: string): Promise<{ isComplete: boolean }> => {
    const token = Cookies.get("token") || "";
    return await petMonitoringApi
      .post(
        `/medicineType`,
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
        getMedicineTypes();
        swalMessage("Listo", "Tipo de medicina agregado", "success");
        return { isComplete: true };
      })
      .catch(() => {
        swalMessage("Error", "No se pudo agregar el tipo de medicina - intente de nuevo", "error");
        return { isComplete: true };
      });
  };

  const updateMedicineType = async (medicineType_id: any, name: string): Promise<{ isComplete: boolean }> => {
    const token = Cookies.get("token") || "";
    return await petMonitoringApi
      .put(
        `/medicineType/${medicineType_id}`,
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
        getMedicineTypes();
        swalMessage("Listo", "Tipo de medicina actualizado", "success");
        return { isComplete: true };
      })
      .catch(() => {
        swalMessage("Error", "No se pudo actualizar el tipo de medicina", "error");
        return { isComplete: true };
      });
  };

  const deleteMedicineType = async (medicineType_id: number): Promise<{ isComplete: boolean }> => {
    const token = Cookies.get("token") || "";
    return Swal.fire({
      background: "#F4F5FA",
      title: "¿Está seguro de eliminar el tipo de medicina?",
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
            .delete(`/medicineType/${medicineType_id}`, {
              headers: { Authorization: `Bearer ${token}` },
            })
            .then(() => {
              checkToken();
              getMedicineTypes();
              swalMessage("Listo", "Tipo de medicina eliminado", "success");
            })
            .catch(() => {
              swalMessage("Error", "Otros datos dependen de este tipo de medicina - Eliminelos Primero", "error");
            });
        }
        return { isComplete: true };
      })
      .catch(() => {
        return { isComplete: true };
      });
  };

  return (
    <MedicineTypeContext.Provider
      value={{
        ...state,
        getMedicineTypes: getMedicineTypes,
        addMedicineType,
        updateMedicineType,
        deleteMedicineType,
      }}
    >
      {children}
    </MedicineTypeContext.Provider>
  );
};
