import React from 'react'

import LoginScreen from '../containers/LoginScreen'
import AppDisclaimer from '../containers/AppDisclaimer'
import RegisterScreen from '../containers/RegisterScreen'
import ForgotPasswordScreen from '../containers/ForgotPassword'
import RegisterSuccessful from '../containers/RegisterSuccessful'
import ClinicalCases from '../containers/ClinicalCases'
import CaseInfo from '../containers/Caseinfo'
import Guidelines from '../containers/Guidelines'
import KeySummaryPoints from '../containers/KeySummaryPoints'
import References from '../containers/References'
import AboutUs from '../containers/AboutUs'
import ContactUs from '../containers/ContactUs'
import { NavigatorHeader } from '../components/NavigatorHeader'


import { Image, BackHandler, NetInfo } from 'react-native'
import { Toast } from 'native-base'
import { createDrawerNavigator, createAppContainer} from 'react-navigation'

import StackNavigator from './StackNavigator'


export default class DrawerNavigator extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            currentScreen: '',
            index: 0,
          


        }

        this.handleBackPress = this.handleBackPress.bind(this);
    }


    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }


    handleBackPress() {
        if (this.state.currentScreen == 'LoginScreen') {
            BackHandler.exitApp();
            return true;
        }

    }


   
    getCurrentRouteName(navigationState) {
        if (!navigationState) {
            return null;
        }
        const route = navigationState.routes[navigationState.index];
        
        this.setState({
            currentScreen: route.routeName,
            index: route.index
        })

     
        // return route.routeName;
    }


    render() {
        if(this.state.currentScreen != 'AppDisclaimer' && this.state.currentScreen !='RegisterScreen'){
        NetInfo.isConnected.fetch().done((isConnected) => {
            console.log("CONNECTION :  " + isConnected) 
            if(!isConnected){
                Toast.show({ text: 'No internet connection found!- Internet connection required to use this app', buttonText: 'okay', duration: 3000 })
            }
        })
    }
       
        return (
            
            <Container
                onNavigationStateChange={(prevState, currentState) => 
                    this.getCurrentRouteName(currentState)
                }
                >
            </Container>

        )
    }
}


class Hidden extends React.Component {
    render() {
        return null;
    }
}


const Navigator = createDrawerNavigator({

    "Roadmap  ": {
        screen: StackNavigator,
        navigationOptions: {drawerLabel: <Hidden/>, }
    },

    LoginScreen: {
        screen: LoginScreen,
        navigationOptions: { drawerLabel: <Hidden />, drawerLockMode: 'locked-closed' }
    },
    AppDisclaimer: {
        screen: AppDisclaimer,
        navigationOptions: { drawerLabel: <Hidden />, drawerLockMode: 'locked-closed' }
    },
    RegisterScreen: {
        screen: RegisterScreen,
        navigationOptions: { drawerLabel: <Hidden />, drawerLockMode: 'locked-closed' }
    },
    ForgotPasswordScreen: {
        screen: ForgotPasswordScreen,
        navigationOptions: { drawerLabel: <Hidden />, drawerLockMode: 'locked-closed' }
    },
    RegisterSuccessfulScreen: {
        screen: RegisterSuccessful,
        navigationOptions: { drawerLabel: <Hidden />, drawerLockMode: 'locked-closed' }
    },

   
    "CaseInfo": {
        screen: CaseInfo,
        navigationOptions: { drawerLabel: <Hidden />, drawerLockMode: 'locked-closed' }
    },
    "Guidelines": {
        screen: Guidelines,
        navigationOptions: { drawerLockMode: 'locked-closed' }
    },
    "Key Summary Points ": {
        screen: KeySummaryPoints,
        navigationOptions: { drawerLockMode: 'locked-closed' }
    },
    "Case Study": {
        screen: ClinicalCases,
        navigationOptions: { drawerLockMode: 'locked-closed' }
    },
    "References ": {
        screen: References,
        navigationOptions: { drawerLockMode: 'locked-closed' }
    },
    "About": {
        screen: AboutUs,
        navigationOptions: { drawerLockMode: 'locked-closed' }
    },
    "Contact Us ": {
        screen: ContactUs,
        navigationOptions: { drawerLockMode: 'locked-closed' }
    },
    "Logout": {
        screen: "Logout",
        navigationOptions: {
            // drawerLabel: (
            //     <DrawerLabel
            //       label="Label"
            //       icon={require('../assets/Icons/logout.png')}
            //     />
            //   ),
            drawerIcon: ({ tintColor }) => (
                <Image style={{ marginLeft: 6, width: 20, height: 20, alignSelf: 'center' }}
                    resizeMode='contain'
                    source={require('../assets/Icons/logout.png')}></Image>
            ),

        }
    },


},
    {
        unmountInactiveRoutes: true,
        initialRouteName: 'LoginScreen',

        drawerType: 'slide',
        contentComponent: NavigatorHeader,
        contentOptions: {

            labelStyle: {
                marginLeft: 0,
                fontFamily: 'Verdana Pro Cond SemiBold',
                fontSize: 16,
                color: '#fff'
            },
            activeTintColor: null,
            inactiveTintColor: null,
            iconContainerStyle: {
                opacity: 1
            }

        },

    }
)


const Container = createAppContainer(Navigator)
