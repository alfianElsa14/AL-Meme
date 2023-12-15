import { MIDTRANS_PAYMENT, SET_MIDTRANS_TOKEN, UPDATE_STATUS_USER } from "./constants"

export const midtransPayment = (cbSuccess) => ({
    type: MIDTRANS_PAYMENT,
    cbSuccess
})

export const setMidtransToken = (midtransToken) => ({
    type: SET_MIDTRANS_TOKEN,
    midtransToken
})

export const updateStatusUser = (navigate) => ({
    type: UPDATE_STATUS_USER,
    navigate
})