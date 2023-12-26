import React from 'react';
import { useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { useParams } from 'react-router-dom';

import { addLike, removeLike } from '@pages/MemeDetail/actions';

import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import classes from './style.module.scss';

function Like({ likes, userId }) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const userLiked = likes?.dataLike?.some((like) => like?.userId === userId);

  const handleLikeSubmit = () => {
    if (userLiked) {
      dispatch(removeLike(id));
    } else {
      dispatch(addLike(id));
    }
  };

  return (
    <div
      data-testid="Like"
      className={classes.like}>
      {userLiked ? (
        <ThumbUpAltIcon onClick={handleLikeSubmit} className={classes.iconLike} />
      ) : (
        <ThumbUpOffAltIcon onClick={handleLikeSubmit} className={classes.iconLike}
          data-testid="iconLike"
        />
      )}
      <p>
        {likes?.like} <FormattedMessage id='app_likes' />
      </p>
    </div>
  );
}

export default Like;
