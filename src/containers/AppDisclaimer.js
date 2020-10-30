import React from 'react'

import {
    StyleSheet, TextInput,
    View, Text,
    Dimensions,
    Button,
    Image,
    SafeAreaView,
    ImageBackground,
    Platform,
    ScrollView,
    TouchableHighlight,
    BackHandler,
    NetInfo


} from 'react-native'


import Colors from '../Colors/Colors'

import { SimpleList } from '../components/SimpleList'
import { Loader } from '../components/Loader'

import { fetchData } from '../actions/fetchDataAction'
import Server from '../services/server'
import { connect } from 'react-redux'
import { Toast } from 'native-base'
import { appDisclaimer } from '../services/requests';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

class AppDisclaimer extends React.Component {


    constructor() {
        super()
        this.state = {
            list: [],
            disclaimerLoading: true
          }
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);

       
        NetInfo.isConnected.fetch().done((isConnected) => {
           
            if(isConnected){
              appDisclaimer(Server.DISCLAIMER_URL).then(res => {

                var response = JSON.parse(res)
      
                if (response.code == 200) {
      
                  this.setState({ list: response.data.point, disclaimerLoading: false })
                } else {
                  this.setState({ disclaimerLoading: false })
                  Toast.show({ text: 'Something went wrong', buttonText: 'okay', duration: 3000 })
                }
              }).catch((err) => this.setState({ disclaimerLoading: false })
            )
        
            }
            else{
                Toast.show({ text: 'No internet connection found!- Internet connection required to use this app', buttonText: 'okay', duration: 3000 })
                this.setState({disclaimerLoading:false})
            }
        })
    }

    componentDidUpdate(props) {

        // if (props.data != this.props.data) {
        //   if (props.hasError) {
        //     Toast.show({ text: 'Something went wrong', buttonText: 'okay', duration: 3000 })
        //     return
        //   }
    
        //   this.setState({list: this.props.data.point })
        // }
    
      }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    handleBackPress() {
        return true
    }

    render() {
        return (
            <View style={{ flex: 1 }}>

                {this.state.disclaimerLoading && <Loader></Loader>}

                <ImageBackground
                    style={{ flex: 1 }}
                    source={require('../assets/BackgroundImages/app_background.png')}
                    resizeMode='cover'
                >
                    <SafeAreaView>
                        <View style={{ alignItems: 'center', marginBottom: 10, marginTop: 20 }}>

                            <Image style={{ width: 155, height: 45 }}
                                resizeMode='contain'
                                source={require('../assets/Icons/check.png')}></Image>

                            <Text style={{
                                fontSize: 16, fontFamily: 'Verdana Pro Regular',
                                color: '#333333', textAlign:'center'
                            }}>{" THYROID MEDICAL \n ROADMAP"}</Text>
                        </View>
                    </SafeAreaView>



                    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>

                        <View style={{ flex: 1, alignItems: 'center', marginTop: 20, marginRight:25 }}>

                            <Text
                                style={{
                                    fontSize: 24,
                                    color: Colors.purple2,
                                    fontWeight: 'bold',
                                    fontFamily: 'Verdana Pro Light',
                                }}>
                                Disclaimer!</Text>

                            <SimpleList
                                title={this.state.list}></SimpleList>

                        </View>

                    </ScrollView>


                    <TouchableHighlight
                        onPress={() => this.props.navigation.navigate('RegisterScreen')}
                        style={styles.backToLogin}>

                        <Text style={{
                            width: width * .9, fontWeight: 'bold', color: '#fff', fontSize: 14,
                            fontFamily: 'Verdana Pro Cond Bold', backgroundColor: Colors.green,
                            padding: 10, textAlign: 'center'
                        }}>{"I Agree and Continue "}</Text>
                    </TouchableHighlight>


                </ImageBackground>




            </View>
        )
    }
}


const styles = StyleSheet.create({
    backToLogin: {
        backgroundColor: '#fff',
        width: width,
        alignItems: 'center',
        alignSelf: 'center',
        paddingBottom: Platform.OS == 'ios' ? 30 : 10,
        paddingTop: 10
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
      fetchData: (apiUrl, authKey) => dispatch(fetchData(apiUrl,authKey,''))
    }
  }
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(AppDisclaimer)