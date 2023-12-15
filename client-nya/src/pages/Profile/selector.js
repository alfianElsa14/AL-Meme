import { createSelector } from "reselect";
import { initialState } from '@pages/Profile/reducer';

const selectProfileState = (state) => state.profile || initialState

export const selectUserProfile = createSelector(selectProfileState, (state) => state.userProfile)
export const selectMyMeme = createSelector(selectProfileState, (state) => state.myMemes)
