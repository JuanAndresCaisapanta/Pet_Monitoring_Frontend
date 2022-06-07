import { IMedicine } from '../../interfaces';
import { MedicineState } from './';


type MedicineActionType = 
   | { type: '[Medicine] - getMedicine'; payload: IMedicine  } 


export const medicineReducer = ( state: MedicineState, action: MedicineActionType ): MedicineState => {

   switch (action.type) {
      case '[Medicine] - getMedicine':
         return {
            ...state,
            medicine: action.payload,
            loaded: true
          }

       default:
          return state;
   }

}