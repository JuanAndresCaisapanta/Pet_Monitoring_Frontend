import { PetState } from "./";
import { IPet,IPets } from "../../interfaces";

type PetActionType =
  | { type: "[Pet] - getPet"; payload: IPet }
  | { type: "[Pet] - getPetsEstablishment"; payload: IPets }
  | { type: "[Pet] - petChange" }
  |{ type: "[Pet] - clearPetsEstablishment" };

export const petReducer = (
  state: PetState,
  action: PetActionType,
): PetState => {
  switch (action.type) {
    case "[Pet] - getPet":
      return {
        ...state,
        isLoaded: true,
        pet: action.payload,
      };
      case "[Pet] - getPetsEstablishment":
      return {
        ...state,
        isLoaded: true,
        pets: action.payload,
      };
    case "[Pet] - petChange":
      return {
        ...state,
        isLoaded: false,
        pet: undefined,
      };

      case "[Pet] - clearPetsEstablishment":
      return {
        ...state,
        isLoaded: false,
        pets: undefined,
      };

    default:
      return state;
  }
};
