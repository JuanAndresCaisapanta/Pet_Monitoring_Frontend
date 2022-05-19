export interface IUser {
  id: string;
  name: string;
  last_name: string;
  email: string;
  password?: string;
  role: [{ authority: string },{ authority: string }];
  address?: string;
  phone?: string;
  creation_date: Date;
  image?: string;
}
