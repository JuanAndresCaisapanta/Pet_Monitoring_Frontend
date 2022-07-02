export interface IUser {
  id: number;
  name: string;
  last_name: string;
  email: string;
  password?: string;
  role: [
    {
        id: number,
        name: string
    },
  ],
  address?: string;
  phone?: string;
  creation_date: Date;
  image?: string;
  pet: [
    {
      id: number;
      name: string;
      color: string;
      race: string;
      weight: number;
      sex: string;
      image: any;
      breed: {
        id: number;
        name: string;
        species: {
          id: number;
          name: string;
        };
      };
    },
  ];
  device: [
    {
      id: number;
      code: string;
      pet: {
        id: number;
        name: string;
      };
      deviceDetail: [
        {
          id: number;
          latitude: number;
          longitude: number;
          temperature: number;
          battery: number;
        },
      ];
    },
  ];
}
