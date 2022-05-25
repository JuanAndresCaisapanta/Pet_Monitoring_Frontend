import { PetState } from "./";

type PetActionType = { type: "[Pet] - addPet" };

export const petReducer = (
  state: PetState,
  action: PetActionType,
): PetState => {
  switch (action.type) {
    case "[Pet] - addPet":
      return {
        ...state,
      };

    default:
      return state;
  }
};
