import { produce } from 'immer';
import { SET_ALL_COMMENTS, SET_BOX_MEME, SET_IMAGE_MEME, SET_LIKE, SET_MEME_BY_ID } from './constants';

export const initialState = {
    meme: {},
    box: 0,
    imageMeme: null,
    comments: [],
    likes: {}

};

export const storedKey = [];

const memeDetailReducer = (state = initialState, action) =>
    produce(state, (draft) => {
        switch (action.type) {
            case SET_MEME_BY_ID:
                draft.meme = action.meme
                break;
            case SET_BOX_MEME:
                draft.box = action.box
                break;
            case SET_IMAGE_MEME:
                draft.imageMeme = action.imageMeme
                break;
            case SET_ALL_COMMENTS:
                draft.comments = action.comments
                break;
            case SET_LIKE:
                draft.likes = action.likes
                break;
            default:
                break;
        }
    })


export default memeDetailReducer;