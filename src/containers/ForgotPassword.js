import React from 'react'

import {
    Platform,
    StyleSheet, TextInput,
    View, Text,
    Dimensions,
    Button,
    ImageBackground,
    Image,
    TouchableHighlight
} from 'react-native'

import { Loader } from '../components/Loader'
import { password } from '../actions/forgotPasswordAction'
import { connect } from 'react-redux'

import { Toast } from 'native-base'

import Colors from '../Colors/Colors'

const width = Dimensions.get('window').width;

const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;


class ForgotPassword extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            email: ''
        }

        this.buttonInactive = false
    }

    componentWillReceiveProps(props) {

        if (props.data != this.props.data) {
          
            if (props.sentSuccessfully) {
                Toast.show({ text: props.data.message, buttonText: 'okay', duration: 3000 })
                this.props.navigation.navigate('LoginScreen')

            } else {
                if (props.sentError) {
                    Toast.show({ text: props.data.message, buttonText: 'okay', duration: 3000 })
                }
            }
        }
    }

    onSubmitClick() {
        if (!this.buttonInactive) {
            this.buttonInactive = true;
            // do stuff

        }
        let email = this.state.email

        if (email === '') {
            //alert('Please enter your details');
            Toast.show({
                text: 'Please enter your email address',
                buttonText: 'okay', duration: 3000
            })
            // ToastAndroid.show('Please enter your details', ToastAndroid.SHORT)
            this.buttonInactive = false
            return;
        }

        if (reg.test(email) === false) {
            Toast.show({
                text: 'Please enter valid email address',
                buttonText: 'okay', duration: 3000
            })
            this.buttonInactive = false
            return;
        }


        this.props.sendPassword(email)

    }




    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#000' }}>
                {this.props.isLoading && <Loader></Loader>}

                <ImageBackground
                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}
                    source={require('../assets/BackgroundImages/app_background.png')}
                    resizeMode='cover'>


                    <View style={{ alignItems: 'center', marginBottom: 20 }}>

                        <Image style={{ width: 155, height: 45 }}
                            resizeMode='contain'
                            source={require('../assets/Icons/check.png')}></Image>

                        <Text style={{
                            fontSize: 16, fontFamily: 'Verdana Pro Regular',
                            color: '#333333', textAlign: 'center',
                        }}>{" THYROID MEDICAL \n ROADMAP"}</Text>
                    </View>

                    <Text style={{
                        textAlign: 'center', color: '#fff',
                        fontFamily: 'Verdana Pro Cond SemiBold',
                        fontSize: 16, margin: 30, paddingLeft: 30, paddingRight: 30,
                        alignItems: 'flex-start'
                    }}>Enter your email address and tap Submit.
                                If you have an existing CHECK app account,
                                you will receive an email with further instructions
                   </Text>


                    <View style={styles.inputs}>
                        <View
                            style={{
                                alignItems: 'center', justifyContent: 'center',
                                padding: 10, backgroundColor: Colors.Yellow,
                            }}>
                            <Image style={{ width: 22, height: 18 }}
                                resizeMode='contain'
                                source={require('../assets/Icons/username.png')}></Image>
                        </View>

                        <TextInput
                            placeholder="Email Address"
                            autoCapitalize='none'
                            textContentType='emailAddress'
                            keyboardType='email-address'
                            onChangeText={(email) => this.setState({ email })}
                            style={styles.textInput}>
                        </TextInput>

                    </View>


                    <TouchableHighlight
                        onPress={this.onSubmitClick.bind(this)}
                        style={styles.loginButton}>

                        <Text
                            style={{
                                fontWeight: 'bold',
                                color: Colors.purple, fontSize: 16
                            }}>{'Submit '}</Text>
                    </TouchableHighlight>



                    <Text onPress={() => this.props.navigation.navigate("LoginScreen")}
                        style={{
                            textAlign: 'center', fontSize: 16,
                            color: '#fff', fontFamily: 'Verdana Pro Cond SemiBold',
                            position: 'absolute', bottom: 80
                        }}>
                        {"  Already have an account?   "}</Text>

                    <View style={{
                        borderColor: '#fff', width: 50, backgroundColor: '#fff',
                        borderBottomWidth: 3, position: 'absolute', bottom: 65
                    }}></View>
                </ImageBackground>





            </View>
        )
    }
}


const styles = StyleSheet.create({
    textInput: {
        width: 250,
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
        data: state.forgotPasswordReducer.data,
        isLoading: state.forgotPasswordReducer.isLoading,
        sentSuccessfully: state.forgotPasswordReducer.sentSuccessfully,
        sentError: state.forgotPasswordReducer.error,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        sendPassword: (email) => dispatch(password(email))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword)