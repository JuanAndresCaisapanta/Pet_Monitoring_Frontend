import { createContext } from "react";
import { INotifications } from "../../interfaces";

interface ContextProps {
  user_notifications?: INotifications;

  isLoaded?: boolean;

  getNotificationsByUser: (user_id?: number) => void;

  deleteNotification: (user_id?: number, notification_id?: number) => Promise<{ isComplete: boolean }>;
}

export const NotificationContext = createContext({} as ContextProps);
