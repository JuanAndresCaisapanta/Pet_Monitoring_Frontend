import { ISpecies } from "../../interfaces";
import { SpeciesState } from ".";

type SpeciesActionType = { type: "[Species] - getSpecies"; payload: ISpecies };

export const petReducer = (
  state: SpeciesState,
  action: SpeciesActionType,
): SpeciesState => {
  switch (action.type) {
    case "[Species] - getSpecies":
      return {
        ...state,
        species: action.payload,
      };

    default:
      return state;
  }
};
