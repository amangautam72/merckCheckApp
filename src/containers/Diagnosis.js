'use strict';
import React from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  AsyncStorage,
  BackHandler,
 
  

} from 'react-native';
import { Icon } from 'native-base'
import { AppToolbar } from '../components/AppToolbar'
import { Loader } from '../components/Loader'
import { fetchData } from '../actions/fetchDataAction'
import Server from '../services/server'
import { connect } from 'react-redux'

import { Toast } from 'native-base'

import Colors from '../Colors/Colors'

const width = Dimensions.get('window').width;

const regex = /(<([^>]+)>)/ig;

class Diagnosis extends React.Component {

  static navigationOptions = {
    drawerIcon: ({ tintColor }) => (
      <Icon name='menu' style={{ fontSize: 24, color: tintColor }} />
    ),

  }

  constructor() {
    super()
    this.state = {
      auth: null,
      title: '',
      text1: '',
      text2: '',
      text3: '',
      text4: '',
      text5: '',

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

        this.props.fetchData(Server.DIAGNOSIS_URL, this.state.auth)

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

      this.setState({
        title: this.props.data.title, text1: this.props.data.text1,
        text2: this.props.data.text2, text3: this.props.data.text3, text4: this.props.data.text4,
        text5: this.props.data.text5
      })
    }


  }

  render() {

    return (
      <View style={styles.container}>

        {this.props.isLoading && <Loader></Loader>}

        <View >

        <AppToolbar backAction={() => this.props.navigation.goBack()}></AppToolbar>

        <Text style={{
          color: '#fff', fontSize: 24,
          width: width, padding: 15, paddingLeft: 25, paddingBottom: 10,
          backgroundColor: Colors.purple2,
          fontFamily: 'Verdana Pro Light'
        }}>Diagnosis of hypothyroidism</Text>


        <Text style={{
          width: width, fontFamily: 'Verdana Pro Cond SemiBold', fontSize: 16,
          backgroundColor: Colors.lightGrey, color: Colors.purple2,
          padding: 15, paddingLeft: 25, paddingRight: 25
        }}>{this.state.title}</Text>

        </View>

        <ScrollView >
          <View style={{flexDirection: 'row', alignSelf: 'center', }}>

            <Image style={{ width: 40, height: 100, marginTop: 30, marginRight: 5 }}
              resizeMode='contain'
              source={require('../assets/Icons/arrowDownLeft.png')}></Image>

            <Text style={{
              alignSelf: 'flex-start',
              width: width * .3, color: '#fff',
              fontSize: 14, fontFamily: 'Verdana Pro Cond Bold',
              textAlign: 'center', backgroundColor: Colors.orange, padding: 10, marginTop: 10
            }}>{this.state.text1}</Text>

            <Image style={{ width: 40, height: 100, marginTop: 30, marginLeft: 5 }}
              resizeMode='contain'
              source={require('../assets/Icons/arrowDownRight.png')}></Image>

          </View>


          <View style={{ flexDirection: 'row' }}>

            <View style={{
              flex: 1, backgroundColor: Colors.green, marginLeft: 30,
              marginRight: 30, marginTop: 5, justifyContent: 'center'
            }}>
              <Text style={{
                flex: 1,
                color: '#fff',
                fontSize: 14, fontFamily: 'Verdana Pro Cond Bold',
                textAlign: 'center',
                padding: 15
              }}>{this.state.text2}</Text>

            </View>
            <View style={{
              flex: 1, backgroundColor: Colors.green, marginLeft: 30,
              marginRight: 30, marginTop: 5, justifyContent: 'center'
            }}>
              <Text style={{
                flex: 1,
                color: '#fff',
                fontSize: 14, fontFamily: 'Verdana Pro Cond Bold',
                textAlign: 'center',
                padding: 15,
              }}>{this.state.text3}</Text>
            </View>
          </View>


          <View style={{ flexDirection: 'row', marginTop: 5 }}>
            <Image style={{ flex: 1, width: 24, height: 58 }}
              resizeMode='contain'
              source={require('../assets/Icons/arrowDown.png')}></Image>


            <Image style={{ flex: 1, width: 24, height: 58 }}
              resizeMode='contain'
              source={require('../assets/Icons/arrowDown.png')}></Image>

          </View>

          <View style={{ flexDirection: 'row', marginBottom: 20 }}>

            <View style={{
              flex: 1, backgroundColor: Colors.blue, marginLeft: 30,
              marginRight: 30, marginTop: 5, justifyContent: 'center'
            }}>
              <Text style={{

                color: '#fff',

                fontSize: 14, fontFamily: 'Verdana Pro Cond Bold',
                textAlign: 'center', textAlignVertical: 'center',
                padding: 15,


              }}>{this.state.text4}</Text>
            </View>

            <View style={{
              flex: 1, backgroundColor: Colors.blue, marginLeft: 30,
              marginRight: 30, marginTop: 5, justifyContent: 'center',
            }}>
              <Text style={{

                color: '#fff',
                fontSize: 14, fontFamily: 'Verdana Pro Cond Bold',
                textAlign: 'center',
                padding: 15,
              }}>{this.state.text5}</Text>
            </View>


          </View>


        </ScrollView>

      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex:1

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
    fetchData: (apiUrl, authKey) => dispatch(fetchData(apiUrl, authKey))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Diagnosis)

