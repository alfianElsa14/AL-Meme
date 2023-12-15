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
        console.log(error);
    }
}

export function* doGenerateEditMeme({ id, data }) {
    yield put(setLoading(true))
    try {
        const result = yield call(generateMeme, id, data)
        yield put(setImageEdit(result.data.url))
    } catch (error) {
        console.log(error);
    }
    yield put(setLoading(false))
}


export function* doGetMyMemeById({id}) {
    yield put(setLoading(true))
    try {
        const response = yield call(getMyMemeById, id)
        yield put(setMyMemeById(response))
        yield put(setBoxEdit(response.Meme.boxCount))
        yield put(setImageEdit(response.imageUrl))
    } catch (error) {
        console.log(error);
    }
    yield put(setLoading(false))
}

export function* editMemeSaga() {
    yield takeLatest(EDIT_MEME, doEditMeme)
    yield takeLatest(GET_MY_MEME_BY_ID, doGetMyMemeById)
    yield takeLatest(GENERATE_EDIT_MEME, doGenerateEditMeme)
}