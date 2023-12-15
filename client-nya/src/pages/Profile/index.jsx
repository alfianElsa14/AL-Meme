import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom'
import { createStructuredSelector } from 'reselect'
import { connect, useDispatch } from 'react-redux'
import { FormattedMessage } from 'react-intl';

import { selectRole, selectUser } from '@containers/Client/selectors';
import { selectMyMeme, selectUserProfile } from './selector';
import { deleteMyMeme, getMyMemes, getUserProfile } from './actions';
import config from '@config/index';
import calculateCountdown from '@utils/calculateCountdown';
import { updateStatusUser } from '@pages/BePremium/actions';

import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import Swal from 'sweetalert2';
import { Tooltip } from '@mui/material';
import classes from './style.module.scss'

function Profile({ user, userProfile, myMemes, role }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const userData = user.data
    const fileInputRef = useRef(null);
    const [countdown, setCountdown] = useState(null);


    const handleToEditMeme = (memeId) => {
        if (role !== 'premium') {
            Swal.fire('Fitur hanya untuk premium');
            navigate('/bePremium');
        } else {
            navigate(`/editMeme/${memeId}`);
        }
    };

    const handleDeleteMeme = (memeId) => {
        dispatch(deleteMyMeme(memeId))
    }

    const handleDownload = (imageUrl, fileName) => {
        const downloadImage = async () => {
            try {
                const response = await fetch(imageUrl, {
                    method: 'GET',
                    headers: {},
                });

                const buffer = await response.arrayBuffer();
                const url = window.URL.createObjectURL(new Blob([buffer]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', fileName);
                document.body.appendChild(link);
                link.click();
            } catch (err) {
                console.log(err);
            }
        };

        downloadImage();
    };


    useEffect(() => {
        dispatch(getUserProfile())
        dispatch(getMyMemes())

        calculateCountdown(userProfile, setCountdown);
        let interval;
        if (countdown?.days >= 0 && countdown?.hours >= 0 && countdown?.minutes >= 0 && countdown?.seconds >= 0) {
            interval = setInterval(() => {
                calculateCountdown(userProfile, setCountdown);
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [userProfile.role, userProfile.premiumDate])

    useEffect(() => {
        if (countdown?.days === 0 && countdown?.hours === 0 && countdown?.minutes === 0 && countdown?.seconds === 0) {
            if (role === 'premium') {
                console.log(role, "ke panggil");
                if (userProfile.role === 'premium') {
                    dispatch(updateStatusUser(() => navigate('/')));
                } else {
                    console.log("Pengguna sudah menjadi basic");
                }

                setCountdown(null);
            }
        }
    }, [countdown, role, userProfile.role])

    return (
        <div className={classes.container}>
            <div className={classes.profileWrapper}>
                <div>
                    <img src={`${config.api.host}${userProfile.imageUrl}`} alt="Profile" className={classes.img} />
                </div>
                <div className={classes.name}>{userProfile.username}</div>
                <div className={classes.email}>{userProfile.email}</div>
                <div className={classes.role}>{userProfile.role}</div>
                {
                    userProfile.role !== 'premium' && (
                        <button
                            onClick={() => navigate('/bePremium')}
                            className={classes.bePremium}>
                            <FormattedMessage id='app_be_premium' />
                        </button>
                    )
                }
                {role === 'premium' && countdown && (
                    <div className={classes.countdown}>
                        <div> <FormattedMessage id='app_premium_ended' /> </div>
                        <div>
                            {Math.max(0, countdown.days)} <FormattedMessage id='app_days' />{' '}
                            {Math.max(0, countdown.hours)} <FormattedMessage id='app_hours' />{' '}
                            {Math.max(0, countdown.minutes)} <FormattedMessage id='app_minutes' />{' '}
                            {Math.max(0, countdown.seconds)} <FormattedMessage id='app_seconds' />
                        </div>
                    </div>
                )}
                <button onClick={() => navigate('/editProfile')}>
                    <FormattedMessage id='app_edit_profile' />
                </button>
                <button onClick={() => navigate('/changePassword')}>
                    <FormattedMessage id='app_change_password' />
                </button>
            </div>
            <div className={classes.cardContainer}>
                <h1><FormattedMessage id='app_my_meme_list' /></h1>
                {
                    role !== 'premium' ? (
                        <p className={classes.memeCount}>{myMemes.length}/5 meme's</p>
                    ) : (
                        <p className={classes.memeCount}>{myMemes.length}/- meme's</p>
                    )
                }
                <div className={classes.card}>
                    {
                        myMemes.map((el) => (
                            <div key={el.id} className={classes.cardList}
                            >
                                <img src={el.imageUrl} alt="" />
                                <div className={classes.data}>
                                    <p className={classes.title}>{el.title}</p>
                                    <p className={classes.status}>{el.Meme.status}</p>
                                </div>
                                <div className={classes.button}>
                                    <Tooltip title="Delete">
                                        <DeleteIcon
                                            className={classes.delete}
                                            onClick={() => { handleDeleteMeme(el.id) }}
                                        />
                                    </Tooltip>
                                    <Tooltip title="Edit">
                                        <BorderColorIcon
                                            className={classes.edit}
                                            onClick={() => handleToEditMeme(el.id)}
                                        />
                                    </Tooltip>
                                    <Tooltip title="Download">
                                        <DownloadIcon
                                            className={classes.download}
                                            onClick={() => handleDownload(el.imageUrl, `${el.title}.jpg`)}
                                        />
                                    </Tooltip>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

Profile.propTypes = {
    user: PropTypes.object,
    userProfile: PropTypes.object,
    myMemes: PropTypes.array,
    role: PropTypes.string,

};

const mapStateToProps = createStructuredSelector({
    user: selectUser,
    userProfile: selectUserProfile,
    myMemes: selectMyMeme,
    role: selectRole,
});

export default connect(mapStateToProps)(Profile);