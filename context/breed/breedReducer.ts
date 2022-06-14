import { BreedState } from ".";
import { IBreed } from "../../interfaces";

type BreedActionType =
  | { type: "[Breed] - getBreeds"; payload: IBreed }
  | { type: "[Breed] - clearBreeds" };

export const breedReducer = (
  state: BreedState,
  action: BreedActionType,
): BreedState => {
  switch (action.type) {
    case "[Breed] - getBreeds":
      return {
        ...state,
        breeds: action.payload,
        isLoaded: true,
      };
    case "[Breed] - clearBreeds":
      return {
        ...state,
        breeds: undefined,
        isLoaded: false,
      };
    default:
      return state;
  }
};
