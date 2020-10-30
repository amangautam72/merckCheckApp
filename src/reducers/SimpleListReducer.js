import { FETCHING_DATA, FETCHING_DATA_SUCCESS, FETCHING_DATA_FAILURE, SESSION_ENDED, NO_INTERNET } from '../actionTypes/types'


const initialState = {
    data: [],
    isFetching: false,
    error: false,
    noInternet: false
}


export default function SimpleListReducer(state = initialState, action) {

    switch (action.type) {
        case FETCHING_DATA:
            return {
                ...state,
                isFetching: true
            }

        case FETCHING_DATA_SUCCESS:
            return {
                ...state,
                isFetching: false,
                data: action.payload,
                error: false
            }
        case FETCHING_DATA_FAILURE:
            return {
                ...state,
                isFetching: false,
                data: action.payload,
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