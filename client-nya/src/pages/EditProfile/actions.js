export const EDIT_USER = 'EditUser/EDIT_USER'

export const editUser = (data, navigate) => ({
    type: EDIT_USER,
    data,
    navigate
})