import { createSelector } from 'reselect';
import { initialState } from './reducer';


const selectHomeState = (state) => state.home || initialState;

export const selectMemes = createSelector(selectHomeState, (state) => state.memes);

export const selectMemesCount = createSelector(selectHomeState, (state) => state.memesCount);