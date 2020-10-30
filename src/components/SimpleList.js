import React from 'react'

import { View, Text, Image, FlatList } from 'react-native'


const data = ["oka", "thanks"]

export const SimpleList = (props) => {

    let data = props.title

    return (

        <FlatList
            style={{flex:1,paddingBottom:20}}
            data={data}
            renderItem={({ item, index }) => (
                <View style={{ flexDirection: 'row', padding:15, paddingLeft:25,
                paddingRight:30, }}>
                    <Image style={{ width: 12, height: 12, marginTop:8,}}
                        resizeMode='contain'
                        source={require('../assets/Icons/rightArrow.png')}></Image>
                    <Text style={{marginLeft:10, alignSelf:'flex-start',
                        fontSize:14, lineHeight:25,
                        fontFamily:'Verdana Pro Cond Regular'
                        }}>{item.text}</Text>
                </View>
            )}
            keyExtractor={(item, index) => index.toString()}>

        </FlatList>
    )
}

