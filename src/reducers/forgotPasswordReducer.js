import { PASSWORD_SENT_REQUEST, SENT_SUCCESSFUL, SENT_FAILED, NO_INTERNET } from '../actionTypes/types'


const initialState = {
    data: {},
    isLoading: false,
    sentSuccessfully: false,
    error: false
}


export default function forgotPasswordReducer(state = initialState, action) {

    switch (action.type) {
        case PASSWORD_SENT_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: false
            }
        case SENT_SUCCESSFUL:
            return {
                ...state,
                sentSuccessfully: true,
                isLoading: false,
                data: action.payload,
                error: false
            }
        case SENT_FAILED:
            return {
                ...state,
                isLoading: false,
                sentSuccessfully: false,
                data: action.payload,
                error: true,
            }
        case NO_INTERNET:
            return {
                ...state,
                isLoading: false,
                sentSuccessfully: false,
                noInternet: true,
               

            }
        default:
            return state
    }
} 