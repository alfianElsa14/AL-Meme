import { changePassword } from "@domain/api"
import { call, takeLatest } from "redux-saga/effects"
import Swal from "sweetalert2";
import { CHANGE_PASSWORD_USER } from "./constants";

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

export function* doChangePasswordUser({ data, navigate }) {
    try {
        const response = yield call(changePassword, data)
        if (response) {
            Toast.fire({
                icon: "success",
                title: "Change Password is successfully"
            });
            yield call(navigate, '/profile')
        }
    } catch (error) {
        console.log(error.response.status);
        if (error.response.status === 400) {
            const errorMessage = error.response.data.message || "Password required";
            Swal.fire(errorMessage);
        } else {
            Swal.fire("failed change password");
        }
    }
}

export function* changePasswordSaga(){
    yield takeLatest(CHANGE_PASSWORD_USER, doChangePasswordUser)
}