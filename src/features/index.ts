import { combineReducers } from "@reduxjs/toolkit";
import basketReducer from './basket/basketSlice';

const rootReducer = combineReducers({
    basket:basketReducer,
});

export default rootReducer