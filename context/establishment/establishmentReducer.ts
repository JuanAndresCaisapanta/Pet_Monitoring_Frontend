import { IEstablishment } from "../../interfaces";
import { EstablishmentState } from "./";

type EstablishmentActionType =
  | {
      type: "[Establishment] - getEstablishment";
      payload: IEstablishment;
    }
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
