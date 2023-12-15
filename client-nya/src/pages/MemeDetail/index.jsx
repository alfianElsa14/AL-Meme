import React, { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { useNavigate, useParams } from 'react-router-dom';

import { selectBox, selectComment, selectImageMeme, selectLike, selectMeme } from './selector';
import { addComment, addLike, addMyMemes, deleteComment, generateMeme, getAllComment, getLike, getMemeById, removeLike } from './actions';
import { selectRole, selectUser } from '@containers/Client/selectors';
import { calculateTimeDifference } from '@utils/calculateDate';
import config from '@config/index';
import { selectMyMeme, selectUserProfile } from '@pages/Profile/selector';

import DeleteIcon from '@mui/icons-material/Delete';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { IconButton } from '@mui/material';
import Swal from 'sweetalert2';
import classes from './style.module.scss'

function MemeDetail({ comments, meme, user, box, imageMeme, likes, myMemes, role }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { id } = useParams()
    const userId = user.data.id

    const [textInputs, setTextInputs] = useState(Array(box).fill(''));
    const [newComment, setNewComment] = useState('');
    const [memeTitle, setMemeTitle] = useState(meme.title || '');

    const handleAddMyMeme = () => {
        if (myMemes.length === 5 && role !== 'premium') {
            Swal.fire('Limit anda sudah habis');
            navigate('/bePremium');
        } else {
            const data = {
                title: memeTitle,
                imageUrl: imageMeme,
            };

            dispatch(addMyMemes(id, data, navigate));
        }
    };

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        dispatch(addComment(id, { comment: newComment }));
        setNewComment('');
    };


    const handleDelete = (commentId) => {
        dispatch(deleteComment(commentId, id))
    }

    const userLiked = likes?.dataLike?.some((like) => like?.userId === userId);

    const handleLikeSubmit = () => {
        if (userLiked) {
            dispatch(removeLike(id));
        } else {
            dispatch(addLike(id));
        }
    }

    useEffect(() => {
        dispatch(getMemeById(id));
        dispatch(getAllComment(id));
        dispatch(getLike(id))
    }, [id])

    const inputArray = new Array(box).fill(null);

    const handleGenerate = () => {
        const data = {
            text0: textInputs[0],
            text1: textInputs[1],
            text2: textInputs[2],
            text3: textInputs[3],
            text4: textInputs[4],
            text5: textInputs[5],
        };

        dispatch(generateMeme(id, data));
    };

    const handleTextInputChange = (index, value) => {
        const newTextInputs = [...textInputs];
        newTextInputs[index] = value;
        setTextInputs(newTextInputs);
    };

    return (
        <div className={classes.container}>
            <h1><FormattedMessage id='app_generate_meme' /></h1>
            <div className={classes.content}>
                <div className={classes.header}>
                    <img src={imageMeme} alt="" />
                    <div className={classes.like}>
                        {userLiked ? (
                            <ThumbUpAltIcon
                                onClick={handleLikeSubmit}
                                className={classes.iconLike}
                            />
                        ) : (
                            <ThumbUpOffAltIcon
                                onClick={handleLikeSubmit}
                                className={classes.iconLike}
                            />
                        )}
                        <p>{likes.like} <FormattedMessage id='app_likes' /></p>
                    </div>
                </div>
                <div className={classes.formContainer}>
                    <h3><FormattedMessage id='app_create_meme' /></h3>
                    <form className={classes.form} action="">
                        <label htmlFor="">
                            <FormattedMessage id='app_title' /> :</label>
                        <input
                            type="text"
                            value={memeTitle}
                            onChange={(e) => setMemeTitle(e.target.value)}
                        />
                        {inputArray.map((_, index) => (
                            <div key={index} className={classes.formText}>
                                <label htmlFor={`text${index + 1}`}>{`text ${index + 1}`}</label>
                                <input
                                    type="text"
                                    id={`text${index + 1}`}
                                    value={textInputs[index]}
                                    onChange={(e) => handleTextInputChange(index, e.target.value)} />
                            </div>
                        ))}
                    </form>
                    <div className={classes.button}>
                        <button className={classes.generate}
                            onClick={handleGenerate} >
                            <FormattedMessage id='app_generate' />
                        </button>
                        <button
                            className={classes.add}
                            onClick={handleAddMyMeme}>
                            <FormattedMessage id='app_add' />
                        </button>
                    </div>
                </div>
            </div>
            <div className={classes.comment}>
                <h4><FormattedMessage id='app_comments' /></h4>
                {
                    comments.map((el) => (
                        <div key={el.id} className={classes.commentList}>
                            <div className={classes.userComment}>
                                <div className={classes.picture}>
                                    <img src={`${config.api.host}${el.User.imageUrl}`} alt="" />
                                </div>
                                <div className={classes.isiComment}>
                                    <p className={classes.username}>{el.User.username}</p>
                                    <div className={classes.many}>{el.comment}</div>
                                </div>
                            </div>
                            <div className={classes.date}>
                                {
                                    (() => {
                                        const { value, unit } = calculateTimeDifference(el.createdAt);
                                        return (
                                            <p>
                                                <span>
                                                    {value} <FormattedMessage id={`app_${unit}`} /> <FormattedMessage id="app_ago" />
                                                </span>
                                            </p>
                                        );
                                    })()
                                }
                                {
                                    userId === el.User.id && (
                                        <IconButton
                                            onClick={() => handleDelete(el.id)}>
                                            <DeleteIcon className={classes.delete} />
                                        </IconButton>
                                    )
                                }
                            </div>
                        </div>
                    ))
                }
                <form action="" className={classes.formComment}
                    onSubmit={handleCommentSubmit} >
                    <textarea
                        className={classes.formText}
                        name=""
                        id=""
                        cols="30"
                        rows="10"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    />
                    <button type='submit'><FormattedMessage id="app_comments" /></button>
                </form>
            </div>
        </div>
    )
}


MemeDetail.propTypes = {
    meme: PropTypes.object,
    box: PropTypes.number,
    imageMeme: PropTypes.string,
    comments: PropTypes.array,
    user: PropTypes.object,
    userProfile: PropTypes.object,
    likes: PropTypes.object,
    myMemes: PropTypes.array,
    role: PropTypes.string

};

const mapStateToProps = createStructuredSelector({
    meme: selectMeme,
    box: selectBox,
    imageMeme: selectImageMeme,
    comments: selectComment,
    user: selectUser,
    likes: selectLike,
    userProfile: selectUserProfile,
    myMemes: selectMyMeme,
    role: selectRole
});

export default connect(mapStateToProps)(MemeDetail);
