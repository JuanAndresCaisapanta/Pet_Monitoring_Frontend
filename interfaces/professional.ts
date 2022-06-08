export interface IProfessional {
  id: number;
  name: string;
  last_name: string;
  address: string;
  email: string;
  cell_phone: string;
  profession: {
    id: number;
    name: string;
  };
}
