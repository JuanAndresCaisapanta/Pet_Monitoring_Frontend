import { PetState } from "./";
import { IPet } from "../../interfaces/pet";

type PetActionType =
  | { type: "[Pet] - getPet"; payload: IPet }
  | { type: "[Pet] - petChange" };

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
    case "[Pet] - petChange":
      return {
        ...state,
        isLoaded: false,
        pet: undefined,
      };

    default:
      return state;
  }
};
