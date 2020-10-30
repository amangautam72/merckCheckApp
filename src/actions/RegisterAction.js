
import { REGISTER_ATTEMPT, REGISTER_SUCCESSFUL, REGISTRATION_FAILED, NO_INTERNET} from '../actionTypes/types'

import { RegisterRequest } from '../services/requests'
import server from '../services/server'

import { NetInfo } from 'react-native'
import { Toast } from 'native-base'


export function registering(){

    return {
        type:REGISTER_ATTEMPT,
    }
}

export function registerationSuccessful(response){
    return {
        type: REGISTER_SUCCESSFUL,
        payload: response,
    }
}


export function registrationFailed(res){
    return {
        type: REGISTRATION_FAILED,
        payload: res,
        
    }
}

export function noInternet(){
    return {
        type: NO_INTERNET,
        
    }
}

export function register(fname,lname,hospital,city, telephone,email,speciality){
    return(dispatch) => {
        dispatch(registering())

        NetInfo.isConnected.fetch().done((isConnected) => {
            if(isConnected){
                RegisterRequest(fname,lname,hospital,city, telephone,email,speciality)
                .then(res => {
        
                    if(res.code == 200){
                        dispatch(registerationSuccessful(res))
                    }else{
                        dispatch(registrationFailed(res))
        
                    }
                
                })
                .catch((err) => console.log("ERROR : " + err))
        
            }
            else{            
                dispatch(noInternet())
                Toast.show({ text: 'No internet connection found!- Internet connection required to use this app', buttonText: 'okay', duration: 3000 })
            }
        })

        
    } 
}
