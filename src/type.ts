import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

export type RootState = {
  drink: any,
  meal: any,
};

export type AppDispatch = ThunkDispatch<RootState, null, Action>;
