import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import { calculateTimeDifference } from '@utils/calculateDate';
import { addComment, deleteComment } from '@pages/MemeDetail/actions';
import config from '@config/index';

import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import classes from './style.module.scss'

function Comment({comments, userId}) {
    const dispatch = useDispatch()
    const { id } = useParams()
    const [newComment, setNewComment] = useState('');

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        dispatch(addComment(id, { comment: newComment }));
        setNewComment('');
    };

    const handleDelete = (commentId) => {
        dispatch(deleteComment(commentId, id))
    }
    return (
        <div className={classes.comment}>
            <h4><FormattedMessage id='app_comments' /></h4>
            {
                comments?.map((el) => (
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
                                            {value} <FormattedMessage id={`app_${unit}`} /> <FormattedMessage id="app_ago" />
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
    )
}

export default Comment