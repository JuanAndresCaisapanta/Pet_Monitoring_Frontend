export interface IPet {
  id: number;
  name: string;
  colorMain: string;
  colorSecondary: string;
  weight: number;
  sex: string;
  sterilization: boolean;
  image: any;
  birth_date: string;
  breed: {
    id: number;
    name: string;
    species: {
      id: number;
      name: number;
    };
  };
  medicine: [
    {
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
      typeMedicine: {
        id: number;
        name: string;
      };
    },
  ];
  masterData: [
    {
      id: number;
      detailData: [
        {
          id: number;
          latitude: number;
          longitude: number;
          temperature: number;
          battery: number;
          creation_date: string;
        },
      ];
    },
  ];
}
