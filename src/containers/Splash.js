'use strict';
import React from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  Picker,
  AsyncStorage

} from 'react-native';

import { StackActions, NavigationActions,DrawerActions } from 'react-navigation'

import SplashScreen from 'react-native-splash-screen'

const resetAction = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'RoadMap' })],
});

export default class Splash extends React.Component {

  componentDidMount() {
    SplashScreen.hide()

    var that = this;

    setTimeout(function () {
        // that.props.navigation.navigate("LoginScreen")

        that.getKey()
    }, 3000)
  }

  getKey = async () => {
    try {
      const value = await AsyncStorage.getItem('AUTH');

      if (value !== null) {
        // We have data!!
        this.props.navigation.navigate('Roadmap  ')
        
      }else{
        this.props.navigation.navigate('LoginScreen')
      }
    } catch (error) {
      // Error retrieving data
    }
  }


  render() {

    return (


      <View style={{ flex: 1, backgroundColor:'#000' }}>
        <ImageBackground
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}
          source={require('../assets/BackgroundImages/splash_background.png')}
          resizeMode='cover'>

            <View style={{alignItems:'center',justifyContent:'flex-end', flex:1}}>
            
            <Image style={{ width:145,height:45 }}
              resizeMode='contain'
              source={require('../assets/Icons/check.png')}></Image>

            <Text style={{fontSize:22, fontFamily:'Verdana Pro Regular', 
            color:'rgb(51,51,51)'}}>A ROADMAP</Text>
            </View>

            <View style={{flex:1}}>
            
            </View>

        
            

        </ImageBackground>

      </View>

    );
  }
}


const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: '100%',
  },
  alignment: {
    justifyContent: 'center',
    alignItems: 'center',

  },

});

