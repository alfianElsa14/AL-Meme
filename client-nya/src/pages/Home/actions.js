import { GET_ALL_MEME, SET_ALL_MEME, SET_MEMES_COUNT } from "./constants";

export const getAllMeme = (page) => ({
    type: GET_ALL_MEME,
    page
})

export const setAllMeme = (memes) => ({
    type: SET_ALL_MEME,
    memes
})

export const setMemesCount = (memesCount) => ({
    type: SET_MEMES_COUNT,
    memesCount
})