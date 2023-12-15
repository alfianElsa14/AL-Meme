import { ADD_COMMENT, ADD_LIKE, ADD_MY_MEMES, DELETE_COMMENT, GENERATE_MEME, GET_ALL_COMMENTS, GET_LIKE, GET_MEME_BY_ID, REMOVE_LIKE, SET_ALL_COMMENTS, SET_BOX_MEME, SET_IMAGE_MEME, SET_LIKE, SET_MEME_BY_ID } from "./constants";

export const getMemeById = (id) => ({
    type: GET_MEME_BY_ID,
    id
})

export const setMemeById = (meme) => ({
    type: SET_MEME_BY_ID,
    meme
})

export const setBoxMeme = (box) => ({
    type: SET_BOX_MEME,
    box
})

export const setImageMeme = (imageMeme) => ({
    type: SET_IMAGE_MEME,
    imageMeme
})

export const generateMeme = (id, data) => ({
    type: GENERATE_MEME,
    id,
    data
})

export const getAllComment = (id) => ({
    type: GET_ALL_COMMENTS,
    id
})

export const setAllComment = (comments) => ({
    type: SET_ALL_COMMENTS,
    comments
})

export const addComment = (id, data) => ({
    type: ADD_COMMENT,
    id,
    data
})

export const deleteComment = (commentId, memeId) => ({
    type: DELETE_COMMENT,
    commentId,
    memeId
})

export const getLike = (id) => ({
    type: GET_LIKE,
    id
})

export const setLike = (likes) => ({
    type: SET_LIKE,
    likes
})

export const addLike = (id) => ({
    type: ADD_LIKE,
    id
})

export const removeLike= (id) => ({
    type: REMOVE_LIKE,
    id
})

export const addMyMemes = (id, data, navigate) => ({
    type: ADD_MY_MEMES,
    id,
    data,
    navigate
})

