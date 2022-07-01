import { createContext } from "react";
import { INotifications } from "../../interfaces";

interface ContextProps {
  user_notifications?: INotifications;

  isLoaded?: boolean;

  getNotificationsByUser: (user_id: number|undefined) => void;

  deleteNotification: (user_id: number|undefined, notification_id: number|undefined) => Promise<{ isComplete: boolean }>;
}

export const NotificationContext = createContext({} as ContextProps);
