import { FC, ReactNode, useReducer } from "react";
import { PetContext, petReducer } from "./";

export interface PetState {}

const PET_INITIAL_STATE: PetState = {};

interface Props {
  children: ReactNode;
}
export const PetProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(petReducer, PET_INITIAL_STATE);

  return (
    <PetContext.Provider
      value={{
        ...state,
      }}
    >
      {children}
    </PetContext.Provider>
  );
};
