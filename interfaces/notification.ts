interface INotification {
  id: number;
  subject: string;
  text: string;
}

export interface INotifications extends Array<INotification> {}
