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
  typeMedicine: {
    id: number;
    name: string;
  };
}
