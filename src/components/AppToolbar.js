import React from 'react'

import { Platform, View, Text, Image, SafeAreaView, TouchableOpacity } from 'react-native'
import Colors from '../Colors/Colors'


export const AppToolbar = (props) => {

    return (

        <SafeAreaView style={{
            flexDirection: 'row', backgroundColor: Colors.Yellow,

        }}>
            <View style={{
                flex: 1, flexDirection: 'row', backgroundColor: Colors.Yellow,
                padding: 10, paddingLeft: 20, paddingRight: 25,
                paddingTop: Platform.OS == 'ios' ? 10 : 25
            }}>


                <TouchableOpacity onPress={() => props.backAction()}
                    style={{ alignSelf: 'center' }}>


                    <View style={{
                       alignSelf: 'stretch',
                        flexDirection: 'row',
                    }}>
                        <Image style={{ width: 20, height: 16, alignSelf: 'center' }}
                            resizeMode='contain'
                            source={require('../assets/Icons/goBack.png')}></Image>
                        <Text style={{ color: Colors.purple, fontSize: 14, fontFamily: 'Verdana Pro Cond SemiBold' }}>Back</Text>
                    </View>
                </TouchableOpacity>

                <View style={{flex:1, flexDirection: 'row', justifyContent:'flex-end' }}>


                    <Image style={{ width: 100, height: 30, }}
                        resizeMode='contain'
                        source={require('../assets/Icons/checkwithwhitetick.png')}></Image>

                    <Text
                        style={{
                           
                            fontFamily: 'Verdana Pro Regular', marginLeft: 5,
                            color: Colors.textColor, fontSize: 12
                        }}>{"THYROID \nMEDICAL ROADMAP"}</Text>

                </View>
            </View>
        </SafeAreaView>
    )
}

