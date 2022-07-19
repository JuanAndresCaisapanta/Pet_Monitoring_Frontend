import { IUser } from "../../interfaces";
import { UserState } from "./";

type UserActionType = |{ type: "[User] - getUsers"; payload: IUser  }
| { type: "[User] - clearUsers" }

export const userReducer = (
  state: UserState,
  action: UserActionType,
): UserState => {
  switch (action.type) {
    case "[User] - getUsers":
      return {
        ...state,
        users: action.payload,
      };
    case "[User] - clearUsers":
      return {
        ...state,
        users: undefined,
      };
    default:
      return state;
  }
};
