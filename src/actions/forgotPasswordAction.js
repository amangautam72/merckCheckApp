
import { PASSWORD_SENT_REQUEST, SENT_SUCCESSFUL, SENT_FAILED, NO_INTERNET } from '../actionTypes/types'

import { forgotPassword } from '../services/requests'
import { NetInfo } from 'react-native'
import { Toast } from 'native-base'


export function attempting() {

    return {
        type: PASSWORD_SENT_REQUEST,
    }
}

export function passwordSent(response) {
    return {
        type: SENT_SUCCESSFUL,
        payload: response,
    }
}


export function sentFailed(res) {
    return {
        type: SENT_FAILED,
        payload: res,

    }
}

export function noInternet() {
    return {
        type: NO_INTERNET,

    }
}

export function password(email) {
    return (dispatch) => {
        dispatch(attempting())

        NetInfo.isConnected.fetch().done((isConnected) => {
            if (isConnected) {
                forgotPassword(email)
                    .then(res => {

                        if (res.code == 200) {

                            dispatch(passwordSent(res))
                        } else {
                            dispatch(sentFailed(res))

                            // alert(res.message)
                        }

                    })
                    .catch((err) => console.log("ERROR : " + err))
            }
            else {
                dispatch(noInternet())
                Toast.show({ text: 'No internet connection found!- Internet connection required to use this app', buttonText: 'okay', duration: 3000 })
            }
        })



    }
}
