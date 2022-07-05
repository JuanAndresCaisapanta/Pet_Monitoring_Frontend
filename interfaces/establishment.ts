export interface IEstablishment {
  id: number;
  name: string;
  address: string;
  email:string;
  cell_phone: string;
  phone: string;
  establishmentType: {
    id: number;
    name: string;
  };
  pet: {
    name: string;
    breed: {
      name: string;
      species: {
        name: string;
      };
    };
  };
}
