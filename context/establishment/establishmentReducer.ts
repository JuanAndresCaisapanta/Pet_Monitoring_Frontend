import { IEstablishment, IEstablishments, IFullNames } from "../../interfaces";
import { EstablishmentState } from "./";

type EstablishmentActionType =
  | {
      type: "[Establishment] - getEstablishment";
      payload: IEstablishment;
    }
  | {
      type: "[Establishment] - getEstablishments";
      payload: IEstablishments;
    }
  | { type: "[Establishment] - getEstablishmentsFullName"; payload: IFullNames }
  | { type: "[Establishment] - clearEstablishmentsFullName" }
  | { type: "[Establishment] - clearEstablishment" }
  | { type: "[Establishment] - clearEstablishments"};

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
    case "[Establishment] - getEstablishments":
      return {
        ...state,
        establishments: action.payload,
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
      case "[Establishment] - clearEstablishments":
      return {
        ...state,
        establishments: undefined,
      };

    default:
      return state;
  }
};
