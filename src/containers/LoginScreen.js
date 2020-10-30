import React from 'react'

import {
    Platform,
    StyleSheet, TextInput,
    View, Text,
    Dimensions,
    ImageBackground,
    Image,
    TouchableOpacity,
    AsyncStorage
} from 'react-native'

import Colors from '../Colors/Colors'
const width = Dimensions.get('window').width;


import { Loader } from '../components/Loader'
import { login } from '../actions/LoginActions'
import { connect } from 'react-redux'

import { Toast } from 'native-base'
import SplashScreen from 'react-native-splash-screen';


const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

class LoginScreen extends React.Component {


    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: '',
            isLoading: false,
            // isEmailInValid: true

        }

        this.buttonInactive = false
    }

    componentDidMount() {
        this.getKey()

        //SplashScreen.hide()
    }

    getKey = async () => {
        try {
            const value = await AsyncStorage.getItem('AUTH');

            if (value !== null) {
                // We have data!!

                this.props.navigation.navigate('Roadmap  ')

            } else {
                if (Platform.OS == 'ios') {
                    SplashScreen.hide()
                } else {
                    setTimeout(() => SplashScreen.hide(), 500)
                }

            }
        } catch (error) {
            // Error retrieving data
        }
    }

    componentWillReceiveProps(props) {
    
        if (props.loginData != this.props.loginData) {
            if (props.loginIsSuccessful) {
                this.props.navigation.navigate('Roadmap  ')
                Toast.show({ text: 'You have successfully logged In', buttonText: 'okay', duration: 3000 })
            } else {
                if (props.loginError) {
                    Toast.show({ text: props.loginData.message, buttonText: 'okay', duration: 3000 })
                   
                }
            }
        }

    }



    validate = (text) => {
       
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(text) === false) {
            this.setState({ username: text })
            return false;
        }
        else {
            this.setState({ username: text })
           
        }
    }

    onLoginClick() {
        if (!this.buttonInactive) {
            this.buttonInactive = true;
            // do stuff

        }
        let username = this.state.username
        let password = this.state.password


        if (username === '' || password === '') {
            //alert('Please enter your details');
            Toast.show({
                text: 'Please enter details',
                buttonText: 'okay', duration: 3000
            })
            // ToastAndroid.show('Please enter your details', ToastAndroid.SHORT)
            this.buttonInactive = false
            return;
        }

        if (reg.test(username) === false) {
            Toast.show({
                text: 'Invalid email or password',
                buttonText: 'okay', duration: 3000
            })
            this.buttonInactive = false
            return;
        }

        console.log("PASS WORD : " + password)


        this.props.doLogin(this.state.username, this.state.password)



    }

    emailValidationRegex(email){
        // use regex to check if email is valid and return  true if email is valid, false if email is invalid
        if(reg.test(email) === true){
            return true
        }else{
            return false
        }
    }

    render() {

        return (
            <View style={{ flex: 1, backgroundColor: '#000' }}>

                {this.props.isLoading && <Loader></Loader>}

                <ImageBackground
                    style={{
                        flex: 1, justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    source={require('../assets/BackgroundImages/app_background.png')}
                    resizeMode='stretch'>


                    <View style={{ alignItems: 'center', marginBottom: 60 }}>

                        <Image style={{ width: 155, height: 45, alignSelf:'center' }}
                            resizeMode='contain'
                            source={require('../assets/Icons/check.png')}></Image>

                        <Text style={{
                            fontSize: 16, fontFamily: 'Verdana Pro Regular',
                            color: '#333333', textAlign: 'center',alignSelf:'center'
                        }}>{" THYROID MEDICAL \n ROADMAP"}</Text>
                    </View>

                    <View style={styles.inputs}>
                        <View style={{
                            alignItems: 'center', justifyContent: 'center',
                            padding: 10, backgroundColor: Colors.Yellow
                        }}>
                            <Image style={{ width: 22, height: 14 }}
                                resizeMode='contain'
                                source={require('../assets/Icons/username.png')}></Image>
                        </View>

                        <TextInput
                            placeholder="Email Address"
                            autoCapitalize='none'
                            placeholderTextColor={Colors.inputHint}
                            textContentType='emailAddress'
                            keyboardType='email-address'
                            onChangeText={(username) => this.setState({ username: username })}
                            style={styles.textInput}>
                        </TextInput>
                        {/* {this.state.isEmailInValid && <Text>Valid</Text>} */}

                    </View>


                    <View style={styles.inputs}>
                        <View
                            style={{
                                alignItems: 'center', justifyContent: 'center',
                                padding: 10, backgroundColor: Colors.Yellow,
                            }}>
                            <Image style={{ width: 22, height: 18 }}
                                resizeMode='contain'
                                source={require('../assets/Icons/password.png')}></Image>
                        </View>

                        <TextInput
                            placeholder="Password"
                            autoCapitalize='none'
                            secureTextEntry={true}
                            placeholderTextColor={Colors.inputHint}
                            onChangeText={(password) => this.setState({ password: password })}
                            style={styles.textInput}>
                        </TextInput>

                    </View>


                    <TouchableOpacity

                        onPress={this.onLoginClick.bind(this)}
                        style={styles.loginButton}>

                        <Text
                            style={{
                                fontWeight: 'bold',
                                color: Colors.purple,
                                fontSize: 16
                            }}>{'Login '}</Text>
                    </TouchableOpacity>



                    <Text onPress={() => this.props.navigation.navigate("ForgotPasswordScreen")}
                        style={{
                            textAlign: 'center', margin: 50, fontSize: 16,
                            fontFamily: 'Verdana Pro Cond SemiBold', color: '#fff'
                        }}>
                        {'Forgot Password? '}</Text>

                    <View style={{ alignItems: 'center', position: 'absolute', bottom: 40 }}>
                        <Text
                            onPress={() => this.props.navigation.navigate("AppDisclaimer")}
                            style={{
                                textAlign: 'center', fontSize: 16,
                                color: '#fff', fontFamily: 'Verdana Pro Cond SemiBold',

                            }}>
                            {"  Don't Have an account?   "}</Text>

                        <View style={{
                            borderColor: '#fff', width: 50, backgroundColor: '#fff',
                            borderBottomWidth: 3, margin: 10
                        }}></View>

                    </View>
                </ImageBackground>





            </View>
        )
    }
}


const styles = StyleSheet.create({
    textInput: {
        width: width * .6 + 20,
        backgroundColor: '#fff',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: Platform.OS == 'ios' ? 10 : 5,
        paddingBottom: Platform.OS == 'ios' ? 10 : 5,
        fontWeight: 'bold',
        backgroundColor: Colors.inputBackground


    },

    inputs: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: Colors.strokeColor,
        marginTop: 30

    },

    loginButton: {
        marginTop: 50,
        paddingRight: 60,
        paddingLeft: 60,
        paddingTop: 12,
        paddingBottom: 12,
        backgroundColor: Colors.Yellow,
        // borderRadius: 3,
        // shadowRadius: 3, 
        // shadowColor: Colors.shadowColor,
        // shadowOffset: { height: 5, width: 0 }, 
        // shadowOpacity: 10
    }

});


function mapStateToProps(state) {
    return {
        loginData: state.loginReducer.data,
        isLoading: state.loginReducer.loginIsLoading,
        loginIsSuccessful: state.loginReducer.loginSuccessful,
        loginError: state.loginReducer.error,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        doLogin: (username, password) => dispatch(login(username, password))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)