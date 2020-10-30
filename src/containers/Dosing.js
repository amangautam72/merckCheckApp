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
    TouchableHighlight,
    ScrollView,
    AsyncStorage,
    BackHandler,
    Modal

} from 'react-native';

import { Loader } from '../components/Loader'
import { Icon, Toast } from 'native-base'
import { AppToolbar } from '../components/AppToolbar'

import Colors from '../Colors/Colors'

import Server from '../services/server'
import { fetchData } from '../actions/fetchDataAction'
import { SERVER_ADDRESS } from '../services/server'
import { connect } from 'react-redux'

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

class Dosing extends React.Component {

    static navigationOptions = {
        drawerIcon: ({ tintColor }) => (
            <Icon name='menu' style={{ fontSize: 24, color: tintColor }} />
        ),

    }

    constructor(props) {
        super(props)
        this.state = {
            auth: null,
            title: '',
            image: '',
            width: 0,
            height: 0,
            modalVisible: false

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

                this.props.fetchData(Server.MANAGE_URL, this.state.auth)

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
                title: this.props.data.text1,
                image: this.props.data.image,
            })

        }
    }

    render() {

        return (
            <View style={styles.container}>

                {this.props.isLoading && <Loader></Loader>}

                <Modal
                    animationType='fade'
                    transparent={true}
                    visible={this.state.modalVisible}
                >

                    <TouchableHighlight
                        onPress={() => this.setState({ modalVisible: false, })}
                        style={{
                            flex: 1, justifyContent: 'center',
                            backgroundColor: 'rgba(0,0,0,0.5)'
                        }}>
                        <TouchableHighlight
                            style={styles.modal}>

                            <Image
                                style={{width: width-10,height: height* .7, alignSelf: 'center', }}
                                source={{ uri: SERVER_ADDRESS + this.state.image }}
                                resizeMode='contain'>

                            </Image>

                        </TouchableHighlight>

                    </TouchableHighlight>
                </Modal>

                <AppToolbar backAction={() => this.props.navigation.goBack()}></AppToolbar>


                <Text style={{
                    color: '#fff', fontSize: 24,
                    width: width, padding: 15, paddingLeft: 25, paddingRight: 25, paddingBottom: 10,
                    backgroundColor: Colors.purple2,
                    fontFamily: 'Verdana Pro Light'
                }}>Management</Text>


                <Text style={{
                    width: width, fontFamily: 'Verdana Pro Cond SemiBold', fontSize: 16,
                    backgroundColor: Colors.lightGrey, color: Colors.purple2,
                    padding: 15, paddingLeft: 25, paddingRight: 25
                }}>{this.state.title}</Text>


                <ScrollView
                    keyboardShouldPersistTaps='always'
                >
                    <TouchableOpacity
                        onPress={() => this.setState({ modalVisible: true })}
                        style={{ paddingBottom: 20 }}>

                        <Image
                            style={{ width: width, height: height * .7, alignSelf: 'center', }}
                            resizeMode='contain'
                            source={{ uri: SERVER_ADDRESS + this.state.image }}></Image>

                    </TouchableOpacity>
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
    modal: {
        marginLeft: 10,
        marginRight: 10,
        // backgroundColor: '#fff',
        


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


export default connect(mapStateToProps, mapDispatchToProps)(Dosing)
