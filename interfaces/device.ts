export interface IDevice {
  id: number;
  code: string;
  callback_code: string;
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
export interface IDevices extends Array<IDevice> {}

export interface IDeviceDetail {
  id: number;
  latitude: number;
  longitude: number;
  temperature: number;
  battery: number;
  device: {
    id: number;
    code: string;
  };
}

export interface IDeviceDetails extends Array<IDeviceDetail> {}
