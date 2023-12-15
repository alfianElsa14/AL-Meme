import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectDetailState = (state) => state.memeDetail || initialState;

export const selectMeme = createSelector(selectDetailState, (state) => state.meme);

export const selectBox = createSelector(selectDetailState, (state) => state.box)

export const selectImageMeme = createSelector(selectDetailState, (state) => state.imageMeme)

export const selectComment = createSelector(selectDetailState, (state) => state.comments)

export const selectLike = createSelector(selectDetailState, (state) => state.likes)