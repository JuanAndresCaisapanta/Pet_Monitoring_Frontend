import { UserState } from './';


type UserActionType = 
   | { type: '[USER] - update' } 


export const userReducer = ( state: UserState, action: UserActionType ): UserState => {

   switch (action.type) {
      case '[USER] - update':
         return {
            ...state,
          }

       default:
          return state;
   }

}