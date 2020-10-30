import React from 'react'

import { View, Text, StyleSheet, TouchableHighlight, Modal, Dimensions, ScrollView } from 'react-native'
import { Toast } from 'native-base'
import Colors from '../Colors/Colors'

const width = Dimensions.get('window').width

export const CalculatorResultModal = (props) => {

  let result1 = ''
  let result2 = ''
  let result3 = ''
  let result4 = ''
  let result5 = ''
  if (props.visibility) {
    result1 = props.result1
    result2 = props.result2
    result3 = props.result3
    result4 = props.result4
    result5 = props.result5
  }

  if(result1 == undefined || result2 == undefined || 
    result3 == undefined || result4 == undefined || result5 == undefined){

      Toast.show({ text: 'Something went wrong, please try again', buttonText: 'okay', duration: 3000 })
    return null
  }

  return (
    <View>
      <Modal
        animationType='slide'
        transparent={true}
        visible={props.visibility}
        onRequestClose={props.callback}
        >
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View
            style={styles.modal}>
            <Text style={{
              fontSize: 24,
              color: Colors.purple2,
              fontFamily: 'Verdana Pro Light'
            }}>Disclaimer</Text>


          <ScrollView style={{flex:1}}>
            <Text style={styles.description}>The authors make no claims of the accuracy of the information contained herein; and these suggested doses are not a substitute for clinical judgment. Neither Springer Healthcare, Merck or any other parties involved in the preparation of this program shall be liable for any special, consequential, or exemplary damages resulting in whole or part from any user’s use of or reliance upon this material.
            </Text>
            <Text style={styles.description}>PLEASE READ THE DISCLAIMER CAREFULLY BEFORE ACCESSING OR USING THIS TOOL. BY ACCESSING OR USING THIS TOOL, YOU AGREE TO BE BOUND BY THE TERMS AND CONDITIONS SET FORTH IN THE DISCLAIMER.
            </Text>

            <View style={{ height: 1, backgroundColor: '#333333', marginTop: 10 }}></View>

            <Text style={{
              fontSize: 24, color: Colors.purple2,
              fontFamily: 'Verdana Pro Light', marginTop: 10
            }}>Results</Text>
            <View style={{
              paddingTop: 5, paddingBottom: 5,
              borderWidth: 2, borderColor: Colors.strokeColor, marginTop: 10
            }}>
              <Text style={{ padding: 10, fontSize: 14, fontFamily: 'Verdana Pro Cond SemiBold' }}>
                {result1.indexOf(':') > -1 ? result1.substr(0, result1.indexOf(':')) : result1}
                <Text style={{ color: Colors.green, fontSize: 14, fontFamily: 'Verdana Pro Cond Regular' }}>
                  {result1.indexOf(':') > -1 ? result1.substr(result1.indexOf(':') + 1) : null} </Text>
              </Text>

              <Text style={{ padding: 10, fontSize: 14, fontFamily: 'Verdana Pro Cond SemiBold' }}>
                {result2.substr(0, result2.indexOf(':'))}
                <Text style={{ color: Colors.green, fontSize: 14, fontFamily: 'Verdana Pro Cond Regular' }}> {result2.substr(result2.indexOf(':') + 1)} </Text>
              </Text>

              <Text style={{ padding: 10, fontSize: 14, fontFamily: 'Verdana Pro Cond SemiBold' }}>
                {result3.substr(0, result3.indexOf(':'))}
                <Text style={{ color: Colors.green, fontSize: 14, fontFamily: 'Verdana Pro Cond Regular' }}> {result3.substr(result3.indexOf(':') + 1)} </Text>
              </Text>

              <Text style={{ padding: 10, fontSize: 14, fontFamily: 'Verdana Pro Cond SemiBold' }}>
                {result4.substr(0, result4.indexOf(':')).trim()}
                <Text style={{ color: Colors.green, fontSize: 14, fontFamily: 'Verdana Pro Cond Regular' }}> {result4.substr(result4.indexOf(':') + 1)} </Text>
              </Text>

                <Text style={{ fontSize: 14, 
                  fontFamily: 'Verdana Pro Cond SemiBold', padding:10 }}>{result5.trim()} </Text>
           

            </View>

            </ScrollView>  

            <View style={{ justifyContent: 'flex-end', marginTop:10 }}>
              <TouchableHighlight
                onPress={props.callback}
                style={{
                  backgroundColor: Colors.green, padding: 15,
                  alignItems: 'center', justifyContent: 'flex-end', alignContent: 'flex-end'
                }}>
                <Text style={{ color: '#ffffff', 
                fontWeight: 'bold', alignItems:'center' }}>{' Done '}</Text>
              </TouchableHighlight>
            </View>

          </View>
        </View>

      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  modal: {
    flex: 1, marginLeft: 30, marginRight: 30, marginTop: 60, marginBottom: 60,
    backgroundColor: '#fff', padding: 15, paddingLeft: 20, paddingRight: 20


  },
  description: {
    fontSize: 12, color: '#333333',
    fontFamily: 'Verdana Pro Cond Regular',
    marginTop: 10, lineHeight: 20
  },

  textInput: {
    width: 46,
    height: 32,
    fontSize: 14,
    alignSelf: 'stretch',
    // paddingTop: Platform.OS == 'ios' ? 10 : 5,
    // paddingBottom: Platform.OS == 'ios' ? 10 : 5,
    paddingLeft: 5,
    fontFamily: 'Verdana Pro Cond Semibold',
    backgroundColor: Colors.inputBackground,
    borderWidth: 1,
    borderColor: Colors.strokeColor,

  },

});


