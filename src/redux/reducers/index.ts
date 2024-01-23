import { combineReducers } from 'redux';
import drinks from './drinks';
import meals from './meals';

const rootReducer = combineReducers<any>({ drinks, meals });

export default rootReducer;
