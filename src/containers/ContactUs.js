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
  BackHandler

} from 'react-native';

import Colors from '../Colors/Colors'
import { AppToolbar } from '../components/AppToolbar'

import { fetchData } from '../actions/fetchDataAction'
import Server from '../services/server'
import { connect } from 'react-redux'

import { Toast } from 'native-base'


const width = Dimensions.get('window').width;

class ContactUs extends React.Component {

  static navigationOptions = {
    drawerIcon: () => (
      <Image style={{ width: 20, height: 20, alignSelf: 'center' }}
        resizeMode='contain'
        source={require('../assets/Icons/contactus.png')}></Image>
    ),

  }

  constructor() {
    super()

    this.state = {
      auth: null,
      email: '',
      number: ''
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
    this.props.navigation.navigate('Roadmap  ')
    return true
  }


  getKey = async () => {
    try {
      const value = await AsyncStorage.getItem('AUTH');
      if (value !== null || value != '') {
        // We have data!!
        this.setState({ auth: value })

        this.props.fetchData(Server.CONTACTUS_URL, this.state.auth)

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

      this.setState({ email: this.props.data.email, number: this.props.data.mobile })
    }
  }


  render() {

    return (
      <View style={styles.container}>

        <AppToolbar backAction={() => this.props.navigation.navigate('Roadmap  ')}></AppToolbar>



        <Text style={{
          color: '#fff', fontSize: 24,
          width: width, padding: 15, paddingLeft: 25, paddingRight: 25, paddingBottom: 10,
          backgroundColor: Colors.purple2,
          fontFamily: 'Verdana Pro Light'
        }}>Contact Us</Text>


        <ScrollView>
          <Image style={{ width: 250, height: 190, alignSelf: 'center', margin: 40 }}
            resizeMode='contain'
            source={require('../assets/BackgroundImages/contactus.png')}></Image>


          <View style={{ paddingLeft: 25, paddingRight: 20 }}>
            <Text style={{
              fontSize: 14, color: '#333333',
              fontFamily: 'Verdana Pro Cond Regular',
            }}>For any medical enquiries, please send an email to </Text>
            <Text style={{
              fontSize: 14, color: Colors.purple2, marginTop: 5,
              fontFamily: 'Verdana Pro Cond Regular',
            }}>{this.state.email}</Text>


            <Text style={{
              fontSize: 14, color: '#333333',marginTop:10,
              fontFamily: 'Verdana Pro Cond Regular',
            }}>For any safety related issue or for reporting any adverse event, please send an email to </Text>
            <Text style={{
              fontSize: 14, color: Colors.purple2, marginTop: 5,
              fontFamily: 'Verdana Pro Cond Regular',
            }}>drug.safety.saudi@merckgroup.com</Text>
          </View>
        </ScrollView>


      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: '#fff',
    flex: 1


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


export default connect(mapStateToProps, mapDispatchToProps)(ContactUs)