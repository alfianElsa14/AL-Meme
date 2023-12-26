import React, { useState } from 'react'
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { googleLogin, loginUser } from '@containers/Client/actions';

import GoogleIcon from '@mui/icons-material/Google';
import classes from './style.module.scss'

function FormLogin() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(loginUser({ email, password }));
    }

    const handleGoogleLogin = () => {
        dispatch(googleLogin());
    };
    return (
        <div
            className={classes.formContainer}
            data-testid="formContainer"
        >
            <h3><FormattedMessage id="app_login" /></h3>
            <div className={classes.form}>
                <form action="" onSubmit={handleLogin}
                    className={classes.formLogin}
                    data-testid="formLogin"
                >
                    <label htmlFor="">Email :</label>
                    <input
                        data-testid="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                    <label htmlFor="">Password :</label>
                    <input
                        data-testid="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                    <button type='submit'>
                        <FormattedMessage id="app_login" />
                    </button>
                </form>
                <button
                    data-testid="google"
                    onClick={handleGoogleLogin}
                    className={classes.googleButton}
                >
                    <GoogleIcon />
                    <FormattedMessage id="app_login_with_google" />
                </button>
            </div>
            <p>
                <FormattedMessage id="app_dont_have_account" />
                click <span
                    data-testid="toRegister"
                    onClick={() => navigate('/register')}
                >
                    <FormattedMessage id="app_here" />
                </span>
            </p>
        </div>
    )
}

export default FormLogin