import {
    FETCHING_KEY_DATA, FETCHING_KEY_DATA_SUCCESS,
    FETCHING_KEY_DATA_FAILURE, SESSION_ENDED, NO_INTERNET
} from '../actionTypes/types'


const initialState = {
    keyData: [],
    isFetching: false,
    error: false
}


export default function keyPointsReducer(state = initialState, action) {

    switch (action.type) {
        case FETCHING_KEY_DATA:
            return {
                ...state,
                isFetching: true
            }

        case FETCHING_KEY_DATA_SUCCESS:
            return {
                ...state,
                isFetching: false,
                keyData: action.payload
            }
        case FETCHING_KEY_DATA_FAILURE:
            return {
                ...state,
                isFetching: false,
                keyData: action.payload,
                error: true
            }
        case SESSION_ENDED:
            return {
                ...state,
                isFetching: false,
            }
        case NO_INTERNET:
            return {
                ...state,
                isFetching: false,
                noInternet: true,

            }
        default:
            return state
    }
} 