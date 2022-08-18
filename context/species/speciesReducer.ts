import { ISpecies } from "../../interfaces";
import { SpeciesState } from ".";

type SpeciesActionType =
  | { type: "[Species] - getSpecies"; payload: ISpecies }
  | { type: "[Species] - clearSpecies" };

export const speciesReducer = (state: SpeciesState, action: SpeciesActionType): SpeciesState => {
  switch (action.type) {
    case "[Species] - getSpecies":
      return {
        ...state,
        species: action.payload,
        isLoaded: true,
      };
    case "[Species] - clearSpecies":
      return {
        ...state,
        species: undefined,
        isLoaded: false,
      };

    default:
      return state;
  }
};
