import React, { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom'
import { createStructuredSelector } from 'reselect'
import { connect, useDispatch } from 'react-redux'

import { selectLogin } from '@containers/Client/selectors'
import { googleLogin, loginUser } from '@containers/Client/actions';

import GoogleIcon from '@mui/icons-material/Google';
import classes from './style.module.scss'

function Login({ login }) {
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


    useEffect(() => {
        if (login) {
            navigate('/')
        }
    }, [login, navigate])


    return (
        <div className={classes.container}>
            <div className={classes.content}>
                <div className={classes.image}>
                    <img src="https://c4.wallpaperflare.com/wallpaper/883/544/851/abstract-colorful-wallpaper-preview.jpg" alt="" />
                </div>
                <div className={classes.formContainer}>
                    <h3><FormattedMessage id="app_login" /></h3>
                    <div className={classes.form}>
                        <form action="" onSubmit={handleLogin} className={classes.formLogin}>
                            <label htmlFor="">Email :</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} />
                            <label htmlFor="">Password :</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} />
                            <button type='submit'>
                                <FormattedMessage id="app_login" />
                            </button>
                        </form>
                        <button
                            onClick={handleGoogleLogin}
                            className={classes.googleButton}
                        >
                            <GoogleIcon />
                            <FormattedMessage id="app_login_with_google" />
                        </button>
                    </div>
                    <p>
                        <FormattedMessage id="app_dont_have_account" />
                        click <span onClick={() => navigate('/register')}>
                            <FormattedMessage id="app_here" />
                        </span>
                    </p>
                </div>
            </div>
        </div>
    )
}

Login.propTypes = {
    login: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
    login: selectLogin
})

export default connect(mapStateToProps)(Login);