import { deleteMyMeme, getMyMemes, userById } from "@domain/api";
import { call, put, takeLatest } from "redux-saga/effects";
import { setMyMemes, setUserProfile } from "./actions";
import { DELETE_MY_MEMES, GET_MY_MEMES, GET_USER_PROFILE } from "./constants";
import Swal from 'sweetalert2';

export function* doGetUserProfile() {
    try {
        const response = yield call(userById)
        yield put(setUserProfile(response))
    } catch (error) {
        if (error?.response?.data) {
            const errorMessage = error?.response?.data?.message || "Data must be filled in";
            Swal.fire(errorMessage);
        } else {
            Swal.fire("Internal Server Error");
        }
    }
}

export function* doGetMyMemes() {
    try {
        const response = yield call(getMyMemes)
        yield put(setMyMemes(response))
    } catch (error) {
        if (error?.response?.data) {
            const errorMessage = error?.response?.data?.message || "Data must be filled in";
            Swal.fire(errorMessage);
        } else {
            Swal.fire("Internal Server Error");
        }
    }
}

export function* doDeleteMyMeme({ id }) {
    try {
        const result = yield Swal.fire({
            title: 'Are you sure',
            text: 'To delete this Meme?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        });

        if (result.isConfirmed) {
            yield call(deleteMyMeme, id);
            Swal.fire({
                title: 'Deleted!',
                text: 'Your Meme has been deleted.',
                icon: 'success',
            });
            const response = yield call(getMyMemes)
            yield put(setMyMemes(response))
        }
    } catch (error) {
        if (error?.response?.data) {
            const errorMessage = error?.response?.data?.message || "Data must be filled in";
            Swal.fire(errorMessage);
        } else {
            Swal.fire("Internal Server Error");
        }
    }
}

export function* profileSaga() {
    yield takeLatest(GET_USER_PROFILE, doGetUserProfile)
    yield takeLatest(GET_MY_MEMES, doGetMyMemes)
    yield takeLatest(DELETE_MY_MEMES, doDeleteMyMeme)
}