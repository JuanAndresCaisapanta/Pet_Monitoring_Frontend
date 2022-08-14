interface INotification {
  id: number;
  subject: string;
  text: string;
  creation_date: string;
}

export interface INotifications extends Array<INotification> {}
