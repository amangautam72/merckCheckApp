import { LOGIN_ATTEMPT, LOGIN_SUCCESSFUL, LOGIN_FAILED, NO_INTERNET } from '../actionTypes/types'


const initialState = {
    userData: {},
    loginIsLoading: false,
    loginSuccessful: false,
    error: false
}


export default function loginReducer(state = initialState, action) {

    switch (action.type) {
        case LOGIN_ATTEMPT:
            return {
                ...state,
                loginIsLoading: true,
                error: false
            }
        case LOGIN_SUCCESSFUL:
            return {
                ...state,
                loginSuccessful: true,
                loginIsLoading: false,
                data: action.payload,
                error: false
            }
        case LOGIN_FAILED:
            return {
                ...state,
                loginIsLoading: false,
                loginSuccessful: false,
                data: action.payload,
                error: true,
            }

        case NO_INTERNET:
            return {
                ...state,
                loginIsLoading: false,
                loginSuccessful: false,
                noInternet: true,

            }
        default:
            return state
    }
} 