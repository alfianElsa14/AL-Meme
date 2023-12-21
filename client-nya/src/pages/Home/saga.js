import { GET_ALL_MEME } from "./constants";

import { getAllMeme } from "@domain/api";
import { call, delay, put, takeLatest } from 'redux-saga/effects';
import { setAllMeme, setMemesCount } from "./actions";
import { setLoading } from "@containers/App/actions";

function* setLoadingWithInterval(value, interval) {
    yield put(setLoading(value));

    yield delay(interval);

    yield put(setLoading(false));
}

function* doGetAllMeme({ page }) {
    yield put(setLoading(true))
    try {
        yield* setLoadingWithInterval(true, 1000);
        const response = yield call(getAllMeme, page)
        yield put(setAllMeme(response.rows))
        yield put(setMemesCount(response.count))
    } catch (error) {
        console.error(error);
    }
    yield put(setLoading(false))
}

export function* homeSaga() {
    yield takeLatest(GET_ALL_MEME, doGetAllMeme)
}