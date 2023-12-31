import { editMyMeme, generateMeme, getMyMemeById, getMyMemes } from "@domain/api";
import { setMyMemes } from "@pages/Profile/actions";
import { call, put, takeLatest } from "redux-saga/effects";
import { EDIT_MEME, GENERATE_EDIT_MEME, GET_MY_MEME_BY_ID } from "./constants";
import { setBoxEdit, setImageEdit, setMyMemeById } from "./actions";
import Swal from "sweetalert2";
import { setLoading } from "@containers/App/actions";

export function* doEditMeme({ id, data, navigate }) {
    try {
        const response = yield call(editMyMeme, id, data, navigate)
        Swal.fire("sukses edit meme");
        const result = yield call(getMyMemes)
        yield put(setMyMemes(result))
        yield call(navigate, '/profile')
    } catch (error) {
        if (error.response.status === 400) {
            const errorMessage = error.response.data.message || "Email or Password required";
            Swal.fire(errorMessage);
        } else {
            Swal.fire("failed edit profile");
        }
    }
}

export function* doGenerateEditMeme({ id, data }) {
    yield put(setLoading(true))
    try {
        const result = yield call(generateMeme, id, data)
        yield put(setImageEdit(result.data.url))
    } catch (error) {
        if (error?.response?.data) {
            const errorMessage = error?.response?.data?.message || "Data must be filled in";
            Swal.fire(errorMessage);
        } else {
            Swal.fire("Internal Server Error");
        }
    }
    yield put(setLoading(false))
}


export function* doGetMyMemeById({ id }) {
    yield put(setLoading(true))
    try {
        const response = yield call(getMyMemeById, id)
        yield put(setMyMemeById(response))
        yield put(setBoxEdit(response.Meme.boxCount))
        yield put(setImageEdit(response.imageUrl))
    } catch (error) {
        if (error?.response?.data) {
            const errorMessage = error?.response?.data?.message || "Data must be filled in";
            Swal.fire(errorMessage);
        } else {
            Swal.fire("Internal Server Error");
        }
    }
    yield put(setLoading(false))
}

export function* editMemeSaga() {
    yield takeLatest(EDIT_MEME, doEditMeme)
    yield takeLatest(GET_MY_MEME_BY_ID, doGetMyMemeById)
    yield takeLatest(GENERATE_EDIT_MEME, doGenerateEditMeme)
}