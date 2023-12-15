import { EDIT_MEME, GENERATE_EDIT_MEME, GET_MY_MEME_BY_ID, SET_BOX_EDIT, SET_IMAGE_EDIT, SET_MY_MEME_BY_ID } from "./constants";

export const editMyMeme = (id, data, navigate) => ({
    type: EDIT_MEME,
    id,
    data,
    navigate
})

export const generateEditMeme = (id, data) => ({
    type: GENERATE_EDIT_MEME,
    id,
    data
})

export const getMyMemeById = (id) => ({
    type: GET_MY_MEME_BY_ID,
    id
})

export const setMyMemeById = (editMeme) => ({
    type: SET_MY_MEME_BY_ID,
    editMeme
})

export const setBoxEdit = (boxEdit) => ({
    type: SET_BOX_EDIT,
    boxEdit
})

export const setImageEdit = (imageEdit) => ({
    type: SET_IMAGE_EDIT,
    imageEdit
})
