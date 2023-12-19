import React from 'react'

import FormRegister from '@components/FormRegister';

import classes from './style.module.scss'

function Register() {
    return (
        <div className={classes.container}>
            <div className={classes.content}>
                <div className={classes.image}>
                    <img src="https://c4.wallpaperflare.com/wallpaper/883/544/851/abstract-colorful-wallpaper-preview.jpg" alt="" />
                </div>
                <FormRegister />
            </div>
        </div>
    )
}

export default Register