import { createSelector } from 'reselect';
import { initialState  } from './reducer';

const selectBePremiumState = (state) => state.bePremium || initialState;

export const selectMidtransToken = createSelector(selectBePremiumState, (state) => state.midtransToken)