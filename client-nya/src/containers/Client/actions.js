import { GOOGLE_LOGIN, LOGIN_USER, LOGOUT, REGISTER_USER, SET_LOGIN, SET_ROLE, SET_TOKEN, SET_USER } from '@containers/Client/constants';

export const setLogin = (login) => ({
  type: SET_LOGIN,
  login,
});

export const setToken = (token) => ({
  type: SET_TOKEN,
  token,
});


export const setUser = (user) => ({
  type: SET_USER,
  user
})

export const setRole = (role) => ({
  type: SET_ROLE,
  role
})

export const loginUser = (data) => ({
  type: LOGIN_USER,
  data
})

export const registerUser = (data, navigate) => ({
  type: REGISTER_USER,
  data,
  navigate
})

export const logout = () => ({
  type: LOGOUT,
});

export const googleLogin = () => ({
  type: GOOGLE_LOGIN,
})