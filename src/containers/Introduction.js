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
  AsyncStorage,
  BackHandler,
  

} from 'react-native';

import { SimpleList } from '../components/SimpleList'
import { Loader } from '../components/Loader'
import { AppToolbar } from '../components/AppToolbar'

import Colors from '../Colors/Colors'

import { fetchData } from '../actions/fetchDataAction'
import Server from '../services/server'
import { connect } from 'react-redux'

import { Toast } from 'native-base'

const width = Dimensions.get('window').width;

class Introduction extends React.Component {


  constructor() {
    super()

    this.state = {
      list: [],
      auth: null,
      title:''

    }

    this.handleBackPress = this.handleBackPress.bind(this);
  }

  componentDidMount(){
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

            this.props.fetchData(Server.INTODUCTION_URL,this.state.auth)

        }
    } catch (error) {
        // Error retrieving data
        console.log("ERROR: " + error)
    }
  }


  componentDidUpdate(props) {
    if (props.data != this.props.data) {
      if (props.hasError) {
        Toast.show({ text: 'Something went wrong, please try again', buttonText: 'okay', duration: 3000 })
        return
      }

      this.setState({list: this.props.data.bullets, title: this.props.data.intro})
    }

  }

  // componentWillReceiveProps(props){
  //   if(props.sessionExpired){
  //     Toast.show({ text: 'your session has been expired, please logout and login again', buttonText: 'okay', duration: 3000 })
  //     return
  //   }
  // }

  
  render() {

    return (
      <View style={styles.container}>

        {this.props.isLoading && <Loader></Loader>}

        <AppToolbar backAction={() => this.props.navigation.goBack()}></AppToolbar>

        <Text style={{
          color: '#fff', fontSize: 24,
          width: width, padding: 15, paddingLeft: 25, paddingRight:25, paddingBottom:10,
          backgroundColor: Colors.purple2,
          fontFamily: 'Verdana Pro Light'
        }}>Introduction</Text>


        <Text style={{
          width: width, fontFamily: 'Verdana Pro Cond SemiBold', fontSize: 16,
          backgroundColor: Colors.lightGrey, color: Colors.purple2,
          padding: 15, paddingLeft: 25, paddingRight: 25, lineHeight:20
        }}>{this.state.title}</Text>

        <SimpleList 
         title={this.state.list}></SimpleList>

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

function mapStateToProps (state) {
  return {
    data: state.appData.data,
    isLoading: state.appData.isFetching,
    hasError: state.appData.error,
    sessionExpired: state.appData.sessionExpired,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchData: (apiUrl, authKey) => dispatch(fetchData(apiUrl,authKey))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Introduction)

