import React from 'react'

import RoadMap from '../containers/Roadmap'
import Introduction from '../containers/Introduction'
import PatientScreening from '../containers/PatientScreening'
import Diagnosis from '../containers/Diagnosis'
import Management from '../containers/Management'
import Management2 from '../containers/Management2'
import Levothyroxine from '../containers/Levothroxine'
import Dosing from '../containers/Dosing'
import Dosing2 from '../containers/Dosing2'
import Calculator from '../containers/Calculator'

import { createStackNavigator } from 'react-navigation'


const stack = createStackNavigator({

    RoadMap: {
        screen: RoadMap,
        navigationOptions: { header: null, drawerLockMode: 'locked-closed' }

    },
    Introduction: {
        screen: Introduction,
        navigationOptions: { header: null,}

    },
    PatientScreening: {
        screen: PatientScreening,
        navigationOptions: { header: null }

    },
    Diagnosis: {
        screen: Diagnosis,
        navigationOptions: { header: null }

    },
    Management: {
        screen: Management,
        navigationOptions: { header: null }

    },

    Management2: {
        screen: Management2,
        navigationOptions: { header: null }

    },

    Levothyroxine: {
        screen: Levothyroxine,
        navigationOptions: { header: null }
    },
    Dosing: {
        screen: Dosing,
        navigationOptions: { header: null }

    },
    Dosing2: {
        screen: Dosing2,
        navigationOptions: { header: null}
    },

    Calculator: {
        screen: Calculator,
        navigationOptions: { header: null }

    },
},
)

stack.navigationOptions = ({ navigation }) => {

    let drawerLockMode = 'unlocked';
    if (navigation.state.index > 0) {
      drawerLockMode = 'locked-closed';
      
    }
  
    return {
      drawerLockMode,
    };
  };


// const Container = createAppContainer(stack)

export default stack