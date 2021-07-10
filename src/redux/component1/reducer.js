import { actionType1 } from './types';

const initialValue = {
    game2position: "left-full opacity-0",
    game1position: "left-full opacity-0",
}

export const component1reducer = (state = initialValue, action) => {
    switch(action.type){
        case actionType1: return {
            ...initialValue,
            ...action.payload
        }
        default: return{
            ...state
        }
    }
}