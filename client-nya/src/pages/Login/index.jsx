import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'

import { selectLogin } from '@containers/Client/selectors'


import classes from './style.module.scss'
import FormLogin from '@components/FormLogin';

function Login({ login }) {
    const navigate = useNavigate()

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
                <FormLogin />
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