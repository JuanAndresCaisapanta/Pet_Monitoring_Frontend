import { ProfessionState } from "./";
import { IProfession } from "../../interfaces";

type ProfessionActionType =
  | {
      type: "[Profession] - getProfessions";
      payload: IProfession;
    }
  | { type: "[Profession] - clearProfessions" };

export const professionReducer = (
  state: ProfessionState,
  action: ProfessionActionType,
): ProfessionState => {
  switch (action.type) {
    case "[Profession] - getProfessions":
      return {
        ...state,
        professions: action.payload,
        isLoaded: true,
      };
    case "[Profession] - clearProfessions":
      return {
        ...state,
        professions: undefined,
        isLoaded: false,
      };

    default:
      return state;
  }
};
