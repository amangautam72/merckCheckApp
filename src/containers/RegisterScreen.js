import React from 'react'

import {
    StyleSheet, TextInput,
    View, Text,
    Dimensions,
    Image,
    SafeAreaView,
    ImageBackground,
    Platform,
    ScrollView,
    TouchableOpacity,
    TouchableHighlight,
    KeyboardAvoidingView,
    BackHandler,
    NetInfo
} from 'react-native'


import Colors from '../Colors/Colors'
import { Picker, Toast } from 'native-base'
import { AndroidPicker } from '../components/AndroidPicker'

import { Loader } from '../components/Loader'
import { register } from '../actions/RegisterAction'
import { connect } from 'react-redux'


import { AppToolbar } from '../components/AppToolbar'
import { speciality } from '../services/requests';
import Server from '../services/server';

const width = Dimensions.get('window').width;

const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

class RegisterScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            specialities: [],
            selectedSpeciality: 0,
            selectedSpecialityAnd: Platform.OS == 'ios' ? '' : 'Select Speciality',
            //selectedCountry: Platform.OS == 'ios' ? '' : 'Select Country',
            firstName: '',
            lastName: '',
            hospital: '',
            city: '',
            telephone: '',
            email: '',
            specialityLoading: true,
            specialityVisibility: false,
            //countryVisibility: false

        }

        this.buttonInactive = false

        this.handleBackPress = this.handleBackPress.bind(this);
    }


    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);

        NetInfo.isConnected.fetch().done((isConnected) => {
            if (isConnected) {
                //specialities
                speciality().then(res => {

                    var array = []
                    if (res.code == 200) {
                        array = res.data
                        array.unshift({ "id": 0, "name": "Select Speciality" })
                        this.setState({ specialities: array, specialityLoading: false })
                    } else {
                        this.setState({ specialityLoading: false })
                    }

                })
                    .catch((err) => this.setState({ specialityLoading: false }))
            }
            else {
                Toast.show({ text: 'No internet connection found!- Internet connection required to use this app', buttonText: 'okay', duration: 3000 })
                this.setState({ specialityLoading: false})
            }
        })

    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    handleBackPress() {
        return true
    }


    componentWillReceiveProps(props) {
        if (props.registerData != this.props.registerData) {
            if (props.registerIsSuccessful) {
              
                this.props.navigation.navigate('RegisterSuccessfulScreen')
                Toast.show({
                    text: props.registerData.message,
                    buttonText: 'okay', duration: 3000
                })
            } else {
                if (props.registerError) {
                    Toast.show({
                        text: props.registerData.message,
                        buttonText: 'okay', duration: 3000
                    })
                }
            }
        }

    }


    onRegisterClick() {
        if (!this.buttonInactive) {
            this.buttonInactive = true;
            // do stuff
        }

        let fname = this.state.firstName
        let lname = this.state.lastName
        let hospital = this.state.hospital
        let city = this.state.city
        let telephone = this.state.telephone
        let email = this.state.email
        let speciality = this.state.selectedSpeciality

        if (fname === '' || lname === '' || hospital === '' || city === '' || telephone === '' ||
            email === '' || speciality === '' ||
            speciality === 0 ) {
            Toast.show({ text: 'Please fill all the details', buttonText: 'okay', duration: 3000 })
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

        this.props.doRegister(fname, lname, hospital, city, telephone, email, speciality)

    }

    render() {
        return (
            <View style={{ flex: 1 }}>

                {this.state.specialityLoading && <Loader></Loader>}
                {this.props.isLoading && <Loader></Loader>}

                <ImageBackground
                    style={{ flex: 1 }}
                    source={require('../assets/BackgroundImages/app_background.png')}
                    resizeMode='cover'
                >
                    <SafeAreaView>
                        <View style={{
                            alignItems: 'center', marginBottom: 10,
                            marginTop: 10
                        }}>

                            <Image style={{ width: 145, height: 45 }}
                                resizeMode='contain'
                                source={require('../assets/Icons/check.png')}></Image>

                            <Text style={{
                                fontSize: 16, fontFamily: 'Verdana Pro Regular',
                                color: '#333333',textAlign:'center'
                            }}>{" THYROID MEDICAL \n ROADMAP"}</Text>
                        </View>
                    </SafeAreaView>



                    <ScrollView
                        style={{ flex: 1, backgroundColor: '#fff', }}
                        keyboardShouldPersistTaps='handled'>


                        <KeyboardAvoidingView
                            keyboardVerticalOffset={Platform.OS == 'ios' ? 40 : 0}
                            behavior='padding'
                            style={{ flex: 1, alignItems: 'center', }}>
                            <Text
                                style={{
                                    fontSize: 24,
                                    color: Colors.purple1,
                                    margin: 15, fontFamily: 'Verdana Pro Light'
                                }}>
                                Sign up</Text>

                            <Text
                                style={{
                                    fontSize: 16,
                                    color: Colors.purple2,
                                    fontWeight: 'bold',
                                    fontFamily: 'Verdana Pro Cond SemiBold'
                                }}>
                                All fields are mandatory</Text>


                            <View style={styles.inputs}>
                                <View style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: 10, backgroundColor: Colors.Yellow
                                }}>
                                    <Image style={{ width: 18, height: 18 }}
                                        resizeMode='contain'
                                        source={require('../assets/Icons/first_name.png')}></Image>
                                </View>

                                <TextInput
                                    placeholder="First Name"
                                    placeholderTextColor={Colors.inputHint}
                                    style={styles.textInput}
                                    onChangeText={(firstName) => this.setState({ firstName })}>
                                </TextInput>

                            </View>

                            <View style={styles.inputs}>
                                <View style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: 10, backgroundColor: Colors.Yellow
                                }}>
                                    <Image style={{ width: 18, height: 18 }}
                                        resizeMode='contain'
                                        source={require('../assets/Icons/last_name.png')}></Image>
                                </View>

                                <TextInput
                                    placeholder="Last Name"
                                    placeholderTextColor={Colors.inputHint}
                                    style={styles.textInput}
                                    onChangeText={(lastName) => this.setState({ lastName })}>
                                </TextInput>

                            </View>


                            <View style={styles.inputs}>
                                <View style={{
                                    alignItems: 'center',
                                    justifyContent: 'center', padding: 10,
                                    backgroundColor: Colors.Yellow
                                }}>
                                    <Image style={{ width: 18, height: 18 }}
                                        resizeMode='contain'
                                        source={require('../assets/Icons/hospital.png')}></Image>
                                </View>

                                <TextInput
                                    placeholder="Hospital"
                                    placeholderTextColor={Colors.inputHint}
                                    style={styles.textInput}
                                    onChangeText={(hospital) => this.setState({ hospital })}>
                                </TextInput>

                            </View>


                            <View style={styles.inputs}>
                                <View style={{
                                    alignItems: 'center',
                                    justifyContent: 'center', padding: 10,
                                    backgroundColor: Colors.Yellow
                                }}>
                                    <Image style={{ width: 18, height: 16 }}
                                        resizeMode='contain'
                                        source={require('../assets/Icons/hospitality.png')}></Image>
                                </View>

                                {Platform.OS == 'ios' ?
                                    <View style={{ width: 250 }}>
                                        <Picker
                                            mode='dropdown'
                                            iosIcon={<Image style={{
                                                width: 10, height: 5,
                                                marginRight: 10
                                            }}
                                                source={require('../assets/Icons/dropdown.png')} />}
                                            placeholder='Select Speciality'
                                            // placeholder="Select your SIM"
                                            // placeholderStyle={{ color: "#bfc6ea" }}
                                            // placeholderIconColor="#007aff"
                                            textStyle={{
                                                flex: 1, fontSize: 14,
                                                fontFamily: 'Verdana Pro Cond Semibold',
                                                backgroundColor: Colors.inputBackground,
                                                paddingLeft: 20
                                            }}
                                            renderHeader={backAction =>
                                                <View style={{ backgroundColor: Colors.Yellow }}>
                                                    <AppToolbar backAction={backAction}></AppToolbar>
                                                </View>}
                                            style={{
                                                width: 250, height: 38,
                                                borderRadius: 0,
                                                backgroundColor: Colors.inputBackground,
                                            }}
                                            selectedValue={this.state.selectedSpeciality}
                                            onValueChange={(value) => this.setState({ selectedSpeciality: value })}
                                        >
                                            {this.state.specialities.map((v) => {
                                                return <Picker.Item label={v.name} value={v.name} key={v.id} />
                                            })}
                                        </Picker>
                                    </View> :
                                    <TouchableOpacity
                                        onPress={() => this.setState({ specialityVisibility: true })}
                                        style={{
                                            backgroundColor: Colors.inputBackground,
                                            flexDirection: 'row', width: 250
                                        }}>

                                        <Text
                                            numberOfLines={1}
                                            style={{
                                                fontFamily: 'Verdana Pro Cond Semibold',
                                                paddingTop: 8, paddingBottom: 8,
                                                paddingLeft: 8, paddingRight: 15,
                                                color: this.state.selectedSpecialityAnd == 'Select Speciality' ? Colors.inputHint : '#333'
                                            }}>{this.state.selectedSpecialityAnd}</Text>
                                        <Image style={{
                                            width: 10, height: 5,
                                            margin: 5, position: 'absolute', right: 0, alignSelf: 'center'
                                        }}
                                            source={require('../assets/Icons/dropdown.png')} />
                                        <AndroidPicker data={this.state.specialities} register={true}
                                            visibility={this.state.specialityVisibility}
                                            visible={(specialityVisibility) => this.setState({ specialityVisibility })}
                                            callback={(item) => this.setState({ selectedSpeciality: item.id, selectedSpecialityAnd: item.name, specialityVisibility: false })}>
                                        </AndroidPicker>

                                    </TouchableOpacity>


                                }



                            </View>


                            {/* <View style={styles.inputs}>
                                <View style={{
                                    alignItems: 'center',
                                    justifyContent: 'center', padding: 10,
                                    backgroundColor: Colors.Yellow
                                }}>
                                    <Image style={{ width: 18, height: 18 }}
                                        resizeMode='contain'
                                        source={require('../assets/Icons/country.png')}></Image>
                                </View>

                                {Platform.OS == 'ios' ? <View style={{ width: 250 }}>
                                    <Picker
                                        mode="dropdown"
                                        iosIcon={
                                            <Image style={{
                                                width: 10,
                                                height: 5, marginRight: 10
                                            }}
                                                source={require('../assets/Icons/dropdown.png')} />}
                                        placeholder="Select Country"
                                        // placeholderStyle={{ color: "#bfc6ea" }}
                                        // placeholderIconColor="#007aff"
                                        textStyle={{
                                            flex: 1, fontSize: 14,
                                            fontFamily: 'Verdana Pro Cond Semibold',
                                            backgroundColor: Colors.inputBackground,
                                            paddingLeft: 20
                                        }}
                                        renderHeader={backAction =>
                                            <View style={{ backgroundColor: Colors.Yellow }}>
                                                <AppToolbar backAction={backAction}></AppToolbar>
                                            </View>}
                                        style={{
                                            width: 250, height: 38, alignSelf: 'stretch',
                                            borderRadius: 0,
                                            backgroundColor: Colors.inputBackground,
                                        }}
                                        selectedValue={this.state.selectedCountry}
                                        onValueChange={(country) => this.setState({ selectedCountry: country })}

                                    >
                                        {this.state.countries.map((v) => {
                                            return <Picker.Item label={v} value={v} key={v} />
                                        })}
                                    </Picker>
                                </View> : <TouchableOpacity
                                    onPress={() => this.setState({ countryVisibility: true })}
                                    style={{
                                        backgroundColor: Colors.inputBackground,
                                        flexDirection: 'row', width: 250
                                    }}>

                                        <Text
                                            numberOfLines={1}
                                            style={{
                                                fontFamily: 'Verdana Pro Cond Semibold',
                                                paddingTop: 8, paddingBottom: 8,
                                                paddingLeft: 8, paddingRight: 15,
                                                color: this.state.selectedCountry == 'Select Country' ? Colors.inputHint : '#333'
                                            }}>{this.state.selectedCountry}</Text>
                                        <Image style={{
                                            width: 10, height: 5,
                                            margin: 5, position: 'absolute', right: 0, alignSelf: 'center'
                                        }}
                                            source={require('../assets/Icons/dropdown.png')} />
                                        <AndroidPicker data={this.state.countries}
                                            visibility={this.state.countryVisibility} visible={(countryVisibility) => this.setState({ countryVisibility })}
                                            callback={(item) => this.setState({ selectedCountry: item, countryVisibility: false })}>
                                        </AndroidPicker>

                                    </TouchableOpacity>

                                }




                            </View> */}

                            <View style={styles.inputs}>
                                <View style={{
                                    alignItems: 'center',
                                    justifyContent: 'center', padding: 10,
                                    backgroundColor: Colors.Yellow
                                }}>
                                    <Image style={{ width: 18, height: 18 }}
                                        resizeMode='contain'
                                        source={require('../assets/Icons/city.png')}></Image>
                                </View>

                                <TextInput
                                    placeholder="City"
                                    placeholderTextColor={Colors.inputHint}
                                    style={styles.textInput}
                                    onChangeText={(city) => this.setState({ city })}>
                                </TextInput>

                            </View>

                            <View style={styles.inputs}>
                                <View style={{
                                    alignItems: 'center',
                                    justifyContent: 'center', padding: 10,
                                    backgroundColor: Colors.Yellow
                                }}>
                                    <Image style={{ width: 18, height: 18 }}
                                        resizeMode='contain'
                                        source={require('../assets/Icons/telephone.png')}></Image>
                                </View>

                                <TextInput
                                    placeholder="Telephone"
                                    returnKeyType='done'
                                    keyboardType='numeric'
                                    textContentType='telephoneNumber'
                                    placeholderTextColor={Colors.inputHint}
                                    style={styles.textInput}
                                    onChangeText={(telephone) => this.setState({ telephone })}>
                                </TextInput>

                            </View>

                            <View style={styles.inputs}>
                                <View style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: 10, backgroundColor: Colors.Yellow,
                                }}>
                                    <Image style={{ width: 18, height: 18 }}
                                        resizeMode='contain'
                                        source={require('../assets/Icons/email.png')}></Image>
                                </View>

                                <TextInput
                                    placeholder="Email"
                                    autoCapitalize='none'
                                    textContentType='emailAddress'
                                    keyboardType='email-address'
                                    placeholderTextColor={Colors.inputHint}
                                    style={styles.textInput}
                                    onChangeText={(email) => this.setState({ email })}>
                                </TextInput>

                            </View>

                        </KeyboardAvoidingView>


                    </ScrollView>

                    <View style={{ backgroundColor: '#fff' }}>

                        <TouchableHighlight
                            onPress={this.onRegisterClick.bind(this)}
                            style={{
                                width: width, alignItems: 'center', alignSelf: 'center',
                                // paddingBottom: Platform.OS == 'ios' ? 30 : 10,
                                marginTop: 10
                            }}>


                            <Text
                                style={{
                                    width: width * .9, fontWeight: 'bold',
                                    color: '#fff', fontSize: 14,
                                    fontFamily: 'Verdana Pro Cond Bold',
                                    backgroundColor: Colors.green,
                                    padding: 10, textAlign: 'center'
                                }}>{"Submit "}</Text>



                        </TouchableHighlight>


                        <Text onPress={() => this.props.navigation.navigate('LoginScreen')}
                            style={{
                                alignSelf: "center", paddingTop: 10,
                                // paddingBottom: Platform.OS == 'ios' ? 30 : 10,
                                fontFamily: 'Verdana Pro Cond Regular'
                            }}>Already have an account?</Text>

                        <View style={{
                            borderColor: '#000', width: 50, backgroundColor: '#000',
                            marginBottom: Platform.OS == 'ios' ? 30 : 10,
                            borderBottomWidth: 3, margin: 10, alignSelf: 'center'
                        }}></View>


                    </View>


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
        fontFamily: 'Verdana Pro Cond Semibold',
        backgroundColor: Colors.inputBackground


    },

    inputs: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: Colors.strokeColor,
        marginTop: 15
    },

});


function mapStateToProps(state) {
    return {
        registerData: state.registerReducer.data,
        isLoading: state.registerReducer.registerIsLoading,
        registerIsSuccessful: state.registerReducer.registerSuccessful,
        registerError: state.registerReducer.error,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        doRegister: (fname, lname, hospital, city, telephone, email, speciality) => dispatch(register(fname, lname, hospital, city, telephone, email, speciality)),
        // speciality: (apiUrl,authkey) => dispatch(fetchData(apiUrl,authkey))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen)