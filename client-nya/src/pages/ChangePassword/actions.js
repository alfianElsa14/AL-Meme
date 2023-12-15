import { CHANGE_PASSWORD_USER } from "./constants";

export const changePasswordUser = (data, navigate) => ({
    type: CHANGE_PASSWORD_USER,
    data,
    navigate
})