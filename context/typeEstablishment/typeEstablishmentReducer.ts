import { TypeEstablishmentState } from "./";
import { ITypeEstablishment } from "../../interfaces/typeEstablishment";

type TypeEstablishmentActionType =
  | {
      type: "[TypeEstablishments] - getTypeEstablishments";
      payload: ITypeEstablishment;
    }
  | { type: "[TypeEstablishments] - clearTypeEstablishments" };

export const typeEstablishmentReducer = (
  state: TypeEstablishmentState,
  action: TypeEstablishmentActionType,
): TypeEstablishmentState => {
  switch (action.type) {
    case "[TypeEstablishments] - getTypeEstablishments":
      return {
        ...state,
        typeEstablishments: action.payload,
        isLoaded: true,
      };
    case "[TypeEstablishments] - clearTypeEstablishments":
      return {
        ...state,
        typeEstablishments: undefined,
        isLoaded: false,
      };

    default:
      return state;
  }
};
