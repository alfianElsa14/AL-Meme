import React from 'react'
import { FormattedMessage } from 'react-intl';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { midtransPayment, updateStatusUser } from './actions';

import CheckIcon from '@mui/icons-material/Check';
import classes from './style.module.scss'

function BePremium() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handlePaymentPremium = () => {

        dispatch(midtransPayment(() => {
            dispatch(updateStatusUser(navigate))
        }))

    }

    return (
        <div className={classes.container}>
            <div className={classes.content}>
                <p className={classes.title}><FormattedMessage id='app_be_premium' /></p>
                <p className={classes.header}><FormattedMessage id='app_go_premium' /></p>
                <p className={classes.price}>IDR 20.000<span>/<FormattedMessage id='app_month' /></span></p>
                <div className={classes.profit}>
                    <p><CheckIcon className={classes.check} /><FormattedMessage id='app_access_meme' /></p>
                    <p><CheckIcon className={classes.check} /><FormattedMessage id='app_create_as_many' /></p>
                    <p><CheckIcon className={classes.check} /><FormattedMessage id='app_can_edit_meme' /></p>
                </div>
                <div className={classes.buttonPremium}>
                    <button onClick={handlePaymentPremium}>
                        Go premium
                    </button>
                </div>
            </div>
        </div>
    )
}

export default BePremium