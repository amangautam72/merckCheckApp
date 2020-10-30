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
  FlatList,
  AsyncStorage,
  Linking,
  BackHandler

} from 'react-native';


import Colors from '../Colors/Colors'
import { AppToolbar } from '../components/AppToolbar'

import { Loader } from '../components/Loader'
import { fetchData } from '../actions/fetchDataAction'
import Server from '../services/server'
import { connect } from 'react-redux'

import { Toast } from 'native-base'

const width = Dimensions.get('window').width;


const regex = /(<([^>]+)>)/ig;

class References extends React.Component {

  static navigationOptions = {
    drawerIcon: () => (
      <Image style={{ width: 20, height: 20, alignSelf: 'center' }}
        resizeMode='contain'
        source={require('../assets/Icons/references.png')}></Image>
    ),

  }

  constructor() {
    super()

    this.state = {
      references: [],
      auth: null,
      title: ''

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

        this.props.fetchData(Server.REFERENCE_URL, this.state.auth)

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

      this.setState({ references: this.props.data })
    }
  }

  handleClick = (url) => {

    if (url != '') {

      Linking.canOpenURL(url).then(supported => {
        if (supported) {
          Linking.openURL(url);
        } else {
          console.log("Don't know how to open URI: " + url);
        }
      });
    }
  };


  render() {

    var list = this.state.references

    return (
      <View style={styles.container}>

        {this.props.isLoading && <Loader></Loader>}

        <AppToolbar backAction={() => this.props.navigation.navigate('Roadmap  ')}></AppToolbar>

        <Text style={{
          color: '#fff', fontSize: 24,
          width: width, padding: 15, paddingLeft: 25, paddingRight: 25, paddingBottom: 10,
          backgroundColor: Colors.purple2,
          fontFamily: 'Verdana Pro Light'
        }}>References</Text>

        <FlatList
          style={{ paddingBottom: 20 }}
          data={list}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => this.handleClick(item.url)}
              style={{ flexDirection: 'row', padding: 15, paddingLeft: 25, paddingRight: 30, }}>
              <Text style={{
                color: Colors.referenceIndex,
                fontSize: 14, fontFamily: 'Verdana Pro Cond SemiBold',
                textAlign: 'center', lineHeight: 25

              }}>{(index + 1) + '.'}</Text>
              <Text style={{
                marginLeft: 5, alignSelf: 'flex-start',
                fontSize: 14, lineHeight: 25,
                fontFamily: 'Verdana Pro Cond Regular'
              }}>{item.references.replace(regex, '')}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}>

        </FlatList>

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
    data: state.simpleListReducer.data,
    isLoading: state.simpleListReducer.isFetching,
    hasError: state.simpleListReducer.error,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchData: (apiUrl, authKey) => dispatch(fetchData(apiUrl, authKey))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(References)

