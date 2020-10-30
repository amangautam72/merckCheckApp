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
    ScrollView,
    AsyncStorage,
    BackHandler

} from 'react-native';

import { Loader } from '../components/Loader'
import { Icon, Toast } from 'native-base'
import { AppToolbar } from '../components/AppToolbar'

import Colors from '../Colors/Colors'

import { fetchData } from '../actions/fetchDataAction'
import { SERVER_ADDRESS } from '../services/server'
import { connect } from 'react-redux'

const width = Dimensions.get('window').width;

const regex = /(<([^>]+)>)/ig;

class Management2 extends React.Component {

    static navigationOptions = {
        drawerIcon: ({ tintColor }) => (
            <Icon name='menu' style={{ fontSize: 24, color: tintColor }} />
        ),

    }

    constructor(props) {
        super(props)
        this.state = {
            auth: null,
            url: this.props.navigation.state.params.url,
            elder: this.props.navigation.state.params.elder,
            pregnant: this.props.navigation.state.params.pregnant,
            title: '',
            image: '',
            text1: '',
            text2: '',
            text3: '',
            text4: '',
            text5: ''

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

        this.props.navigation.goBack()
        return true

    }

    getKey = async () => {
        try {
            const value = await AsyncStorage.getItem('AUTH');
            if (value !== null || value != '') {
                // We have data!!
                this.setState({ auth: value })

                this.props.fetchData(this.state.url, this.state.auth)

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

            this.setState({
                title: this.props.data.title,
                image: this.props.data.image,
                text1: this.props.data.text1,
                text2: this.props.data.text2,
                text3: this.props.data.text3,
                text4: this.props.data.text4,
                text5: this.props.data.text5,

            })
        }
    }

    render() {

        return (
            <View style={styles.container}>

                {this.props.isLoading && <Loader></Loader>}

                <AppToolbar backAction={() => this.props.navigation.goBack()}></AppToolbar>

                <Text style={{
                    color: '#fff', fontSize: 24,
                    width: width, padding: 15, paddingLeft: 25, paddingRight: 25, paddingBottom: 10,
                    backgroundColor: Colors.purple2,
                    fontFamily: 'Verdana Pro Light'
                }}>Dosing</Text>


                <Text style={{
                    width: width, fontFamily: 'Verdana Pro Cond SemiBold', fontSize: 16,
                    backgroundColor: Colors.lightGrey, color: Colors.purple2,
                    padding: 15, paddingLeft: 25, paddingRight: 25
                }}>{this.state.title.replace(regex, '')}</Text>


                <ScrollView style={{ flex: 1, }}>
                    <Image style={{
                        width: 180, height: 250,
                        alignSelf: 'center', margin: 20,
                    }}
                        resizeMode='contain'
                        source={{ uri: SERVER_ADDRESS + this.state.image }}></Image>


                    <Text style={{
                        alignSelf: 'center', color: '#fff',
                        fontSize: 14, fontFamily: 'Verdana Pro Cond Bold',
                        textAlign: 'center', backgroundColor: Colors.orange,
                        paddingTop: 10, paddingBottom: 10, paddingLeft: 20,
                        paddingRight: 20,
                        marginLeft: 25, marginRight: 25, lineHeight: 25
                    }}>{this.state.text1}</Text>


                    <View style={{ flexDirection: 'row' }}>
                        <Image style={{ flex: 1, width: 60, height: 30, alignSelf: 'center', marginTop: 15 }}
                            resizeMode='contain'
                            source={require('../assets/Icons/yellowArrowDown.png')}></Image>

                        {this.state.elder && <Image style={{ flex: 1, width: 60, height: 30, alignSelf: 'center', marginTop: 15 }}
                            resizeMode='contain'
                            source={require('../assets/Icons/yellowArrowDown.png')}></Image>}

                    </View>

                    {/* <Image style={{ width: 60, height: 30, alignSelf: 'center', marginTop: 15 }}
                        resizeMode='contain'
                        source={require('../assets/Icons/yellowArrowDown.png')}></Image> */}

                    {this.state.elder && <View>


                        <View style={{ flex: 1, flexDirection: 'row', }}>
                            <View style={{
                                flex: 1, paddingTop: 10, paddingBottom: 10, paddingLeft: 20,
                                paddingRight: 20, alignSelf: 'stretch', justifyContent: 'center',
                                backgroundColor: Colors.green, margin: 10
                            }}>
                                <Text style={{
                                    color: '#fff',
                                    fontSize: 14, fontFamily: 'Verdana Pro Cond Bold',
                                    textAlign: 'center',
                                    lineHeight: 25
                                }}>{this.state.text2}</Text>
                            </View>


                            <View style={{
                                flex: 1, paddingTop: 10, paddingBottom: 10, paddingLeft: 20,
                                paddingRight: 20, alignSelf: 'stretch', justifyContent: 'center',
                                backgroundColor: Colors.green, margin: 10
                            }}>
                                <Text style={{
                                    color: '#fff',
                                    fontSize: 14, fontFamily: 'Verdana Pro Cond Bold',
                                    lineHeight: 25, textAlign: 'center'
                                }}>{this.state.text3}</Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Image style={{ flex: 1, width: 60, height: 30, alignSelf: 'center', marginTop: 15 }}
                                resizeMode='contain'
                                source={require('../assets/Icons/greenArrowDown.png')}></Image>

                            <Image style={{ flex: 1, width: 60, height: 30, alignSelf: 'center', marginTop: 15 }}
                                resizeMode='contain'
                                source={require('../assets/Icons/greenArrowDown.png')}></Image>

                        </View>

                        <View style={{ flex: 1, flexDirection: 'row', }}>
                            <View style={{
                                flex: 1, paddingTop: 10, paddingBottom: 10, paddingLeft: 20,
                                paddingRight: 20, alignSelf: 'stretch', justifyContent: 'center',
                                backgroundColor: Colors.blue, margin: 10
                            }}>
                                <Text style={{
                                    color: '#fff',
                                    fontSize: 14, fontFamily: 'Verdana Pro Cond Bold',
                                    textAlign: 'center',
                                    lineHeight: 25
                                }}>{this.state.text4}</Text>
                            </View>


                            <View style={{
                                flex: 1, paddingTop: 10, paddingBottom: 10, paddingLeft: 20,
                                paddingRight: 20, alignSelf: 'stretch', justifyContent: 'center',
                                backgroundColor: Colors.blue, margin: 10
                            }}>

                                <Text style={{
                                    color: '#fff',
                                    fontSize: 14, fontFamily: 'Verdana Pro Cond Bold',
                                    lineHeight: 25, textAlign: 'center'
                                }}>{this.state.text5}</Text>
                            </View>
                        </View>

                    </View>
                    }

                    {this.state.elder == undefined ? <Text style={{
                        alignSelf: 'center', color: '#fff',
                        fontSize: 14, fontFamily: 'Verdana Pro Cond Bold',
                        textAlign: 'center', backgroundColor: Colors.green,
                        paddingTop: 15, paddingBottom: 15, paddingLeft: 20, paddingRight: 20,
                        marginLeft: 25, marginRight: 25, marginTop: 10, marginBottom: 20,
                        lineHeight: 25
                    }}>{this.state.text2}</Text> : null
                    }



                    {this.state.pregnant &&
                        <View style={{ marginBottom: 20, }}>
                            <Image style={{ width: 60, height: 30, alignSelf: 'center', marginTop: 15 }}
                                resizeMode='contain'
                                source={require('../assets/Icons/yellowArrowDown.png')}></Image>

                            <Text style={{
                                alignSelf: 'center', color: '#fff',
                                fontSize: 14, fontFamily: 'Verdana Pro Cond Bold',
                                textAlign: 'center', backgroundColor: Colors.blue,
                                paddingTop: 15, paddingBottom: 15, paddingLeft: 20, paddingRight: 20,
                                marginLeft: 25, marginRight: 25, marginTop: 10,
                                lineHeight: 25
                            }}>{this.state.text3}</Text>
                        </View>
                    }



                </ScrollView>

            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex: 1

    },
    alignment: {
        justifyContent: 'center',
        alignItems: 'center',

    },

});


function mapStateToProps(state) {
    return {
        data: state.appData.data,
        isLoading: state.appData.isFetching,
        hasError: state.appData.error,
        sessionExpired: state.appData.sessionExpired
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchData: (apiUrl, authKey) => dispatch(fetchData(apiUrl, authKey))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Management2)
