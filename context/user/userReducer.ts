import { IUser } from "../../interfaces";
import { UserState } from "./";

type UserActionType = |{ type: "[User] - getUsers"; payload: IUser  }
|{ type: "[User] - getUser"; payload: IUser  }
| { type: "[User] - clearUsers" }
| { type: "[User] - clearUser" }

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
      case "[User] - getUser":
        return {
          ...state,
          user: action.payload,
        };
    case "[User] - clearUsers":
      return {
        ...state,
        users: undefined,
      };
      case "[User] - clearUser":
        return {
          ...state,
          user: undefined,
        };
    default:
      return state;
  }
};
