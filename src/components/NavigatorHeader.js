import React from 'react'

import { StyleSheet, Text, View, SafeAreaView, ScrollView, Image, AsyncStorage, Alert } from 'react-native'
import { DrawerItems } from 'react-navigation'

import Colors from '../Colors/Colors'

export const NavigatorHeader = props => {

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.purple2 }}>
            <View style={{ height: 150, alignItems: 'center', justifyContent: 'center' }}>
                <Image source={require('../assets/Icons/checkwithgreentick.png')}
                    resizeMode='contain'
                    style={{ height: 45, width: 155 }}></Image>

                <Text style={{
                    fontSize: 16, fontFamily: 'Verdana Pro Regular',
                    color: '#fff', margin: 5, textAlign: 'center'
                }}>{"THYROID MEDICAL \nROADMAP"}</Text>

                <View style={{ height: 2, width: 50, marginTop: 5, backgroundColor: '#ffffff' }}></View>
            </View>
            <ScrollView >
                <DrawerItems {...props}
                    onItemPress={
                        (route) => {
                            if (route.route.routeName !== "Logout") {
                                props.onItemPress(route);
                                // this.props.navigation.navigate(route.route.routeName)
                                return;
                            } else {
                                console.log("logged out")
                                Alert.alert(
                                    '',
                                    'Do you really want to logout from the app?',
                                    [

                                        {
                                            text: 'Yes',
                                            onPress: () => {
                                                console.log('Cancel Pressed')
                                                AsyncStorage.clear()
                                                props.navigation.navigate('LoginScreen')
                                            },
                                            style: 'cancel',
                                        },
                                        { text: 'No', onPress: () => console.log('OK Pressed') },
                                    ],
                                    { cancelable: false },
                                );

                            }

                        }
                    }
                />
                <View style={{ height: 200, marginTop : 60, alignItems: 'center', justifyContent: 'center' }}>
                    <Image source={require('../assets/Icons/SSDS-Logo-White.png')}
                        resizeMode='contain'
                        style={{ height: 200, width: 200 }}></Image>
                </View>
                <Text style={{ color: '#fff', marginTop: 60, fontSize: 12, marginLeft: 20 }}>{'KSA/EUT/0818/0009'}</Text>
            </ScrollView>


        </SafeAreaView>
    )

}


const styles = StyleSheet.create({
    modal: {
        marginLeft: 50, marginRight: 50, marginTop: 60, marginBottom: 60,
        backgroundColor: '#fff', padding: 15, paddingLeft: 20, paddingRight: 20
    },
})
