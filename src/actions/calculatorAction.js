
import { getData, getDataSuccess, getDataFailure, getSessionFailed, noInternet} from './fetchDataAction'
import { calculator } from '../services/requests'

import { Toast} from 'native-base'
import { NetInfo } from 'react-native'



export function calculatorResult(authKey,userid,age,gender,height,weight,ft_level,suspected){
    return(dispatch) => {
        dispatch(getData())

        NetInfo.isConnected.fetch().done((isConnected) => {
            if(isConnected){
                calculator(authKey,userid,age,gender,height,weight,ft_level,suspected).then(res => {
        
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
                Toast.show({ text: 'No internet connection found!- Internet connection required to use this app', buttonText: 'okay', duration: 3000 })
            }
        })

        // calculator(authKey,userid,age,gender,height,weight,ft_level,suspected).then(res => {
        //     console.log("RESPONSE ===  "+ JSON.stringify(res))

        //     if(res.code == 200){
        //         dispatch(getDataSuccess(res.data))
        //     }else{
        //         if(res.code == 401){
        //             Toast.show({ text: 'your session has been expired, please logout and login again', buttonText: 'okay', duration: 3000 })
        //             dispatch(getSessionFailed())
        //         }else{
        //             dispatch(getDataFailure(res))
        //         }
                
        //     }
        
        // })
        // .catch((err) => console.log("ERROR : " + err))

    } 
}
