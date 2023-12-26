import { midtransPayment, updateStatusUser } from "@domain/api";
import { call, put, takeLatest } from "redux-saga/effects";
import { setMidtransToken } from "./actions";
import { MIDTRANS_PAYMENT, UPDATE_STATUS_USER } from "./constants";
import { setRole, setToken, setUser } from "@containers/Client/actions";
import { setLoading } from "@containers/App/actions";
import Swal from "sweetalert2";

export function* doMidtransPayment({ cbSuccess }) {
    try {
        const result = yield call(midtransPayment)
        yield put(setMidtransToken(result.token))

        window.snap.pay(result.token, {
            onSuccess: () => {
                cbSuccess && cbSuccess()
            },
            onPending: function (result) {
                console.log('Pembayaran tertunda:', result);
            },
            onError: function (result) {
                console.log('Pembayaran gagal:', result);
            },
            onClose: function () {
                console.log('Widget ditutup tanpa menyelesaikan pembayaran');
            }
        });
    } catch (error) {
        console.log(error.response.status);
        if (error.response.status === 400) {
            const errorMessage = error.response.data.message || "Email or Password required";
            Swal.fire(errorMessage);
        } else {
            Swal.fire("Request Failed");
        }
    }
}

export function* doUpdateStatusUser({ navigate }) {
    yield put(setLoading(true))
    try {
        const response = yield call(updateStatusUser)
        yield put(setUser(response))
        yield put(setRole(response.data.role))
        yield put(setToken(response.access_token))
        yield call(navigate, '/profile')
    } catch (error) {
        console.log(error);
    }
    yield put(setLoading(false))
}

export function* bePremiumSaga() {
    yield takeLatest(MIDTRANS_PAYMENT, doMidtransPayment)
    yield takeLatest(UPDATE_STATUS_USER, doUpdateStatusUser)
}