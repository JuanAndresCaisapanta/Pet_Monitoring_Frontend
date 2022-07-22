import { IProfessional, IFullNames, IProfessionals } from "../../interfaces";
import { ProfessionalState } from "./";

type ProfessionalActionType =
  | {
      type: "[Professional] - getProfessional";
      payload: IProfessional;
    }
  | { type: "[Professional] - getProfessionalsFullName"; payload: IFullNames }
  | { type: "[Professional] - getProfessionals"; payload: IProfessionals }
  | { type: "[Professional] - clearProfessional" }
  | { type: "[Professional] - clearProfessionals" }
  | { type: "[Professional] - clearProfessionalsFullName" };

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
    case "[Professional] - getProfessionals":
      return {
        ...state,
        professionals: action.payload,
      };
    case "[Professional] - getProfessionalsFullName":
      return {
        ...state,
        professionalsFullName: action.payload,
        isLoaded: true,
      };
    case "[Professional] - clearProfessional":
      return {
        ...state,
        professional: undefined,
        isLoaded: false,
      };
      case "[Professional] - clearProfessionals":
        return {
          ...state,
          professionals: undefined,
        };

    case "[Professional] - clearProfessionalsFullName":
      return {
        ...state,
        professionalsFullName: undefined,
        isLoaded: false,
      };
    default:
      return state;
  }
};
