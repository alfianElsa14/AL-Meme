import { produce } from 'immer'
import { SET_MIDTRANS_TOKEN } from './constants';

export const initialState = {
    midtransToken: null
}

export const storedKey = [];

const bePremiumReducer = (state = initialState, action) =>
    produce(state, (draft) => {
        switch (action.type) {
            case SET_MIDTRANS_TOKEN:
                draft.midtransToken = action.midtransToken
                break;
            default:
                break;
        }
    })

export default bePremiumReducer;