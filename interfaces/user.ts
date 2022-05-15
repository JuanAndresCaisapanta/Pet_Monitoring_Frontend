export interface IUser {
  id: string;
  name: string;
  lats_name: string;
  email: string;
  password?: string;
  role: string;
  address?: string;
  phone?: string;
  creation_date: Date;
  update_date: Date;
}
