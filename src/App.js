/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from 'react';
import { Platform } from 'react-native';

import { Root } from 'native-base'

import SplashScreen from 'react-native-splash-screen'

import { Provider } from 'react-redux'
import configureStore from './store/configureStore'

import CheckApp from './components/drawerNavigator'



const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const store = configureStore()

export default class App extends Component {

  componentDidMount(){
    //SplashScreen.hide()
   
  }

  render() {

    
    return (
      <Provider store={store}>
        <Root>
          <CheckApp />
        </Root>
      </Provider>


    );
  }
}
