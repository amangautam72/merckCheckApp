import React from 'react'

import { View, Image,  } from 'react-native'
import { Picker, } from 'native-base'
import Colors from '../Colors/Colors'

import { AppToolbar } from './AppToolbar'

export const CustomPicker = (props) => {


    return (


        <View>

        <Picker
            ref = {props.reference}
            mode='dropdown'
            iosIcon={<Image style={{ width: 10, height: 5, marginRight: 5 }}
                source={require('../assets/Icons/dropdown.png')} />}
            textStyle={{
                flex:1, color: Colors.inputHint, 
                fontFamily: 'Verdana Pro Cond Semibold',
                backgroundColor: Colors.inputBackground, paddingLeft:5,
                
                
            }}
            renderHeader={backAction =>
                <View style={{ backgroundColor: Colors.Yellow }}>
                    <AppToolbar backAction={backAction}></AppToolbar>
                </View>}
            style={{
                width: props.width,height: 32, 
                borderRadius: 0, backgroundColor: Colors.inputBackground,
            //     borderWidth: 1,
            // borderColor: Colors.strokeColor
               
            }}
            selectedValue={props.selectedValue}
            onValueChange={props.callBack}
            
        >
            {props.values.map((v) => {
                return <Picker.Item label={v} value={v} key={v}/>
            })}

        </Picker>
      
        </View>

       

    )
}

