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
    ScrollView

} from 'react-native';

import { SimpleList } from '../components/SimpleList'
import { Icon } from 'native-base'

import Colors from '../Colors/Colors'

const width = Dimensions.get('window').width;

export default class Dosing2 extends React.Component {

    static navigationOptions = {
        drawerIcon: ({ tintColor }) => (
            <Icon name='menu' style={{ fontSize: 24, color: tintColor }} />
        ),

    }

    constructor() {
        super()


    }

    render() {

        return (
            <View style={styles.container}>


                <View style={{ backgroundColor: Colors.Yellow }}>
                    <SafeAreaView style={{
                        flexDirection: 'row',
                        margin: 10, marginLeft: 25, marginRight: 25, marginTop: 50
                    }}>
                        <Image style={{ width: 90, height: 30 }}
                            resizeMode='contain'
                            source={require('../assets/Icons/checkwithwhitetick.png')}></Image>

                        <Text
                            style={{
                                alignSelf: 'center',
                                fontFamily: 'Verdana Pro Regular', marginLeft: 10,
                                color: Colors.textColor, fontSize: 14
                            }}>A ROADMAP</Text>



                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}
                            style={{ flex: 1, alignSelf: 'center', }}>


                            <View style={{
                                justifyContent: 'flex-end', alignSelf: 'stretch',
                                flexDirection: 'row',
                            }}>
                                <Image style={{ width: 20, height: 16, alignSelf: 'center' }}
                                    resizeMode='contain'
                                    source={require('../assets/Icons/goBack.png')}></Image>
                                <Text style={{ color: Colors.purple, fontSize: 14, fontFamily: 'Verdana Pro Cond SemiBold' }}>Back</Text>
                            </View>
                        </TouchableOpacity>



                    </SafeAreaView>
                </View>


                <Text style={{
                    color: '#fff', fontSize: 24,
                    width: width, padding: 15, paddingLeft: 25,paddingRight:25, paddingBottom: 10,
                    backgroundColor: Colors.purple2,
                    fontFamily: 'Verdana Pro Light'
                }}>Dosing</Text>


                <Text style={{
                    width: width, fontFamily: 'Verdana Pro Cond SemiBold', fontSize: 16,
                    backgroundColor: Colors.lightGrey, color: Colors.purple2,
                    padding: 15, paddingLeft: 25, paddingRight: 25
                }}>Management of adult patients^6</Text>


                <ScrollView>
                    <Image style={{ width: 180, height: 250, alignSelf: 'center', margin: 20 }}
                        resizeMode='contain'
                        source={require('../assets/BackgroundImages/adults.png')}></Image>


                    <Text style={{
                        alignSelf: 'center', color: '#fff',
                        fontSize: 14, fontFamily: 'Verdana Pro Cond Bold',
                        textAlign: 'center', backgroundColor: Colors.orange,
                        paddingTop:10,paddingBottom:10,paddingLeft:20, paddingRight:20,
                        marginLeft: 25, marginRight: 25,lineHeight:25
                    }}>{'Newly diagnosed, healthy, young to middle aged patients (<65 years of age) who have no comorbidities or cardiovascular risk factors'}</Text>


                    <Image style={{ width: 60, height: 30, alignSelf: 'center', marginTop: 15 }}
                        resizeMode='contain'
                        source={require('../assets/Icons/yellowArrowDown.png')}></Image>


                    <Text style={{
                        alignSelf: 'center', color: '#fff',
                        fontSize: 14, fontFamily: 'Verdana Pro Cond Bold',
                        textAlign: 'center', backgroundColor: Colors.green, 
                        paddingTop:15,paddingBottom:15,paddingLeft:20, paddingRight:20,
                        marginLeft: 25, marginRight: 25, marginTop:10,marginBottom:50,
                        lineHeight:25
                    }}>Full levothyroxine starting dose: 1.6 µg/kg body weight</Text>


                   
                </ScrollView>

            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',


    },
    alignment: {
        justifyContent: 'center',
        alignItems: 'center',

    },

});

