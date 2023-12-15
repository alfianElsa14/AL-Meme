import { produce } from "immer";
import { SET_MY_MEMES, SET_USER_PROFILE } from "./constants";

export const initialState = {
    userProfile: {},
    myMemes: []
}

const profileReducer = (state = initialState, action) =>
    produce(state, draft => {
        switch (action.type) {
            case SET_USER_PROFILE:
                draft.userProfile = action.userProfile;
                break;
            case SET_MY_MEMES:
                draft.myMemes = action.myMemes;
                break;
            default:
                break;
        }
    })

export default profileReducer;