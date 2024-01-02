import { REGISTER_USER } from "@containers/Client/constants";
import CryptoJS from "crypto-js";
import { register } from "@domain/api";
import { call, takeLatest } from "redux-saga/effects";
import Swal from "sweetalert2";
import config from "@config/index";

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

export function* doRegister({ data, navigate }) {
    try {
        data.set('password', CryptoJS.AES.encrypt(data.get('password'), config.api.cryptoEnc).toString())
        
        const response = yield call(register, data);
        if (!response) {
            Swal.fire("Registration failed. Please try again.");
        } else {
            Toast.fire({
                icon: "success",
                title: "Register in successfully"
            });
            yield call(navigate, '/login')
        }
    } catch (error) {
        
        if (error.response.status === 400) {
            const errorMessage = error.response.data.message || "Data must be filled in";
            Swal.fire(errorMessage);
        } else {
            Swal.fire("failed register");
        }
    }
}

export default function* registerSaga() {
    yield takeLatest(REGISTER_USER, doRegister)
    
}