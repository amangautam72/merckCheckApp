'use strict';
import React from 'react';

import {
  StyleSheet,
  Text,
  View,
  Dimensions,
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
import HTML from 'react-native-render-html';
import { ScrollView } from 'react-native-gesture-handler';

const width = Dimensions.get('window').width;

class CaseInfo extends React.Component {

  
  constructor(props) {
    super(props)
    this.state = {
      auth: null,
      list: ["Hypothyroidism is caused by inadequate production of thyroid hormones or inadequate replacement following thyroidectomy which leads to low circulating and tissue levels of thyroid hormones1", "As hypothyroidism is common and frequently underdiagnosed, millions of people worldwide are unaware that they have the disease and remain untreated1 ", "why"],
      caseId: this.props.navigation.getParam('caseid', ''),
      caseTitle: this.props.navigation.getParam('casetitle', ''),
      index: this.props.navigation.getParam('index',''),
      description: ''

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
    Toast.show({ text: 'your session has been expired, please logout and login again', buttonText: 'okay', duration: 3000 })
      this.props.navigation.navigate('Case Study')
      return true;
  }

  getKey = async () => {
    try {
        const value = await AsyncStorage.getItem('AUTH');
        if (value !== null || value != '') {
            // We have data!!
            this.setState({ auth: value })

            this.props.fetchData(Server.CASEINFO_URL, this.state.auth, this.state.caseId)
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

      this.setState({description: this.props.data.description2 })
    }
  }


  render() {

    return (
      <View style={styles.container}>

        {this.props.isLoading && <Loader></Loader>}

        <AppToolbar backAction={() => this.props.navigation.navigate('Case Study')}></AppToolbar>

        <Text style={{
          color: '#fff', fontSize: 24,
          width: width, padding: 15, paddingLeft: 25, paddingRight: 25, paddingBottom: 10,
          backgroundColor: Colors.purple2,
          fontFamily: 'Verdana Pro Light'
        }}>{'Case '+ this.state.index}</Text>


        <Text style={{
          width: width, fontFamily: 'Verdana Pro Cond SemiBold', fontSize: 16,
          backgroundColor: Colors.lightGrey, color: Colors.purple2,
          padding: 15, paddingLeft: 25, paddingRight: 25
        }}>{this.state.caseTitle}</Text>


        {/* <Text style={{flex:1, fontSize:14, fontFamily:'Verdana Pro Cond Regular',
        padding: 15, color:'#333333',
          paddingLeft: 25, paddingRight: 25, 
          lineHeight:30}}>{this.state.description}</Text> */}

            <ScrollView style={{flex:1, paddingLeft:25, paddingRight:25,  }}>

            {!this.props.isLoading && 
            <HTML html={this.state.description}
            baseFontStyle={{ fontSize: 14, 
              //fontFamily: 'Verdana Pro Cond Regular', 
              lineHeight: 25,  }}

          />
            }
                  
                </ScrollView>
  
        {/* <FlatList
          data={this.state.list}
          renderItem={({ item, index }) => (
            <View style={{ flexDirection: 'column', padding: 15, paddingLeft: 25, paddingRight: 30, }}>
             

              <Text style={{fontSize:14, fontFamily:'Verdana Pro Cond Regular',color:'#333333'}}>The title of the case goes here</Text>
              
            </View>
          )}>

        </FlatList> */}


      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor:'#fff',
    flex:1,
    paddingBottom:10
   


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
    fetchData: (apiUrl, authKey, caseId) => dispatch(fetchData(apiUrl,authKey, caseId))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(CaseInfo)
