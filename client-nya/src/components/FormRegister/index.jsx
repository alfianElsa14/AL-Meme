import React, { useState } from 'react'
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { registerUser } from '@containers/Client/actions'

import classes from './style.module.scss'

function FormRegister() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [imageUrl, setImageUrl] = useState(null);
    const [tempImage, setTempImage] = useState(null)

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const gambar = URL.createObjectURL(file);
            setImageUrl(file);
            setTempImage(gambar)
        } else {
            setImageUrl(null);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('username', username);
        formData.append('email', email);
        formData.append('password', password);

        if (imageUrl) {
            formData.append('imageUrl', imageUrl);
        }
        


        dispatch(registerUser(formData, navigate));
    }

    return (
        <div
            className={classes.formContainer}
            data-testid="formContainer"
        >
            <h3><FormattedMessage id="app_register" /></h3>
            <div className={classes.form}>
                <form
                    data-testid="formRegister"
                    onSubmit={handleSubmit} action="" className={classes.formRegister}>
                    <div className={classes.picture}>
                        <img src={tempImage || 'https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg'} alt="" />
                        <label htmlFor="image" className={classes.customFileButton}>
                            <button>
                                <FormattedMessage id="app_change" />
                            </button>
                            <input type="file" id="image"
                                onChange={handleImageChange} name="imageUrl" className={classes.fileInput} />
                        </label>
                    </div>
                    <div className={classes.inputItem}>
                        <label htmlFor="username">
                            <FormattedMessage id="app_username" /> :
                        </label>
                        <input type="text" id="username" name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)} 
                            data-testid="username"
                            />
                    </div>
                    <div className={classes.inputItem}>
                        <label htmlFor="email">
                            Email :
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            data-testid="email"
                        />
                    </div>
                    <div className={classes.inputItem}>
                        <label htmlFor="password">
                            Password :
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            data-testid="password"
                        />
                    </div>
                    <button type="submit">
                        <FormattedMessage id="app_register" />
                    </button>
                </form>
            </div>
            <p>
                <FormattedMessage id="app_already_have_an_account" /> click <span 
                data-testid="toLogin"
                onClick={() => navigate('/login')}>
                    <FormattedMessage id="app_here" />
                </span>
            </p>
        </div>
    )
}

export default FormRegister