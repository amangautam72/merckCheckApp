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
  TouchableHighlight,
  AsyncStorage,
  FlatList,
  ScrollView,
  Modal,
  BackHandler,


} from 'react-native';

import { Loader } from '../components/Loader'
import { Icon } from 'native-base'
import { AppToolbar } from '../components/AppToolbar'

import Colors from '../Colors/Colors'

import { SERVER_ADDRESS } from '../services/server'
import { fetchData } from '../actions/fetchDataAction'
import Server from '../services/server'
import { connect } from 'react-redux'

import { Toast } from 'native-base'

const width = Dimensions.get('window').width;

class PatientScreening extends React.Component {

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
      data: [],
      modalImage: '',
      modalVisible: false

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

        this.props.fetchData(Server.PATIENTSCREEN_URL, this.state.auth)

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
        text2: this.props.data.text2, data: this.props.data.image
      })
    }
  }


  render() {

    return (
      <View style={styles.container}>

        {this.props.isLoading && <Loader></Loader>}

        <Modal
                animationType='fade'
                transparent={true}
                visible={this.state.modalVisible}
                >
                
            <TouchableHighlight
            onPress ={() => this.setState({modalVisible: false, })}
            style={{ flex: 1,justifyContent:'center', 
            backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <TouchableHighlight
                style={styles.modal}>

                <Image 
                style={{width:400,height:420, alignSelf: 'center' }}
                  source={{ uri: SERVER_ADDRESS + this.state.modalImage }}
                  resizeMode='contain'>

                </Image>

            </TouchableHighlight>    

            </TouchableHighlight>            
            </Modal>

        <AppToolbar backAction={() => this.props.navigation.goBack()}></AppToolbar>

        <Text style={{
          color: '#fff', fontSize: 24,
          width: width, padding: 15, paddingLeft: 25, paddingRight: 25, paddingBottom: 10,
          backgroundColor: Colors.purple2,
          fontFamily: 'Verdana Pro Light'
        }}>Patient Screening</Text>


        <Text style={{
          width: width, fontFamily: 'Verdana Pro Cond SemiBold', fontSize: 16,
          backgroundColor: Colors.lightGrey, color: Colors.purple2,
          padding: 15, paddingLeft: 25, paddingRight: 25
        }}>{this.state.title}</Text>

        <ScrollView 
        keyboardShouldPersistTaps='always'>
          <View style={{paddingBottom:20}}>

          <Text style={{
            color: '#fff',
            fontSize: 14, fontFamily: 'Verdana Pro Cond Bold',
            textAlign: 'center', backgroundColor: Colors.green,
            paddingTop: 10, paddingBottom: 10, paddingLeft: 20, paddingRight: 20,
            marginTop: 10, lineHeight: 25, marginLeft: 25, marginRight: 25
          }}>{this.state.text1}</Text>

          <Image style={{ width: 24, height: 12, alignSelf: 'center', marginTop: 8 }}
            resizeMode='contain'
            source={require('../assets/Icons/arrowDownGrey.png')}></Image>


          <FlatList
          keyboardShouldPersistTaps='always'
            horizontal={true}
            data={this.state.data}
            renderItem={({ item, index }) => (
              <TouchableOpacity 
              onPress={() => this.setState({modalVisible: true, modalImage: item.image})}
              style={{ flexDirection: 'row', padding: 15, paddingLeft: 25, paddingRight: 30, }}>
                <Image style={{ width: 250, height: 340, alignSelf: 'center' }}
                  source={{ uri: SERVER_ADDRESS + item.image }}
                  resizeMode='contain'>

                </Image>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}>

          </FlatList>


          <Image style={{
            width: 24, height: 12,
            alignSelf: 'center', marginTop: 8
          }}
            resizeMode='contain'
            source={require('../assets/Icons/arrowDownGrey.png')}></Image>


          <Text style={{
            width: width * .9,
            alignSelf: 'center', color: '#fff',
            fontSize: 14,
            fontFamily: 'Verdana Pro Cond Bold',
            textAlign: 'center',
            backgroundColor: Colors.blue,
            padding: 10, marginTop: 5
          }}>{this.state.text2}</Text>
          </View>
        </ScrollView>
      </View>

    );
  }
}


const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex:1,

  },
  alignment: {
    justifyContent: 'center',
    alignItems: 'center',

  },
  modal: {
    marginLeft: 50, 
    marginRight: 50, 
    backgroundColor: '#fff',
    // padding: 15, paddingLeft: 20, paddingRight: 20


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


export default connect(mapStateToProps, mapDispatchToProps)(PatientScreening)
