'use strict';
import React from 'react';

import {
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

import HTML from 'react-native-render-html';
import Colors from '../Colors/Colors'
import { AppToolbar } from '../components/AppToolbar'

import { Loader } from '../components/Loader'
import { fetchData } from '../actions/fetchDataAction'
import Server from '../services/server'
import { connect } from 'react-redux'

import { Toast } from 'native-base'


const width = Dimensions.get('window').width;

const htmlContent = `<p>This calculator provides very basic initial levothyroxine dosage and follow-up guidelines for adult patients with hypothyroidism.</p>\r\n\r\n<p>The starting dose, frequency of dose titration, and the optimal full replacement dose should be based on several key parameters including<sup>1<sup>:</sup></sup></p>\r\n\r\n<p>(1) Patient age  e.g. older patients: start lower and titrate more slowly.</p>\r\n\r\n<p>(2) Weight (1.6-1.7 mcg/kg lean body weight). Note: based on available research, IBW is a suitable substitute for LBW.</p>\r\n\r\n<p>(3) Cardiovascular status (positive history of coronary artery disease warrants initiation at a very low dose and very slow titration),</p>\r\n\r\n<p>(4) General health.</p>\r\n\r\n<p>(5) Concomitant medications (see examples below).</p>\r\n\r\n<p>(6) Severity and duration of hypothyroidism.</p>\r\n\r\n<p>Consultation with an endocrinologist should be considered in the following cases<sup>1<sup>:</sup></sup></p>\r\n\r\n<p>(1) Patients less than 18 years old</p>\r\n\r\n<p>(2) Patients unresponsive to therapy</p>\r\n\r\n<p>(3) Pregnant patients</p>`


class AboutUs extends React.Component {

  static navigationOptions = {
    drawerIcon: () => (
      <Image style={{ width: 20, height: 20, alignSelf: 'center' }}
        resizeMode='contain'
        source={require('../assets/Icons/about.png')}></Image>
    ),

  }

  constructor() {
    super()

    this.state = {
      auth: null,
      version: '',
      description: ''
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

        this.props.fetchData(Server.ABOUTUS_URL, this.state.auth)
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

      this.setState({ version: this.props.data.version, description: this.props.data.app_description })
    }
  }

  render() {

    return (
      <View style={styles.container}>

        {this.props.isLoading && <Loader></Loader>}

        <AppToolbar backAction={() => this.props.navigation.navigate('Roadmap  ')}></AppToolbar>


        <Text style={{
          color: '#fff', fontSize: 24,
          width: width, padding: 15, paddingLeft: 25, paddingRight: 25, paddingBottom: 10,
          backgroundColor: Colors.purple2,
          fontFamily: 'Verdana Pro Light'
        }}>About</Text>


        <ScrollView >
          <Image style={{ width: 370, height: 280 }}
            resizeMode='contain'
            source={require('../assets/BackgroundImages/about.png')}></Image>


          <View style={{ paddingLeft: 25, paddingRight: 20 }}>
            <Text style={{
              fontSize: 22, color: Colors.purple2,
              fontFamily: 'Verdana Pro Cond SemiBold',
            }}>CHECK App</Text>
            <Text style={{
              fontSize: 18, color: '#333333',
              fontFamily: 'Verdana Pro Cond Regular',
            }}>A Roadmap</Text>
            <Text style={{
              fontSize: 14, color: '#333333',
              fontFamily: 'Verdana Pro Light', marginTop: 5
            }}>{'Version ' + this.state.version}</Text>



            {/* <Text style={{
              fontFamily: 'Verdana Pro Cond Regular',
              marginTop: 15, fontSize: 14, color: '#333333', lineHeight: 25
            }}>We acknowledge the support of the above endocrinologists who attended an Advisory Board organised9 by Eslam Abdelhamid, Ahmed Adel, Mohamed Nazzal , Ahmad ALMWAKEH and Amr Eltokhy in Jeddahon 5 May, 2017</Text> */}

            <View style={{ marginTop: 10 }}>

              {!this.props.isLoading &&
                <HTML
                  html={this.state.description}
                  baseFontStyle={{ fontSize: 12, fontFamily: 'Verdana Pro Regular', lineHeight: 25 }}
                  classesStyles={{ 'big-superscript': { color: 'red', fontWeight: '700', fontSize: 22 } }}
                />}

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
    fetchData: (apiUrl, authKey) => dispatch(fetchData(apiUrl, authKey))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(AboutUs)