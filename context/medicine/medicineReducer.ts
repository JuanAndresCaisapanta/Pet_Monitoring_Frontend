import { MedicineState } from './';


type MedicineActionType = 
   | { type: '[Medicine] - getMedicine' } 


export const medicineReducer = ( state: MedicineState, action: MedicineActionType ): MedicineState => {

   switch (action.type) {
      case '[Medicine] - getMedicine':
         return {
            ...state,
          }

       default:
          return state;
   }

}