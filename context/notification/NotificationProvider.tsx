import Cookies from "js-cookie";
import { FC, ReactNode, useContext, useReducer } from "react";
import Swal from "sweetalert2";
import { petMonitoringApi } from "../../api";
import { swalMessage } from "../../components";
import { INotifications } from "../../interfaces";
import { NotificationContext, notificationReducer } from "./";
import { AuthContext } from "../auth";

export interface NotificationState {
  user_notifications?: INotifications;
  isLoaded?: boolean;
}

const NOTIFICATION_INITIAL_STATE: NotificationState = {
  user_notifications: undefined,
  isLoaded: false,
};

interface Props {
  children: ReactNode;
}
export const NotificationProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(notificationReducer, NOTIFICATION_INITIAL_STATE);
  const { checkToken } = useContext(AuthContext);

  const getNotificationsByUser = async (user_id?: number): Promise<{ isComplete: boolean }> => {
    if (!Cookies.get("token")) {
      return { isComplete: true };
    }
    if (user_id === undefined) {
      return { isComplete: true };
    }
    const token = Cookies.get("token") || "";
    return await petMonitoringApi
      .get(`/auth/validate-token/${token}`)
      .then(async (validate) => {
        if (validate.data === true) {
          return await petMonitoringApi
            .get(`/notification/user/${user_id}`, {
              headers: { Authorization: `Bearer ${token}` },
            })
            .then((notifications) => {
              dispatch({
                type: "[Notification] - getNotifications",
                payload: notifications.data,
              });
              return { isComplete: true };
            })
            .catch(() => {
              Cookies.remove("token");
              return { isComplete: true };
            });
        }
        return { isComplete: true };
      })
      .catch(() => {
        Cookies.remove("token");
        return { isComplete: true };
      });
  };

  const deleteNotification = async (
    user_id?: number,
    notification_id?: number,
  ): Promise<{ isComplete: boolean }> => {
    const token = Cookies.get("token") || "";
    return Swal.fire({
      background: "#F4F5FA",
      title: "¿Está seguro de eliminar la notificación?",
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
            .delete(`/notification/${notification_id}`, {
              headers: { Authorization: `Bearer ${token}` },
            })
            .then(() => {
              checkToken();
              getNotificationsByUser(user_id);
              swalMessage("Listo", "Notificación Borrada", "success");
            })
            .catch(() => {
              swalMessage("Error", "No se pudo eliminar la notificación", "error");
            });
        }
        return { isComplete: true };
      })
      .catch(() => {
        return { isComplete: true };
      });
  };

  return (
    <NotificationContext.Provider
      value={{
        ...state,
        getNotificationsByUser,
        deleteNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
