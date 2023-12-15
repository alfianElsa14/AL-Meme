import { setLoading } from "@containers/App/actions";
import { setLogin, setRole, setToken, setUser } from "@containers/Client/actions";
import { GOOGLE_LOGIN, LOGIN_USER } from "@containers/Client/constants";
import { googleLogin, login } from "@domain/api";
import { getAuth, signInWithPopup, GoogleAuthProvider, getIdToken } from "firebase/auth";
import { app } from "@utils/firebaseeConfig";
import { call, put, takeLatest } from "redux-saga/effects";
import Swal from "sweetalert2";

const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 1000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
    }
});

function* doLogin({ data }) {
    yield put(setLoading(true))
    try {
        const response = yield call(login, data)
        if (!response) {
            Swal.fire("Invalid Email, Password")
        } else {
            yield put(setUser(response))
            yield put(setRole(response.data.role))
            yield put(setToken(response.access_token))
            yield put(setLogin(true))
            Toast.fire({
                icon: "success",
                title: "Login in successfully"
            });
        }
    } catch (error) {
        console.log(error.response.status);
        if (error.response.status === 400) {
            const errorMessage = error.response.data.message || "Email or Password required";
            Swal.fire(errorMessage);
        } else {
            Swal.fire("Invalid Email or Password");
        }
    }
    yield put(setLoading(false))
}

export function* doGoogleLogin() {
    try {
        const auth = getAuth(app);
        const provider = new GoogleAuthProvider();

        const result = yield call(() => signInWithPopup(auth, provider));

        const user = result.user;

        const response = yield call(googleLogin, {
            email: user.email,
            username: user.displayName,
            imageUrl: user.photoURL,
        });

        if (!response) {
            Swal.fire('Login Failed');
        } else {
            yield put(setUser(response));
            yield put(setRole(response.data.role));
            yield put(setToken(response.access_token));
            yield put(setLogin(true));
            Toast.fire({
                icon: 'success',
                title: 'Login successful',
            });
        }
    } catch (error) {
        console.log(error);
    }
}

export function* loginSaga() {
    yield takeLatest(LOGIN_USER, doLogin)
    yield takeLatest(GOOGLE_LOGIN, doGoogleLogin)
}