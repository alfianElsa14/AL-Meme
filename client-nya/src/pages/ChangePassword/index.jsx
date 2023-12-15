import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import { changePasswordUser } from './actions';

import classes from './style.module.scss';

function ChangePassword() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(changePasswordUser({ oldPassword, newPassword }, navigate));
  };

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.title}>
          <FormattedMessage id='app_change_password' />
        </div>
        <form onSubmit={handleSubmit}>
          <div className={classes.inputItem}>
            <label htmlFor="oldPassword">
              <FormattedMessage id='app_old_password' /> :
            </label>
            <input
              type="password"
              id="oldPassword"
              name="oldPassword"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          <div className={classes.inputItem}>
            <label htmlFor="newPassword">
              <FormattedMessage id='app_new_password' /> :
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <button type="submit" className={classes.buttonLogin}>
            <FormattedMessage id='app_save' />
          </button>
        </form>
      </div>
    </div>
  )
}

export default ChangePassword