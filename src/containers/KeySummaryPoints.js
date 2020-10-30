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
  AsyncStorage,
  BackHandler

} from 'react-native';

import { Toast } from 'native-base'
import { AppToolbar } from '../components/AppToolbar'

import Colors from '../Colors/Colors'

import { Loader } from '../components/Loader'
import Server from '../services/server'
import { connect } from 'react-redux'
import { keyPointsData } from '../actions/keyPointsAction';

const width = Dimensions.get('window').width;

const regex = /(<([^>]+)>)/ig;

const colorArray = ['#F4B447','#169F7A','#1A82B6','#E9709B','#24AEC1','#F4B447','#169F7A','#1A82B6','#E9709B','#24AEC1','#F4B447','#169F7A','#1A82B6',
'#E9709B','#24AEC1','#F4B447','#169F7A','#1A82B6','#E9709B','#24AEC1','#F4B447','#169F7A','#1A82B6','#E9709B','#24AEC1','#F4B447','#169F7A','#1A82B6','#E9709B',
'#24AEC1','#F4B447','#169F7A','#1A82B6','#E9709B','#24AEC1','#F4B447','#169F7A','#1A82B6','#E9709B','#24AEC1','#F4B447','#169F7A','#1A82B6','#E9709B','#24AEC1',
'#F4B447','#169F7A','#1A82B6','#E9709B','#24AEC1','#F4B447','#169F7A','#1A82B6','#E9709B','#24AEC1',]


class KeyPoints extends React.Component {

  static navigationOptions = {
    drawerIcon: () => (
      <Image style={{ width: 20, height: 20, alignSelf: 'center' }}
        resizeMode='contain'
        source={require('../assets/Icons/keypoints.png')}></Image>
    ),

  }

  constructor() {
    super()
    this.state = {
      keypoints: [],
      auth: null,

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

            this.props.fetchData(Server.KEY_POINTS_URL,this.state.auth)

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

      this.setState({keypoints: this.props.data})
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
        }}>Key Summary Points</Text>


        <ScrollView >
          <FlatList
            style={{ paddingTop: 20, paddingBottom:20 }}
            data={this.state.keypoints}
            renderItem={({ item, index }) => (
              <View style={{ paddingLeft: 25, paddingRight: 25,  marginBottom: 15 }}>
                <Text style={{
                  backgroundColor: colorArray[index], color: '#fff',
                  fontSize: 14, fontFamily: 'Verdana Pro Cond Bold', textAlign: 'center',
                  padding: 10, lineHeight: 20
                }}>{item.points.replace(regex,'')}</Text>
                { index+1 != this.state.keypoints.length ? <Image style={{ width: 24, height: 14, alignSelf: 'center', marginTop: 10 }}
                  resizeMode='contain'
                  source={require('../assets/Icons/arrowDownGrey.png')}></Image> : null}
              </View>
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
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff'


  },
  alignment: {
    justifyContent: 'center',
    alignItems: 'center',

  },

});


function mapStateToProps(state) {
  return {
    data: state.keyPointsReducer.keyData,
    isLoading: state.keyPointsReducer.isFetching,
    hasError: state.keyPointsReducer.error,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchData: (apiUrl, authKey) => dispatch(keyPointsData(apiUrl, authKey))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(KeyPoints)
