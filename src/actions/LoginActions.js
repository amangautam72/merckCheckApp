
import { LOGIN_ATTEMPT, LOGIN_SUCCESSFUL, LOGIN_FAILED, NO_INTERNET} from '../actionTypes/types'

import { loginRequest } from '../services/requests'
import server from '../services/server'

import { AsyncStorage, NetInfo } from 'react-native'
import { Toast } from 'native-base'


export function loggingIn(){

    return {
        type:LOGIN_ATTEMPT,
    }
}

export function loginSuccessful(response){
    return {
        type: LOGIN_SUCCESSFUL,
        payload: response,
    }
}


export function loginFailed(res){
    return {
        type: LOGIN_FAILED,
        payload: res,
        
    }
}

export function noInternet(){
    return {
        type: NO_INTERNET,
        
    }
}

export function login(username, password){
    return(dispatch) => {
        dispatch(loggingIn())

           
        NetInfo.isConnected.fetch().done((isConnected) => {
            if(isConnected){
                loginRequest(username,password).then(res => {

                    console.log("RESSS SSS S S : " + JSON.stringify(res))
                    
                    if(res.code == 200){
                       
                        this.storeKey(res.user_detail.login_token, res.user_detail.user_id, 
                            res.user_detail.fname, res.user_detail.lname)
        
                        dispatch(loginSuccessful(res.user_detail))
                    }else{
                        dispatch(loginFailed(res))
        
                        // alert(res.message)
                    }
                
                })
                .catch((err) => console.log("ERROR : " + err))
            }
            else{
                Toast.show({ text: 'No internet connection found!- Internet connection required to use this app', buttonText: 'okay', duration: 3000 })
                dispatch(noInternet())
            }
        })

     

    } 
}

storeKey = (authkey, user_id, fname, lname) => {
    var userName = fname + " " + lname
    try {
        AsyncStorage.setItem('AUTH', authkey);
        AsyncStorage.setItem('USERID', user_id.toString())
        AsyncStorage.setItem('USERNAME', userName)
    } catch (error) {
        // Error saving data
    }

}