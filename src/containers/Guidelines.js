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
  FlatList,
  ScrollView,
  Linking,
  AsyncStorage,
  BackHandler

} from 'react-native';


import Colors from '../Colors/Colors'
import { AppToolbar } from '../components/AppToolbar'

import { Loader } from '../components/Loader'
import { fetchData } from '../actions/fetchDataAction'
import Server from '../services/server'
import { SERVER_ADDRESS } from '../services/server'
import { connect } from 'react-redux'

import { Toast } from 'native-base'

const width = Dimensions.get('window').width;

class Guidelines extends React.Component {

  static navigationOptions = {
    drawerIcon: () => (
      <Image style={{ width: 20, height: 20, alignSelf: 'center' }}
      resizeMode='contain'
      source={require('../assets/Icons/guidelines.png')}></Image>
    ),
   
}

  constructor() {
    super()
    this.state = {
      auth: null,
      guidelines: [],
      title: ''
      
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
    this.props.navigation.navigate('Roadmap  ')
    return true
}



  getKey = async () => {
    try {
        const value = await AsyncStorage.getItem('AUTH');
        if (value !== null || value != '') {
            // We have data!!
            this.setState({ auth: value })

            this.props.fetchData(Server.GUIDELINES_URL,this.state.auth)

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

      this.setState({guidelines: this.props.data})
    }
  }

  handleClick = (url) => {

    if(url.trim() == '' || url == null){
      return
    }

    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Don't know how to open URI: " + url);
      }
    });
  };

  render() {

    return (
      <View style={styles.container}>

        {this.props.isLoading && <Loader></Loader>}
        
        <AppToolbar backAction={() => this.props.navigation.navigate('Roadmap  ')}></AppToolbar>
       

        <Text style={{
          color: '#fff', fontSize: 24,
          width: width, padding: 15, paddingLeft: 25, paddingBottom: 10,
          backgroundColor: Colors.purple2,
          fontFamily: 'Verdana Pro Light'
        }}>Guidelines</Text>


        <Text style={{
          width: width, fontFamily: 'Verdana Pro Cond SemiBold', fontSize: 16,
          backgroundColor: Colors.lightGrey, color: Colors.purple2,
          padding: 15, paddingLeft: 25, paddingRight: 25
        }}>Tap on the images below to open a specific guideline</Text>


        <ScrollView >
        <FlatList
        style={{ paddingBottom:20}}
            data={this.state.guidelines}
            renderItem={({ item, index }) => (
                <TouchableOpacity onPress={() => this.handleClick(item.url)}
                style={{ flexDirection: 'row', padding:15, 
                paddingLeft:25,paddingRight:25, justifyContent:'center' }}>
                    <Image style={{ width: 300, height: 140, borderWidth:2, borderColor:'#d3d3d3' }}
                    resizeMode='cover'
                    source={{uri: SERVER_ADDRESS+ item.image}}></Image>
                </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}>

        </FlatList>
            
        </ScrollView>

      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    backgroundColor:'#fff'


  },
  alignment: {
    justifyContent: 'center',
    alignItems: 'center',

  },

});

function mapStateToProps (state) {
  return {
    data: state.simpleListReducer.data,
    isLoading: state.simpleListReducer.isFetching,
    hasError: state.simpleListReducer.error,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchData: (apiUrl,authKey) => dispatch(fetchData(apiUrl, authKey))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Guidelines)
