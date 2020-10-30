
import { FETCHING_KEY_DATA, FETCHING_KEY_DATA_SUCCESS, 
    FETCHING_KEY_DATA_FAILURE, SESSION_ENDED, NO_INTERNET} from '../actionTypes/types'
import { callApi } from '../services/requests'
import { Toast} from 'native-base'
import { NetInfo } from 'react-native'


export function getData(){

    console.log("getData Action")

    return {
        type:FETCHING_KEY_DATA
    }
}

export function getDataSuccess(response){
    console.log("DATA SUCCESS")
    return {
        type: FETCHING_KEY_DATA_SUCCESS,
        payload: response
    }
}


export function getDataFailure(response){
    return {
        type: FETCHING_KEY_DATA_FAILURE,
        payload: response
    }
}

export function getSessionFailed(){
    return {
        type: SESSION_ENDED,
    }
}

export function noInternet(){
    return {
        type: NO_INTERNET,
        
    }
}


export function keyPointsData(url, authKey){
    return(dispatch) => {
        dispatch(getData())

        NetInfo.isConnected.fetch().done((isConnected) => {
            if(isConnected){
                callApi(url, authKey).then(res => {
        
                    if(res.code == 200){
                        dispatch(getDataSuccess(res.data))
                    }else{
                        if(res.code == 401){
                            Toast.show({ text: 'your session has been expired, please logout and login again', buttonText: 'okay', duration: 3000 })
                            dispatch(getSessionFailed())
                        }else{
                            dispatch(getDataFailure(res.data))
                        } 
                       
        
                    }
                
                })
                .catch((err) => console.log("ERROR : " + err))
        
            }
            else{
                dispatch(noInternet())
            }
        })
        


      
    } 
}

