import { DELETE_MY_MEMES, GET_MY_MEMES, GET_USER_PROFILE, SET_MY_MEMES, SET_USER_PROFILE } from "./constants"

export const getUserProfile = () => ({
    type: GET_USER_PROFILE,
})

export const setUserProfile = (userProfile) => ({
    type: SET_USER_PROFILE,
    userProfile
})

export const getMyMemes = () => ({
    type: GET_MY_MEMES
})

export const setMyMemes = (myMemes) => ({
    type: SET_MY_MEMES,
    myMemes
})

export const deleteMyMeme = (id) => ({
    type: DELETE_MY_MEMES,
    id
})