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
  AsyncStorage,
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

class ClinicalCases extends React.Component {

  static navigationOptions = {
    drawerIcon: () => (
      <Image style={{ width: 20, height: 20, alignSelf: 'center' }}
        resizeMode='contain'
        source={require('../assets/Icons/cases.png')}></Image>
    ),

  }
  constructor() {
    super()
    this.state = {
      auth: null,
      cases: [],
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
      this.props.navigation.navigate('Roadmap  ')
      return true;
  }



  getKey = async () => {
    try {
        const value = await AsyncStorage.getItem('AUTH');
        if (value !== null || value != '') {
            // We have data!!
            this.setState({ auth: value })

            this.props.fetchData(Server.CASES_URL, this.state.auth)

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

      this.setState({cases: this.props.data })

      if(this.props.data.length < 1){
        Toast.show({ text: 'No cases found', buttonText: 'okay', duration: 3000 })
      }
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
        }}>Case Study</Text>


        <Text style={{
          width: width, fontFamily: 'Verdana Pro Cond SemiBold', fontSize: 16,
          backgroundColor: Colors.lightGrey, color: Colors.purple2,
          padding: 15, paddingLeft: 25, paddingRight: 25
        }}>Tap on a case below to open the case details</Text>

        <FlatList
          style={{paddingBottom:20}}
          data={this.state.cases}
          renderItem={({ item, index }) => (
            <TouchableOpacity 
            onPress={() => this.props.navigation.navigate('CaseInfo',{caseid: item.caseid, casetitle: item.title, index:index+1 })}>
            <View style={{ flexDirection: 'column', padding: 15, paddingLeft: 25, paddingRight: 30, }}>
              <Text style={{
                color: Colors.Yellow,
                fontSize: 20, fontFamily: 'Verdana Pro Cond SemiBold',

              }}>{ "Case "+(index+1) }</Text>

              <Text style={{ fontSize: 16, marginTop:5,
                fontFamily: 'Verdana Pro Cond Regular',
                color:Colors.purple2 }}>{item.title}</Text>
              <Text style={{marginTop:5,
                fontSize: 14, lineHeight: 25, color:'#333333',
                fontFamily: 'Verdana Pro Cond Regular'
              }}>{item.description1.replace(regex,'')}</Text>

              <View style={{height:2, backgroundColor:Colors.lightGrey, marginTop:20}}></View>
            </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => item.caseid.toString()}>

        </FlatList>


      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor:'#fff',
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
    sessionExpired: state.appData.sessionExpired
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchData: (apiUrl, authKey) => dispatch(fetchData(apiUrl,authKey))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ClinicalCases)
