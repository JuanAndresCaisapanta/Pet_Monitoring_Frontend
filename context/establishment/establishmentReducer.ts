import { IEstablishment, IFullNames } from "../../interfaces";
import { EstablishmentState } from "./";

type EstablishmentActionType =
  | {
      type: "[Establishment] - getEstablishment";
      payload: IEstablishment;
    }
  | { type: "[Establishment] - getEstablishmentsFullName"; payload: IFullNames }
  | { type: "[Establishment] - clearEstablishmentsFullName" }
  | { type: "[Establishment] - clearEstablishment" };

export const establishmentReducer = (
  state: EstablishmentState,
  action: EstablishmentActionType,
): EstablishmentState => {
  switch (action.type) {
    case "[Establishment] - getEstablishment":
      return {
        ...state,
        establishment: action.payload,
        isLoaded: true,
      };
    case "[Establishment] - getEstablishmentsFullName":
      return {
        ...state,
        establishmentsFullName: action.payload,
        isLoaded: true,
      };
    case "[Establishment] - clearEstablishmentsFullName":
      return {
        ...state,
        establishmentsFullName: undefined,
        isLoaded: false,
      };
    case "[Establishment] - clearEstablishment":
      return {
        ...state,
        establishment: undefined,
        isLoaded: false,
      };

    default:
      return state;
  }
};
