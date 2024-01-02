import { addComment, addLike, addMyMeme, deleteComment, generateMeme, getAllComment, getLike, getMemeById, getMyMemes, removeLike } from '@domain/api';
import { call, put, takeLatest } from 'redux-saga/effects';
import Swal from 'sweetalert2';
import { setAllComment, setBoxMeme, setImageMeme, setLike, setMemeById } from './actions';
import { ADD_COMMENT, ADD_LIKE, ADD_MY_MEMES, DELETE_COMMENT, GENERATE_MEME, GET_ALL_COMMENTS, GET_LIKE, GET_MEME_BY_ID, REMOVE_LIKE } from './constants';
import { setLoading } from '@containers/App/actions';
import { setMyMemes } from '@pages/Profile/actions';

const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
    }
});

export function* doGetMemeById({ id }) {
    yield put(setLoading(true))
    try {
        const response = yield call(getMemeById, id)
        yield put(setMemeById(response))
        yield put(setBoxMeme(response.meme.boxCount))
        yield put(setImageMeme(response.resultImage))
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

export function* doGenerateMeme({ id, data }) {
    yield put(setLoading(true))
    try {
        const result = yield call(generateMeme, id, data)
        yield put(setImageMeme(result.data.url))
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

export function* doGetAllComment({ id }) {
    try {
        const response = yield call(getAllComment, id)
        yield put(setAllComment(response.comments))
    } catch (error) {
        if (error?.response?.data) {
            const errorMessage = error?.response?.data?.message || "Data must be filled in";
            Swal.fire(errorMessage);
        } else {
            Swal.fire("Internal Server Error");
        }
    }
}

export function* doAddComment({ id, data }) {
    try {
        yield call(addComment, id, data)
        const result = yield call(getAllComment, id)
        yield put(setAllComment(result))
    } catch (error) {
        if (error?.response?.data) {
            const errorMessage = error?.response?.data?.message || "Data must be filled in";
            Swal.fire(errorMessage);
        } else {
            Swal.fire("Internal Server Error");
        }
    }
}

export function* doDeleteComment({ commentId, memeId }) {
    try {
        const result = yield Swal.fire({
            title: 'Are you sure',
            text: 'To delete this comment?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        });

        if (result.isConfirmed) {
            yield call(deleteComment, commentId);
            Swal.fire({
                title: 'Deleted!',
                text: 'Your comment has been deleted.',
                icon: 'success',
            });
            const updatedComment = yield call(getAllComment, memeId);
            yield put(setAllComment(updatedComment));
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

export function* doGetLike({ id }) {
    try {
        const result = yield call(getLike, id)
        yield put(setLike(result))
    } catch (error) {
        if (error?.response?.data) {
            const errorMessage = error?.response?.data?.message || "Data must be filled in";
            Swal.fire(errorMessage);
        } else {
            Swal.fire("Internal Server Error");
        }
    }
}

export function* doAddLike({ id }) {
    try {
        yield call(addLike, id)
        const result = yield call(getLike, id)
        yield put(setLike(result))
    } catch (error) {
        if (error?.response?.data) {
            const errorMessage = error?.response?.data?.message || "Data must be filled in";
            Swal.fire(errorMessage);
        } else {
            Swal.fire("Internal Server Error");
        }
    }
}

export function* doRemoveLike({ id }) {
    try {
        yield call(removeLike, id)
        const result = yield call(getLike, id)
        yield put(setLike(result))
    } catch (error) {
        if (error?.response?.data) {
            const errorMessage = error?.response?.data?.message || "Data must be filled in";
            Swal.fire(errorMessage);
        } else {
            Swal.fire("Internal Server Error");
        }
    }
}

export function* doAddMyMemes({ id, data, navigate }) {
    try {
        const response = yield call(addMyMeme, id, data)
        Toast.fire({
            icon: "success",
            title: "Memes telah di tambahkan"
        });

        const result = yield call(getMyMemes)
        yield put(setMyMemes(result))
        yield call(navigate, '/profile')
    } catch (error) {
        
        if (error?.response.status === 400) {
            const errorMessage = error.response.data.message || "Data must be filled in";
            Swal.fire(errorMessage);
        } else {
            Swal.fire("failed to add data");
        }
    }
}


export function* memeDetailSaga() {
    yield takeLatest(GET_MEME_BY_ID, doGetMemeById)
    yield takeLatest(GENERATE_MEME, doGenerateMeme)
    yield takeLatest(GET_ALL_COMMENTS, doGetAllComment)
    yield takeLatest(ADD_COMMENT, doAddComment)
    yield takeLatest(DELETE_COMMENT, doDeleteComment)
    yield takeLatest(GET_LIKE, doGetLike)
    yield takeLatest(ADD_LIKE, doAddLike)
    yield takeLatest(REMOVE_LIKE, doRemoveLike)
    yield takeLatest(ADD_MY_MEMES, doAddMyMemes)
}