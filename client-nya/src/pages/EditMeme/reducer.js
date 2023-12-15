import { produce } from "immer";
import { SET_BOX_EDIT, SET_IMAGE_EDIT, SET_MY_MEME_BY_ID } from "./constants";

export const initialState = {
    editMeme: {},
    boxEdit: 0 ,
    imageEdit: null
}

const editMemeReducer = (state = initialState, action) =>
    produce(state, draft => {
        switch (action.type) {
            case SET_MY_MEME_BY_ID:
                draft.editMeme = action.editMeme;
                break;
            case SET_BOX_EDIT:
                draft.boxEdit = action.boxEdit;
                break;
            case SET_IMAGE_EDIT:
                draft.imageEdit = action.imageEdit;
                break;
            default:
                break;
        }
    })

export default editMemeReducer