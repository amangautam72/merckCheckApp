'use strict';
import React from 'react';

import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  ImageBackground,
  BackHandler,
  AsyncStorage

} from 'react-native';

import { StackActions, NavigationActions } from 'react-navigation';
import SplashScreen from 'react-native-splash-screen';


const width = Dimensions.get('window').width

const resetAction = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'RoadMap' })],
});

export default class Roadmap extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      userName: '',
    }
    this.handleBackPress = this.handleBackPress.bind(this);

   
  }

  componentDidMount(){
    
    SplashScreen.hide()
    
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
   
    AsyncStorage.getItem('USERNAME').then(name => {

      this.setState({userName: name})

    });

  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress() {
    BackHandler.exitApp()
    return true;
  }

  render() {

    return (
      <View style={{ flex: 1, backgroundColor:'#000' }}>

        <ImageBackground style={{flex:1 }}
          resizeMode='cover'
          source={require('../assets/BackgroundImages/homeBackground.png')}>

        <SafeAreaView style={{paddingTop:10}}>
          <View style={{ flexDirection: 'row', margin: 10 }}>

            <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}
            style={{justifyContent:'center'}}>
              <Image
                style={{ width: 24, height: 14, alignSelf: 'center', marginLeft: 15 }}
                resizeMode='contain'
                source={require('../assets/Icons/sidemenu.png')}>
                </Image>
            </TouchableOpacity>
            

            
            <Image style={{ width: 110, height: 35, marginLeft: 15 }}
              resizeMode='contain'
              source={require('../assets/Icons/checkwithwhitetick.png')}></Image>

            <Text style={{ alignSelf: 'center', marginLeft: 5, fontSize:14 }}>{"THYROID \nMEDICAL ROADMAP"}</Text>

          </View>
        </SafeAreaView>

        <View style={{ flexDirection: 'column', alignItems: 'flex-end', marginRight: 10 }}>

          <View style={{margin:20, alignItems:'flex-end'}}>
          <Text style={{fontSize:16, fontFamily:'Verdana Pro Bold'}}>Welcome</Text>
          <Text style={{color:"#522E91", fontSize:30, 
          fontFamily:'Verdana Pro Light'}}>{'Dr. '+ this.state.userName }</Text>
          </View>
          
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Introduction')}>
            <View style={{ flexDirection: 'row', margin: 20, alignItems: 'center', justifyContent: 'center' }}>
              <Image style={{width:20,height:20,marginRight:3}}
              source={require('../assets/Icons/introduction.png')}
              resizeMode='contain'></Image>

              <Text numberOfLines={1}
                style={{color:"#522E91", fontSize: 16, 
                fontWeight: 'bold', fontFamily:'Verdana Pro Bold'  }}>{" Introduction "}</Text>

            </View>

          </TouchableOpacity>


          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('PatientScreening')}>
            <View style={{ flexDirection: 'row', margin: 20, alignItems: 'center', justifyContent: 'center' }}>
              <Image source={require('../assets/Icons/screening.png')} 
              style={{width:20,height:20, }}
              resizeMode='contain'></Image>

              <Text numberOfLines={1} ellipsizeMode={'clip'}
                style={{color:"#522E91", fontSize: 16, fontWeight: 'bold', fontFamily:'Verdana Pro Bold' }}>{" Patient Screening "}</Text>

            </View>

          </TouchableOpacity>


          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Diagnosis')}>
            <View style={{ flexDirection: 'row', margin: 20, alignItems: 'center', justifyContent: 'flex-end', marginRight: 20 }}>
              <Image style={{width:20,height:20,}}
              source={require('../assets/Icons/diagnosis.png')} 
              resizeMode='contain'></Image>

              <Text numberOfLines={1} ellipsizeMode={'clip'}
                style={{color:"#522E91", fontSize: 16, fontWeight: 'bold',
                 fontFamily:'Verdana Pro Bold' }}>{" Diagnosis "}</Text>

            </View>

          </TouchableOpacity>

        </View>



        <View style={{ flexDirection: 'column', 
        alignItems: 'flex-start', 
        position: 'absolute', 
        bottom: 0, marginBottom: 20, 
        marginLeft: 10 }}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Dosing')}>
            <View style={{ flexDirection: 'row', margin: 20, alignItems: 'center' }}>
              <Image source={require('../assets/Icons/management.png')}
              style={{width:20, height:20}}
              resizeMode='contain'></Image>

              <Text numberOfLines={1}
                style={{color:'#fff', fontSize: 16, fontWeight: 'bold', 
                fontFamily:'Verdana Pro Bold', marginLeft: 5 }}>{" Management "}</Text>

            </View>

          </TouchableOpacity>


          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Management')}>
            <View style={{ flexDirection: 'row', margin: 20, alignItems: 'center', justifyContent: 'center' }}>
              <Image source={require('../assets/Icons/dosing.png')} 
              style={{width:20,height:20}}
              resizeMode='contain'></Image>

              <Text numberOfLines={1} ellipsizeMode={'clip'}
                style={{color:'#fff', fontSize: 16, fontWeight: 'bold', marginLeft:5,
                fontFamily:'Verdana Pro Bold' }}>{" Dosing "}</Text>

            </View>

          </TouchableOpacity>


          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Calculator')}>
            <View style={{ flexDirection: 'row', margin: 20, alignItems: 'center', justifyContent: 'flex-end', marginRight: 20 }}>
              <Image source={require('../assets/Icons/calculator.png')} 
              style={{width:20,height:20}}
              resizeMode='contain'></Image>

              <Text numberOfLines={1} ellipsizeMode={'clip'}
                style={{color:'#fff', fontSize: 16, fontWeight: 'bold', marginLeft:5,
                 fontFamily:'Verdana Pro Bold' }}>{" Thyroid Calculator "}</Text>

            </View>

          </TouchableOpacity>

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
    height: '100%'
  },
  alignment: {
    justifyContent: 'center',
    alignItems: 'center',

  },

});
