import { IProfessional } from "../../interfaces";
import { ProfessionalState } from "./";

type ProfessionalActionType =
  | {
      type: "[Professional] - getProfessional";
      payload: IProfessional;
    }
  | { type: "[Professional] - clearProfessional" };

export const professionalReducer = (
  state: ProfessionalState,
  action: ProfessionalActionType,
): ProfessionalState => {
  switch (action.type) {
    case "[Professional] - getProfessional":
      return {
        ...state,
        professional: action.payload,
        isLoaded: true,
      };
    case "[Professional] - clearProfessional":
      return {
        ...state,
        professional: undefined,
        isLoaded: false,
      };
    default:
      return state;
  }
};
