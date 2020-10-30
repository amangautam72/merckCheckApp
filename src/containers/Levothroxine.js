'use strict';
import React from 'react';

import {
    StyleSheet,
    Text,
    View,
    Image,
    SafeAreaView,
    Dimensions,
    TouchableOpacity,
    ScrollView,
    AsyncStorage,
    FlatList,
    BackHandler

} from 'react-native';

import { Loader } from '../components/Loader'
import { Icon, Toast } from 'native-base'
import { AppToolbar } from '../components/AppToolbar'

import Colors from '../Colors/Colors'

import { fetchData } from '../actions/fetchDataAction'
import Server from '../services/server'
import { SERVER_ADDRESS } from '../services/server'
import { connect } from 'react-redux'

const width = Dimensions.get('window').width;

class Levothroxine extends React.Component {

    static navigationOptions = {
        drawerIcon: ({ tintColor }) => (
            <Icon name='menu' style={{ fontSize: 24, color: tintColor }} />
        ),

    }

    constructor(props) {
        super(props)
        this.state = {
            auth: null,
            title1: '',
            title2:'',
            points1:[],
            points2:[],
            data: ['yes', 'no', 'why']

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

                this.props.fetchData(Server.LEVOTHYROXINE_URL, this.state.auth)

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
                title1: this.props.data.title1,
                title2: this.props.data.title2,
                points1: this.props.data.point1,
                points2: this.props.data.point2,
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
                }}>Levothyroxine Treatment</Text>


                <Text style={{
                    width: width, fontFamily: 'Verdana Pro Cond SemiBold', fontSize: 16,
                    backgroundColor: Colors.lightGrey, color: Colors.purple2,
                    padding: 15, paddingLeft: 25, paddingRight: 25
                }}>Dosing Schedule</Text>


                <ScrollView style={{ flex: 1, paddingTop:10 }}>

                    <View style={{ flex: 1, backgroundColor: Colors.orange,
                         padding:10, marginLeft:25, marginRight:25, marginTop:10 }} >
                        <Text style={{
                            alignSelf: 'center', color: '#fff',padding:5,
                            fontSize: 14, fontFamily: 'Verdana Pro Cond Bold',
                            textAlign: 'center',

                        }}>{this.state.title1}</Text>

                        <FlatList
                            style={{ flex: 1, paddingBottom: 20 }}
                            data={this.state.points1}
                            renderItem={({ item, index }) => (
                                <View style={{ flexDirection: 'row', padding: 5 }}>
                                    <Image style={{ width: 8, height: 8 , alignSelf: 'center' }}
                                        resizeMode='contain'
                                        source={require('../assets/Icons/circle.png')}></Image>
                                    <Text style={{
                                        paddingLeft: 10,paddingRight:10, alignSelf: 'center',
                                        fontSize: 14, color: '#fff',
                                        fontFamily: 'Verdana Pro Cond Regular'
                                    }}>{item.point}</Text>
                                </View>
                            )}
                            keyExtractor={(item, index) => index.toString()}>

                        </FlatList>
                    </View>



                    <Image style={{ width: 60, height: 30, alignSelf: 'center', marginTop: 15 }}
                        resizeMode='contain'
                        source={require('../assets/Icons/yellowArrowDown.png')}></Image>


                    <View style={{ flex: 1, backgroundColor: Colors.green, padding:10,
                        marginLeft:25, marginRight:25, marginTop:10, marginBottom:30}} >
                        <Text style={{
                            alignSelf: 'center', color: '#fff', padding:5,
                            fontSize: 14, fontFamily: 'Verdana Pro Cond Bold',
                            textAlign: 'center',

                        }}>{this.state.title2}</Text>

                        <FlatList
                            style={{ flex: 1, paddingBottom: 20 }}
                            data={this.state.points2}
                            renderItem={({ item, index }) => (
                                <View style={{ flexDirection: 'row', padding: 5 }}>
                                    <Image style={{ width: 8, height: 8, alignSelf: 'center' }}
                                        resizeMode='contain'
                                        source={require('../assets/Icons/circle.png')}></Image>
                                    <Text style={{
                                        paddingLeft: 10,paddingRight:10, alignSelf: 'center',
                                        fontSize: 14, color: '#fff',
                                        fontFamily: 'Verdana Pro Cond Regular'
                                    }}>{item.point}</Text>
                                </View>
                            )}
                            keyExtractor={(item, index) => index.toString()}>

                        </FlatList>
                    </View>


                    {/* <Text style={{
                        alignSelf: 'center', color: '#fff',
                        fontSize: 14, fontFamily: 'Verdana Pro Cond Bold',
                        textAlign: 'center', backgroundColor: Colors.green,
                        paddingTop: 15, paddingBottom: 15, paddingLeft: 20, paddingRight: 20,
                        marginLeft: 25, marginRight: 25, marginTop: 10, marginBottom: 20,
                        lineHeight: 25
                    }}>{this.state.text2}</Text> */}



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


export default connect(mapStateToProps, mapDispatchToProps)(Levothroxine)
