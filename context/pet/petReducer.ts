import { PetState } from "./";
import { IPet, IPets } from "../../interfaces";

type PetActionType =
  | { type: "[Pet] - getPet"; payload: IPet }
  | { type: "[Pet] - getPetsByUser"; payload: IPets }
  | { type: "[Pet] - getPets"; payload: IPets }
  | { type: "[Pet] - getPetsEstablishment"; payload: IPets }
  | { type: "[Pet] - getPetsMedicine"; payload: IPets }
  | { type: "[Pet] - getPetsProfessional"; payload: IPets }
  | { type: "[Pet] - petChange" }
  | { type: "[Pet] - clearPets" };

export const petReducer = (state: PetState, action: PetActionType): PetState => {
  switch (action.type) {
    case "[Pet] - getPet":
      return {
        ...state,
        isLoaded: true,
        pet: action.payload,
      };
    case "[Pet] - getPetsByUser":
      return {
        ...state,
        isLoaded: true,
        pets: action.payload,
      };
    case "[Pet] - getPets":
      return {
        ...state,
        isLoaded: true,
        pets: action.payload,
      };
    case "[Pet] - getPetsEstablishment":
      return {
        ...state,
        isLoaded: true,
        pets: action.payload,
      };
    case "[Pet] - getPetsMedicine":
      return {
        ...state,
        isLoaded: true,
        pets: action.payload,
      };
    case "[Pet] - getPetsProfessional":
      return {
        ...state,
        isLoaded: true,
        pets: action.payload,
      };
    case "[Pet] - petChange":
      return {
        ...state,
        isLoaded: false,
        pet: undefined,
      };
    case "[Pet] - clearPets":
      return {
        ...state,
        isLoaded: false,
        pets: undefined,
      };
    default:
      return state;
  }
};
