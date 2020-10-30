import React from 'react'

import { Text } from 'react-native'
import { Header, Left, Right, Icon } from 'native-base'


export const Toolbar = (props) => {
    return (

        <Header style={{ backgroundColor: 'white', height: 70 }}>
            <Left style={{ flexDirection: 'row', flex: 1, padding: 5, alignItems:'center' }}>
                <Icon onPress={() => props.navigation.openDrawer()}
                    name='menu' />

                <Text style={{ fontSize: 20, marginLeft: 20, fontWeight: 'bold', color: 'black' }}>{props.title}</Text>
            </Left>


            <Right />

        </Header>
    )
}