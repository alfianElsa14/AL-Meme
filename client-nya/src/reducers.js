import { combineReducers } from 'redux';

import appReducer, { storedKey as storedAppState } from '@containers/App/reducer';
import clientReducer, { storedKey as storedClientState } from '@containers/Client/reducer';
import languageReducer from '@containers/Language/reducer';
import homeReducer from '@pages/Home/reducer';
import memeDetailReducer from '@pages/MemeDetail/reducer';
import profileReducer from '@pages/Profile/reducer';
import editMemeReducer from '@pages/EditMeme/reducer';
import bePremiumReducer from '@pages/BePremium/reducer';

import { mapWithPersistor } from './persistence';

const storedReducers = {
  app: { reducer: appReducer, whitelist: storedAppState },
  client: { reducer: clientReducer, whitelist: storedClientState },
  home: { reducer: homeReducer },
  memeDetail: { reducer: memeDetailReducer },
  profile: { reducer: profileReducer },
  editMeme: { reducer: editMemeReducer },
  bePremium: { reducer: bePremiumReducer },
};

const temporaryReducers = {
  language: languageReducer,
};

const createReducer = () => {
  const coreReducer = combineReducers({
    ...mapWithPersistor(storedReducers),
    ...temporaryReducers,
  });
  const rootReducer = (state, action) => coreReducer(state, action);
  return rootReducer;
};

export default createReducer;
