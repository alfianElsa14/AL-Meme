import { produce } from 'immer'
import { SET_ALL_MEME, SET_MEMES_COUNT } from './constants';

export const initialState = {
    memes: [],
    memesCount: 0
}

export const storedKey = [];

const homeReducer = (state = initialState, action) => 
produce(state, (draft) => {
    switch (action.type) {
        case SET_ALL_MEME:
            draft.memes = action.memes
            break;
        case SET_MEMES_COUNT:
            draft.memesCount = action.memesCount
            break;
        default:
            break;
    }
})

export default homeReducer