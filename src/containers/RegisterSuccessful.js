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
    BackHandler


} from 'react-native'


import Colors from '../Colors/Colors'

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default class RegisterSuccessful extends React.Component {


    constructor(){
        super()
    }

    componentDidMount(){
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
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
                            }}>{"THYROID MEDICAL \n ROADMAP"}</Text>
                        </View>
                    </SafeAreaView>



                    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>

                        <View style={{ flex: 1, alignItems: 'center',margin:30 }}>
                            <Image style={{ width: 300, height:200 }}
                                resizeMode='contain'
                                source={require('../assets/BackgroundImages/successfulRegister.png')}></Image>


                            <Text
                                style={{
                                    fontSize: 24,
                                    color: Colors.purple2,
                                    fontWeight: 'bold',
                                    fontFamily: 'Verdana Pro Light', marginTop:30
                                }}>
                                Thank you!</Text>



                        <View>

                        <Text style={{fontFamily:'Verdana Pro Cond Regular',fontSize:17, 
                        marginTop: 15, lineHeight:23}}>
                           You have successfully registered. 
                           Please check your inbox for a confirmation email. 
                           Click on the link in that email to set a password for your account.

                           </Text>


                           <Text style={{fontFamily:'Verdana Pro Cond Regular',
                           fontSize:17, marginTop: 20, lineHeight:23}}>
                          
                           In case you do not see an email in your inbox from CHECK app then please check the spam folder. 
                           If you want to send the activation email again, use the ‘Forgot Password’ option.

                           </Text>
                        </View>
                          

                        </View>

                    </ScrollView>


                    <TouchableHighlight
                        onPress={() => this.props.navigation.navigate('LoginScreen')}
                        style={styles.backToLogin}>

                        <Text style={{
                            width: width * .9, fontWeight: 'bold', color: '#fff', fontSize: 14,
                            fontFamily: 'Verdana Pro Cond Bold', backgroundColor: Colors.green, 
                            padding: 10, textAlign: 'center'
                        }}>{"Back to Login "}</Text>
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