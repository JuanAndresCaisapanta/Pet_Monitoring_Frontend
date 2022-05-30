import { PetState } from "./";
import { IPet } from '../../interfaces/pet';

type PetActionType = { type: "[Pet] - getPet"; payload: IPet };

export const petReducer = (
  state: PetState,
  action: PetActionType,
): PetState => {
  switch (action.type) {
    case "[Pet] - getPet":
      return {
        ...state,
        isLoading: true,
        pet: action.payload,
      };

    default:
      return state;
  }
};
