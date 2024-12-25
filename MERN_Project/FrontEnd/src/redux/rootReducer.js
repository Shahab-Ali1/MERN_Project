import { combineReducers } from '@reduxjs/toolkit';
import AuthReducer from './reducer/Auth/Auth';

export const rootReducer = combineReducers({
    Auth: AuthReducer,
})