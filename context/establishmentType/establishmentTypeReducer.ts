import { EstablishmentTypeState } from ".";
import { IEstablishmentType } from "../../interfaces/establishmentType";

type EstablishmentTypeActionType =
  | {
      type: "[EstablishmentType] - getEstablishmentType";
      payload: IEstablishmentType;
    }
  | { type: "[EstablishmentType] - clearEstablishmentType" };

export const establishmentTypeReducer = (
  state: EstablishmentTypeState,
  action: EstablishmentTypeActionType,
): EstablishmentTypeState => {
  switch (action.type) {
    case "[EstablishmentType] - getEstablishmentType":
      return {
        ...state,
        establishmentType: action.payload,
        isLoaded: true,
      };
    case "[EstablishmentType] - clearEstablishmentType":
      return {
        ...state,
        establishmentType: undefined,
        isLoaded: false,
      };
    default:
      return state;
  }
};
