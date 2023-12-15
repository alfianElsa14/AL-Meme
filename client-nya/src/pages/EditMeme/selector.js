import { createSelector } from "reselect";
import { initialState } from "@pages/EditMeme/reducer";

const selectEditMemeState = (state) => state.editMeme || initialState

export const selectEditMeme = createSelector(selectEditMemeState, (state) => state.editMeme)

export const selectBoxEdit = createSelector(selectEditMemeState, (state) => state.boxEdit)

export const selectImageEdit = createSelector(selectEditMemeState, (state) => state.imageEdit)