import { IProfessional } from "../../interfaces";
import { ProfessionalState } from "./";

type ProfessionalActionType = {
  type: "[Professional] - getProfessional";
  payload: IProfessional;
};

export const professionalReducer = (
  state: ProfessionalState,
  action: ProfessionalActionType,
): ProfessionalState => {
  switch (action.type) {
    case "[Professional] - getProfessional":
      return {
        ...state,
        professional: action.payload,
        loaded: true,
      };

    default:
      return state;
  }
};
