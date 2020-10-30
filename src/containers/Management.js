'use strict';
import React from 'react';

import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  AsyncStorage,
  BackHandler,


} from 'react-native';

import { Loader } from '../components/Loader'
import { Icon, Toast } from 'native-base'
import { AppToolbar } from '../components/AppToolbar'

import Colors from '../Colors/Colors'

import { fetchData } from '../actions/fetchDataAction'
import Server from '../services/server'
import { SERVER_ADDRESS } from '../services/server'
import { connect } from 'react-redux'

const width = Dimensions.get('window').width;

const regex = /(<([^>]+)>)/ig;

class Management extends React.Component {

  static navigationOptions = {
    drawerIcon: ({ tintColor }) => (
      <Icon name='menu' style={{ fontSize: 24, color: tintColor }} />
    ),

  }

  constructor() {
    super()
    this.state = {
      auth: null,
      title1: '',
      image1: '',
      title2: '',
      image2: '',
      title3: '',
      image3: '',
      title4: '',
      image4: '',

    }

    this.handleBackPress = this.handleBackPress.bind(this);

  }

  componentDidMount() {
    this.getKey()

    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);

  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress() {

    this.props.navigation.goBack()
    return true

  }

  getKey = async () => {
    try {
      const value = await AsyncStorage.getItem('AUTH');
      if (value !== null || value != '') {
        // We have data!!
        this.setState({ auth: value })

        this.props.fetchData(Server.MANAGEMENT_URL, this.state.auth)

      }
    } catch (error) {
      // Error retrieving data
      console.log("ERROR: " + error)
    }
  }

  componentDidUpdate(props) {


    if (props.data != this.props.data) {
      if (props.hasError) {
        Toast.show({ text: 'Something went wrong', buttonText: 'okay', duration: 3000 })
        return
      }

      if (this.props.data.adult != undefined) {
        this.setState({
          title1: this.props.data.adult.title,
          image1: this.props.data.adult.image,
          title2: this.props.data.elder.title,
          image2: this.props.data.elder.image,
          title3: this.props.data.pregnant.title,
          image3: this.props.data.pregnant.image,
          title4: this.props.data.young.title,
          image4: this.props.data.young.image,
        })
      }
    }
  }


