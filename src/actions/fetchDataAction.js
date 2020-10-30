
import { FETCHING_DATA, FETCHING_DATA_SUCCESS, FETCHING_DATA_FAILURE, SESSION_ENDED, NO_INTERNET} from '../actionTypes/types'
import { callApi } from '../services/requests'
import { Toast } from 'native-base'
import { NetInfo } from 'react-native'
import Calculator from '../containers/Calculator';
export function getData(){

    console.log("getData Action")

    return {
        type:FETCHING_DATA
    }
}

export function getDataSuccess(response){
    console.log("DATA SUCCESS")
    return {
        type: FETCHING_DATA_SUCCESS,
        payload: response
    }
}


export function getDataFailure(response){
    return {
        type: FETCHING_DATA_FAILURE,
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


export function fetchData(url, authKey, caseId){
    return(dispatch) => {
        
        dispatch(getData())
        
        NetInfo.isConnected.fetch().done((isConnected) => {
            
            if(isConnected){

                
                callApi(url, authKey, caseId).then(res => {
                    console.log("RESPONSE :  " + JSON.stringify(res))
        
                    if(res.code == 200){
        
                        dispatch(getDataSuccess(res.data))
                    }else{
                        if(res.code == 401){
                            Toast.show({ text: 'your session has been expired, please logout and login again', buttonText: 'okay', duration: 3000 })
                           
                            dispatch(getSessionFailed())
                        }else{
                            dispatch(getDataFailure(res))
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
