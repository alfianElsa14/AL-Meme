import PropTypes from 'prop-types';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setLocale } from '@containers/App/actions';
import config from '@config/index';
import { logout } from '@containers/Client/actions';

import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Divider, ListItemIcon } from '@mui/material';
import profileIcon from '@static/images/profile.svg';
import logoutIcon from '@static/images/logout.svg';
import classes from './style.module.scss';

const Navbar = ({ login, user, title, locale }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuPosition, setMenuPosition] = useState(null);
  const open = Boolean(menuPosition);

  const [anchorProfile, setAnchorProfile] = useState(null);
  const openDropdownProfile = Boolean(anchorProfile);

  const handleClickProfile = (event) => {
    setAnchorProfile(event.currentTarget);
  };

  const handleCloseDropdown = () => {
    setAnchorProfile(null);
  };

  const handleClick = (event) => {
    setMenuPosition(event.currentTarget);
  };

  const handleClose = () => {
    setMenuPosition(null);
  };

  const onSelectLang = (lang) => {
    if (lang !== locale) {
      dispatch(setLocale(lang));
    }
    handleClose();
  };

  const goHome = () => {
    navigate('/');
  };

  return (
    <div className={classes.headerWrapper} data-testid="navbar">
      <div className={classes.contentWrapper}>
        <div className={classes.logoImage} onClick={goHome}>
          <img src="/rocket.svg" alt="logo" className={classes.logo} />
          <div className={classes.title}>{title}</div>
        </div>
        <div className={classes.toolbar}>
          {login && (
            <div className={classes.profile} onClick={handleClickProfile}>
              {user && user.data.imageUrl ? (
                <img src={`${config.api.host}${user.data.imageUrl}`} alt="" />
              ) : (
                <Avatar className={classes.img} />
              )}
            </div>
          )}
          <div className={classes.toggle} onClick={handleClick}>
            <Avatar className={classes.avatar} src={locale === 'id' ? '/id.png' : '/en.png'} />
            <div className={classes.lang}>{locale}</div>
            <ExpandMoreIcon />
          </div>
        </div>
        <Menu
          anchorEl={anchorProfile}
          id="account-menu"
          open={openDropdownProfile}
          onClose={handleCloseDropdown}
          onClick={handleCloseDropdown}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 2.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 11,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem onClick={() => navigate('/profile')}>
            <ListItemIcon>
              <img src={profileIcon} alt="" className={classes.icon} />
            </ListItemIcon>
            {user && (
              <p>{user.data.username}</p>
            )}
          </MenuItem>
          <Divider />
          <MenuItem onClick={() => dispatch(logout())}>
            <ListItemIcon>
              <img src={logoutIcon} alt="" className={classes.icon} />
            </ListItemIcon>
            <p>log out</p>
          </MenuItem>
        </Menu>
        <Menu open={open} anchorEl={menuPosition} onClose={handleClose}>
          <MenuItem onClick={() => onSelectLang('id')} selected={locale === 'id'}>
            <div className={classes.menu}>
              <Avatar className={classes.menuAvatar} src="/id.png" />
              <div className={classes.menuLang}>
                <FormattedMessage id="app_lang_id" />
              </div>
            </div>
          </MenuItem>
          <MenuItem onClick={() => onSelectLang('en')} selected={locale === 'en'}>
            <div className={classes.menu}>
              <Avatar className={classes.menuAvatar} src="/en.png" />
              <div className={classes.menuLang}>
                <FormattedMessage id="app_lang_en" />
              </div>
            </div>
          </MenuItem>
        </Menu>
      </div>
    </div >
  );
};

Navbar.propTypes = {
  title: PropTypes.string,
  locale: PropTypes.string.isRequired,
  theme: PropTypes.string,
  user: PropTypes.object,
  login: PropTypes.bool.isRequired,
};

export default Navbar;
