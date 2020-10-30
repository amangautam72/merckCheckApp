import React from 'react'

import { View, Text, TouchableHighlight,TouchableOpacity, Modal, FlatList, StyleSheet, Dimensions } from 'react-native'


export const AndroidPicker = (props) => {

    let list = props.data

    return (
        <View >
            <Modal
                animationType='slide'
                transparent={true}
                visible={props.visibility}
                >
                
            <TouchableHighlight
            onPress ={() => props.visible(false)}
            style={{ flex: 1,justifyContent:'center', 
            backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <View
                style={styles.modal}>
                <FlatList
                    data={list}
                    renderItem={({ item }) => (
                        <TouchableOpacity 
                        onPress={() => props.callback(item)}
                        >
                        <View style={{backgroundColor:'#ffffff',padding:10}}>
                           <Text style={{color:'#000000'}}>{props.register ? item.name : item}</Text>
                        </View>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item, index) => index.toString()}>

                </FlatList>

                </View>    

            </TouchableHighlight>            
            </Modal>
        </View>



    )
}


const styles = StyleSheet.create({
    modal: {
        
        marginLeft: 50, marginRight: 50, marginTop: 60, marginBottom: 60,
        backgroundColor: '#fff', padding: 15, paddingLeft: 20, paddingRight: 20


    },
})
