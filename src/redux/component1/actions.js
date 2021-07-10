import { actionType1 } from './types';

export const updateState = (action) => {
    return {
        type: actionType1,
        payload: action
    }
}