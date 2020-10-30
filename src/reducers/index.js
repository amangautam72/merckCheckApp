import { combineReducers } from 'redux'

import appData from './dataReducer'
import loginReducer from './loginReducer'
import simpleListReducer from './SimpleListReducer'
import keyPointsReducer from './keyPointsReducer'
import registerReducer from './RegisterReducer'
import forgotPasswordReducer from './forgotPasswordReducer'


const rootReducer = combineReducers({
    appData,
    loginReducer,
    registerReducer,
    simpleListReducer,
    keyPointsReducer,
    forgotPasswordReducer
    
})


export default rootReducer