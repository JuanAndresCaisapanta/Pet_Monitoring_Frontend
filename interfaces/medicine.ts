export interface IMedicine {
  id: number;
  name: string;
  image: any;
  manufacturer: string;
  batch: number;
  applicator: string;
  description: string;
  production_date: string;
  expiration_date: string;
  application_date: string;
  medicineType: {
    id: number;
    name: string;
  };
  pet: {
    id: number;
    name: string;
    breed: {
      id: number;
      name: string;
      species: {
        id: number;
        name: string;
      };
    };
    users: {
      id: number;
      email: string;
    };
  };
}

export interface IMedicines extends Array<IMedicine> {}
