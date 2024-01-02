import React, { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectUser } from '@containers/Client/selectors';
import { useNavigate } from 'react-router-dom';
import config from '@config/index';
import { editUser } from './actions';
import { selectUserProfile } from '@pages/Profile/selector';

import classes from './style.module.scss'
import { Avatar } from '@mui/material';


function EditProfile({ userProfile }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [imageUrl, setImageUrl] = useState(null);
    const [tempImage, setTempImage] = useState(null)

    const handleImageChange = (e) => {
        const selectedFile = e.target.files[0];

        if (selectedFile) {
            const gambar = URL.createObjectURL(selectedFile);
            setImageUrl(selectedFile);
            setTempImage(gambar)
        } else {
            setImageUrl(null);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append('username', username);
        formDataToSend.append('email', email);

        if (imageUrl) {
            formDataToSend.append('imageUrl', imageUrl);
        }

        dispatch(editUser(formDataToSend, navigate));
    };

    useEffect(() => {
        if (userProfile) {
            setUsername(userProfile.username || '');
            setEmail(userProfile.email || '');
            setTempImage(userProfile.imageUrl ? `${config.api.host}${userProfile.imageUrl}` : null);
        }
    }, [userProfile]);

    return (
        <div className={classes.container}>
            <div className={classes.wrapper}>
                <h1>
                    <FormattedMessage id='app_edit_profile' />
                </h1>
                <form onSubmit={handleSubmit}>
                    <div className={classes.picture}>
                        <Avatar className={classes.img} src={tempImage || `${config.api.host}${userProfile.imageUrl}` } alt="" />
                        <label htmlFor="imageUrl" className={classes.customFileButton}>
                            <button>
                                <FormattedMessage id='app_change' />
                            </button>
                            <input
                                type="file"
                                id="image"
                                name="imageUrl"
                                onChange={handleImageChange}
                                className={classes.fileInput} />
                        </label>
                    </div>
                    <div className={classes.inputItem}>
                        <label htmlFor="username">
                            <FormattedMessage id='app_username' />
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className={classes.inputItem}>
                        <label htmlFor="email">
                            email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className={classes.readOnly}
                            readOnly
                            value={email}
                        />
                    </div>
                    <button type="submit" className={classes.buttonRegister}>
                        <FormattedMessage id='app_save' />
                    </button>
                </form>
            </div>
        </div>
    )
}

EditProfile.propTypes = {
    user: PropTypes.object,
    userProfile: PropTypes.object
};

const mapStateToProps = createStructuredSelector({
    user: selectUser,
    userProfile: selectUserProfile
});

export default connect(mapStateToProps)(EditProfile);