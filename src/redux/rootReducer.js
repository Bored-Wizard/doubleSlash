import { combineReducers } from 'redux';

import { component1reducer } from './component1/reducer';

export const rootReducer = combineReducers({
    component1reducer,
})
