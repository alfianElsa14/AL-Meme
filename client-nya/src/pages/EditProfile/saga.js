import { setUser } from "@containers/Client/actions";
import { editUser, userById } from "@domain/api";
import { setUserProfile } from "@pages/Profile/actions";
import { call, put, takeLatest } from "redux-saga/effects";
import Swal from "sweetalert2";
import { EDIT_USER } from "./constants";

export function* doEditUser({ data, navigate }) {
    try {
        const response = yield call(editUser, data)
        Swal.fire("sukses edit profile");
        const result = yield call(userById)
        yield put(setUser({data: result}))
        yield put(setUserProfile(result))
        yield call(navigate, '/profile')
    } catch (error) {
        console.log(error.response.status);
        if (error.response.status === 400) {
            const errorMessage = error.response.data.message || "Email or Password required";
            Swal.fire(errorMessage);
        } else {
            Swal.fire("failed edit profile");
        }
    }
}

export function* editSaga() {
    yield takeLatest(EDIT_USER, doEditUser)
}