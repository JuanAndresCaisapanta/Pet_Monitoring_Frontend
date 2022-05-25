import { BreedState } from '.';
import { IBreed } from '../../interfaces';


type BreedActionType = 
   | { type: '[Breed] - getBreed', payload: IBreed} 


export const breedReducer = ( state: BreedState, action: BreedActionType ): BreedState => {

   switch (action.type) {
      case '[Breed] - getBreed':
         return {
            ...state,
            breed: action.payload,
          }

       default:
          return state;
   }

}