  render() {
    var props = this.props.data

    var mySubString = this.state.title1.substring(
      this.state.title1.lastIndexOf('sup>'),
      this.state.title1.lastIndexOf("</sup>") - 1
    );


    return (
      <View style={styles.container}>

        {this.props.isLoading && <Loader></Loader>}

        <AppToolbar backAction={() => this.props.navigation.goBack()}></AppToolbar>

        <Text style={{
          color: '#fff', fontSize: 24,
          width: width, padding: 15, paddingLeft: 25, paddingBottom: 10,
          backgroundColor: Colors.purple2,
          fontFamily: 'Verdana Pro Light'
        }}>Dosing</Text>


        <Text style={{
          width: width, fontFamily: 'Verdana Pro Cond SemiBold', fontSize: 16,
          backgroundColor: Colors.lightGrey, color: Colors.purple2,
          padding: 15, paddingLeft: 25, paddingRight: 25
        }}>Tap on a section below for more information</Text>


        <ScrollView>

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Levothyroxine')}
            style={{
              flexDirection: 'row', backgroundColor: Colors.purple2,
              marginLeft: 30, marginRight: 30, marginTop: 20
            }}>
            <Text
              style={{
                fontFamily: 'Verdana Pro Cond SemiBold', fontSize: 16,
                color: Colors.Yellow, padding: 10, paddingLeft: 15

              }}>How should Levothyroxine be taken?</Text>

            <Image style={{ width: 10, height: 12, alignSelf: 'center' }}
              source={require('../assets/Icons/arrow_right.png')}></Image>
          </TouchableOpacity>

          <View style={{ flexDirection: 'row', margin: 10, marginLeft: 20, marginRight: 20 }}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Management2', { url: Server.ADULT_MANAGEMENT_URL,  })}
              style={{ flex: 1 }}>

              <View style={{ margin: 10, backgroundColor: '#EEFFFB' }}>

                <Text style={{
                  color: '#fff', textAlign: 'left', padding: 10,
                  fontFamily: 'Verdana Pro Cond Bold',
                  backgroundColor: Colors.green, margin: 3
                }}>{this.state.title1.replace(regex,'')}</Text>

                {/* <View style={{backgroundColor:Colors.green,margin:3}}>
                <HTML html={this.state.title1}
                  baseFontStyle={{ fontSize: 14,color:'#fff', fontFamily: 'Verdana Pro Cond Bold' }}
                  // classesStyles= {{ 'big-superscript': { color: 'red', fontWeight: '700', fontSize:22 }}}
                />
                </View> */}
                

                <Image style={{ width: 80, height: 160, alignSelf: 'center' }}
                  resizeMode='contain'
                  source={{ uri: SERVER_ADDRESS + this.state.image1 }}></Image>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Management2', { url: Server.ELDER_MANAGEMENT_URL, elder:true })}
              style={{ flex: 1 }}>
              <View style={{ margin: 10, backgroundColor: '#E5F4F9' }}>
 
                <Text style={{
                  color: '#fff', textAlign: 'left', padding: 10,
                  fontFamily: 'Verdana Pro Cond Bold',
                  backgroundColor: Colors.blue, margin: 3
                }}>{this.state.title2.replace(regex,'')}</Text>

{/* <View style={{backgroundColor:Colors.green,padding:10,margin:3}}>
                <HTML html={elder}
                  // baseFontStyle={{ fontSize: 14,color:'#fff', fontFamily: 'Verdana Pro Cond Bold' }}
                  classesStyles= {{ 'big-superscript': { color: 'red', fontWeight: '700', fontSize:22 }}}
                />
                </View> */}

                <Image style={{ width: 80, height: 160, alignSelf: 'center' }}
                  resizeMode='contain'
                  source={{ uri: SERVER_ADDRESS + this.state.image2 }}></Image>
              </View>
            </TouchableOpacity>

          </View>


          <View style={{
            flexDirection: 'row', marginLeft: 20, marginRight: 20,
            marginBottom: 100
          }}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Management2', { url: Server.PREGNANT_MANAGEMENT_URL, pregnant:true })}
              style={{ flex: 1 }}>
              <View style={{ margin: 10, backgroundColor: '#FFEBF3' }}>

                <Text style={{
                  color: '#fff', textAlign: 'left', padding: 10,
                  fontFamily: 'Verdana Pro Cond Bold',
                  backgroundColor: Colors.pink, margin: 3
                }}>{this.state.title3.replace(regex,'')}</Text>

{/* <View style={{backgroundColor:Colors.green,padding:10,margin:3}}>
                <HTML html={pregnant}
                  // baseFontStyle={{ fontSize: 14,color:'#fff', fontFamily: 'Verdana Pro Cond Bold' }}
                  classesStyles= {{ 'big-superscript': { color: 'red', fontWeight: '700', fontSize:22 }}}
                />
                </View> */}

                <Image style={{ width: 80, height: 160, alignSelf: 'center' }}
                  resizeMode='contain'
                  source={{ uri: SERVER_ADDRESS + this.state.image3 }}></Image>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Management2', { url: Server.YOUNG_MANAGEMENT_URL })}
              style={{ flex: 1 }}>
              <View style={{ margin: 10, backgroundColor: '#EDF9F9' }}>

                <Text style={{
                  color: '#fff', textAlign: 'left', padding: 10,
                  fontFamily: 'Verdana Pro Cond Bold',
                  backgroundColor: Colors.lighBlue, margin: 3
                }}>{this.state.title4.replace(regex,'')}</Text>

{/* <View style={{backgroundColor:Colors.green,padding:10,margin:3}}>
                <HTML html={young}
                  // baseFontStyle={{ fontSize: 14,color:'#fff', fontFamily: 'Verdana Pro Cond Bold' }}
                  classesStyles= {{ 'big-superscript': { color: 'red', fontWeight: '700', fontSize:22 }}}
                />
                </View> */}

                <Image style={{ width: 80, height: 160, alignSelf: 'center' }}
                  resizeMode='contain'
                  source={{ uri: SERVER_ADDRESS + this.state.image4 }}></Image>
              </View>
            </TouchableOpacity>
          </View>

        </ScrollView>

      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',


  },
  alignment: {
    justifyContent: 'center',
    alignItems: 'center',

  },

});


function mapStateToProps(state) {
  return {
    data: state.appData.data,
    isLoading: state.appData.isFetching,
    hasError: state.appData.error,
    sessionExpired: state.appData.sessionExpired
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchData: (apiUrl, auth) => dispatch(fetchData(apiUrl, auth))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Management)


