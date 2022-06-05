import { MedicineState } from './';


type MedicineActionType = 
   | { type: '' } 


export const medicineReducer = ( state: MedicineState, action: MedicineActionType ): MedicineState => {

   switch (action.type) {
      case '':
         return {
            ...state,
          }

       default:
          return state;
   }

}