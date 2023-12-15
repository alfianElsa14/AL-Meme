import { all } from 'redux-saga/effects';

import appSaga from '@containers/App/saga';
import { loginSaga } from '@pages/Login/saga';
import registerSaga from '@pages/Register/saga';
import { homeSaga } from '@pages/Home/saga';
import { memeDetailSaga } from '@pages/MemeDetail/saga';
import { profileSaga } from '@pages/Profile/saga';
import { editSaga } from '@pages/EditProfile/saga';
import { changePasswordSaga } from '@pages/ChangePassword/saga';
import { editMemeSaga } from '@pages/EditMeme/saga';
import { bePremiumSaga } from '@pages/BePremium/saga';

export default function* rootSaga() {
  yield all([
    appSaga(),
    loginSaga(),
    registerSaga(),
    homeSaga(),
    memeDetailSaga(),
    profileSaga(),
    editSaga(),
    changePasswordSaga(),
    editMemeSaga(),
    bePremiumSaga(),
  ]);
}
