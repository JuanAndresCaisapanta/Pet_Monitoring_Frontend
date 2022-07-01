import { NotificationState } from "./";
import { INotifications } from "../../interfaces";

type NotificationActionType = |{ type: "[Notification] - getNotifications"; payload: INotifications };

export const notificationReducer = (
  state: NotificationState,
  action: NotificationActionType,
): NotificationState => {
  switch (action.type) {
    case "[Notification] - getNotifications":
      return {
        ...state,
        user_notifications: action.payload,
        isLoaded: true,
      };

    default:
      return state;
  }
};
