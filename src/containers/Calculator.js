'use strict';
import React from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Platform,
  Modal,
  AsyncStorage,
  BackHandler,
  TouchableHighlight,
  NetInfo


} from 'react-native';

import { AndroidPicker } from '../components/AndroidPicker'
import { CalculatorResultModal } from '../components/CalculatorResultModal'
import HTML from 'react-native-render-html';

import Colors from '../Colors/Colors'
import { AppToolbar } from '../components/AppToolbar'
import { Loader } from '../components/Loader'
import { calculatorResult } from '../actions/calculatorAction'
import { calDisclaimer } from '../services/requests'
import Server from '../services/server'
import { connect } from 'react-redux'


import { Toast } from 'native-base'

const width = Dimensions.get('window').width;

const htmlcontent = `This calculator provides very basic initial levothyroxine dosage and follow-up guidelines for adult patients with hypothyroidism.

The starting dose, frequency of dose titration, and the optimal full replacement dose should be based on several key parameters including¹:

(1) Patient age  e.g. older patients: start lower and titrate more slowly.

(2) Weight (1.6-1.7 mcg/kg lean body weight). Note: based on available research, IBW is a suitable substitute for LBW.

(3) Cardiovascular status (positive history of coronary artery disease warrants initiation at a very low dose and very slow titration),

(4) General health.

(5) Concomitant medications (see examples below).

(6) Severity and duration of hypothyroidism.

Consultation with an endocrinologist should be considered in the following cases¹:

(1) Patients less than 18 years old

(2) Patients unresponsive to therapy

(3) Pregnant patients`

class Calculator extends React.Component {


  constructor() {
    super()
    this.state = {
      auth: null,
      userId: null,
      age: ['Select Age', '0-9 years', '10-65 years', ">65 years"],
      selectedAge: 'Select Age',
      gender: ['Select Gender', 'Male', 'Female'],
      selectedGender: 'Select Gender',
      heightUnit: ['cm', 'ft/In'],
      selectedUnitH: 'cm',
      weightUnit: ['kg', 'lbs'],
      selectedUnitW: 'kg',
      ftLevel: ['Yes', 'No'],
      selectedFtLevel: 'No',
      disease: ['Yes', 'No'],
      selectedDisease: 'No',
      height: '',
      weight: '',
      disclaimerSelected: false,
      modalVisible: false,
      resultText1: '',
      resultText2: '',
      resultText3: '',
      resultText4: '',
      resultText5: '',
      agePickerVisible: false,
      genderPickerVisible: false,
      heightPickerVisible: false,
      weightPickerVisible: false,
      ftPickerVisible: false,
      diseasePickerVisible: false,

      disclaimerData: '',
      disclaimerModal: false,
      disclaimerLoading: true

    }

    this.picker = React.createRef() // make the ref

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
      const userId = await AsyncStorage.getItem('USERID')
      if (value !== null || value != '') {
        // We have data!!
        this.setState({ auth: value, userId: userId })

        NetInfo.isConnected.fetch().done((isConnected) => {

          console.log("AUTHJ  :  " + this.state.auth)
         
          if(isConnected){
            calDisclaimer(Server.DISCALCULATOR_URL, this.state.auth,userId).then(res => {

              console.log("RESS SSSSSSSSSS :  " + JSON.stringify(res))
            
    
              if (res.code == 200) {
    
                this.setState({ disclaimerData: res.data.text1, disclaimerLoading: false })
              } else {
                this.setState({ disclaimerLoading: false })
              }
            }).catch((err) => this.setState({ disclaimerLoading: false }))
      
          }
          else{
              Toast.show({ text: 'No internet connection found!- Internet connection required to use this app', buttonText: 'okay', duration: 3000 })
          }
      })
       

      }
    } catch (error) {
      // Error retrieving data
      console.log("ERROR: " + error)
    }
  }

  componentDidUpdate(props) {
    // if(props.sessionExpired){
    //   Toast.show({ text: 'your session has been expired, please logout and login again', buttonText: 'okay', duration: 3000 })
    //   return
    // }

  }

  componentWillReceiveProps(props) {
   
    if (props.data != this.props.data) {
     
      if (props.hasError) {
        Toast.show({ text: 'Something went wrong', buttonText: 'okay', duration: 3000 })
        return
      }

      this.setState({
        resultText1: props.data.text, resultText2: props.data.text1,
        resultText3: props.data.text2, resultText4: props.data.text3,resultText5: props.data.text4,
        modalVisible: true
      })

    }
  }

  onAgeClick(item) {

    var array = this.state.gender
    if (item === '10-65 years') {

      if (array.length < 4) {
        array.push('Pregnant female')
      }

      this.setState({ selectedAge: item, agePickerVisible: false, gender: array })
    }
    else {
      if (this.state.selectedGender === 'Pregnant female') {
        this.setState({ selectedAge: item, agePickerVisible: false, selectedGender: 'Select Gender' })
      } else {
        this.setState({ selectedAge: item, agePickerVisible: false })
      }
    }

  }


  onGenderClick(genderPickerVisible) {

    // this.setState({ genderPickerVisible })

    var array = this.state.gender
    if (this.state.selectedAge != '10-65 years' ) {

      if (array.length > 3) {
        array.pop()
      }

  
      this.setState({ genderPickerVisible: true, gender: array })
    }
    else {
      this.setState({ genderPickerVisible })
    }
  }


  onDisclaimerClick() {
    if (!this.state.disclaimerSelected) {
      this.setState({ disclaimerSelected: true })
    } else {
      this.setState({ disclaimerSelected: false })
    }
  }

  onCalculate() {
    let age = this.state.selectedAge.split(" ")[0]
    let gender = this.state.selectedGender.toLowerCase()
    // let height = this.state.height
    let weight = this.state.weight
    // let selectedUnitH = this.state.selectedUnitH
    let selectedUnitW = this.state.selectedUnitW
    let ftLevel = this.state.selectedFtLevel.toLowerCase()
    let disease = this.state.selectedDisease.toLowerCase()


    if (this.state.selectedAge === 'Select Age' || 
      this.state.selectedGender === 'Select Gender' || 
      weight === '' || 
      selectedUnitW === '' || ftLevel === '' || disease === '') {
      Toast.show({ text: 'Please fill all the details', buttonText: 'okay', duration: 3000 })
      return;
    }

    if (!this.state.disclaimerSelected) {
      Toast.show({ text: 'Please select that you have agreed the disclaimer', buttonText: 'okay', duration: 3000 })
      return;
    }

    if (selectedUnitW === 'lbs') {
      weight = parseInt(weight / 2.2046).toString()

    }

    this.props.fetchData(this.state.auth, this.state.userId, age, gender, '', weight, ftLevel, disease)

  }


  onBack() {

    this.props.navigation.goBack()
  }

  render() {

    return (
      <View style={styles.container}>

        {/* {this.state.disclaimerLoading && <Loader></Loader>} */}
        {this.props.isLoading && <Loader></Loader>}

        <Modal
          animationType='fade'
          transparent={true}
          visible={this.state.disclaimerModal}
          onRequestClose={() => this.setState({ disclaimerModal: false })}
        >
          <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <View
              style={styles.modal}>
              <Text style={{
                fontSize: 24,
                color: Colors.purple2,
                fontFamily: 'Verdana Pro Light'
              }}>Disclaimer</Text>


              <ScrollView style={{ flex: 1 }}>
                {/* <Text style={{fontFamily:'Verdana Pro Cond Regular', 
                color:'#333', marginTop:10, paddingBottom:10}}>{this.state.disclaimerData}
                </Text> */}

                <View style={{ marginTop: 10 }}>
                  <HTML html={this.state.disclaimerData}
                    baseFontStyle={{ fontSize: 12, fontFamily: 'Verdana Pro Regular', lineHeight: 25 }}

                  />
                </View>



              </ScrollView>

              <View style={{ justifyContent: 'flex-end', marginTop: 10 }}>
                <TouchableHighlight
                  onPress={() => this.setState({ disclaimerModal: false })}
                  style={{
                    backgroundColor: Colors.green, padding: 15,
                    alignItems: 'center', justifyContent: 'flex-end', alignContent: 'flex-end'
                  }}>
                  <Text style={{
                    color: '#ffffff',
                    fontWeight: 'bold', alignItems: 'center'
                  }}>{' Done '}</Text>
                </TouchableHighlight>
              </View>

            </View>
          </View>

        </Modal>

        <CalculatorResultModal visibility={this.state.modalVisible}
          result1={this.state.resultText1} result2={this.state.resultText2}
          result3={this.state.resultText3} result4={this.state.resultText4} result5={this.state.resultText5}
          callback={() => this.setState({ modalVisible: false })}></CalculatorResultModal>


        <AppToolbar backAction={() => this.props.navigation.goBack()}></AppToolbar>

        <Text style={{
          color: '#fff', fontSize: 22,
          width: width, padding: 15, paddingLeft: 25, paddingRight: 25, paddingBottom: 10,
          backgroundColor: Colors.purple2,
          fontFamily: 'Verdana Pro Light'
        }}>Overt Hypothyroidism Calculator</Text>


        <Text style={{
          width: width, fontFamily: 'Verdana Pro Cond SemiBold', fontSize: 16,
          backgroundColor: Colors.lightGrey, color: Colors.purple2,
          padding: 15, paddingLeft: 25, paddingRight: 25
        }}>All the fields are mandatory</Text>


        <ScrollView style={{ paddingLeft: 25, paddingRight: 25 }}
          keyboardShouldPersistTaps='always'>
          <View style={{ flex: 1, flexDirection: 'row', marginTop: 20 }}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <Image style={{ width: 30, height: 40, alignSelf: 'center' }}
                source={require('../assets/Icons/age.png')}
                resizeMode='contain'></Image>
              <View style={{ flexDirection: 'column', marginLeft: 10, }}>
                <Text style={{
                  fontSize: 14,
                  fontFamily: 'Verdana Pro Cond Bold',
                  color: Colors.purple2, marginBottom: 5
                }}>Age (years)</Text>
                <TouchableOpacity
                  onPress={() => this.setState({ agePickerVisible: true })}
                  style={{
                    borderWidth: 1, flexDirection: 'row', backgroundColor: Colors.inputBackground,
                    borderColor: Colors.strokeColor, width: width * .3 + 2
                  }}>
                  <Text
                    // onPress={() => this.onAgeChange(this.state.age)}
                    style={{ fontFamily: 'Verdana Pro Cond Semibold', paddingTop: 8, paddingBottom: 8, paddingLeft: 8, paddingRight: 15 }}>{this.state.selectedAge}</Text>

                  <Image style={{ width: 10, height: 5, marginRight: 5, position: 'absolute', right: 0, alignSelf: 'center' }}
                    source={require('../assets/Icons/dropdown.png')} />
                  <AndroidPicker data={this.state.age} visible={(agePickerVisible) => this.setState({ agePickerVisible })}
                    visibility={this.state.agePickerVisible} callback={(item) => this.onAgeClick(item)}></AndroidPicker>

                  {/* <CustomPicker values={this.state.age} width={width*.3}
                  selectedValue={this.state.selectedAge} label='age' reference={this.picker}
                  callBack={(value) => this.onAgeChange(value)}></CustomPicker> */}

                </TouchableOpacity>
              </View>
            </View>

            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
              <Image style={{ width: 35, height: 40, alignSelf: 'center' }}
                source={require('../assets/Icons/gender.png')}
                resizeMode='contain'></Image>
              <View style={{ flexDirection: 'column', marginLeft: 10 }}>
                <Text style={{
                  fontSize: 14,
                  fontFamily: 'Verdana Pro Cond Bold',
                  color: Colors.purple2, marginBottom: 5
                }}>Gender</Text>

                <TouchableOpacity
                  onPress={() => this.onGenderClick(true)}
                  style={{
                    borderWidth: 1, flexDirection: 'row', backgroundColor: Colors.inputBackground,
                    borderColor: Colors.strokeColor, width: width * .3 + 2
                  }}>

                  <Text
                    numberOfLines={1}
                    style={{ fontFamily: 'Verdana Pro Cond Semibold', paddingTop: 8, paddingBottom: 8, paddingLeft: 8, paddingRight: 15 }}>{this.state.selectedGender}</Text>
                  <Image style={{ width: 10, height: 5, margin: 5, position: 'absolute', right: 0, alignSelf: 'center' }}
                    source={require('../assets/Icons/dropdown.png')} />
                  <AndroidPicker data={this.state.gender}
                    visibility={this.state.genderPickerVisible} visible={(genderPickerVisible) => this.setState({ genderPickerVisible })}
                    callback={(item) => this.setState({ selectedGender: item, genderPickerVisible: false })}>
                  </AndroidPicker>


                  {/* <CustomPicker values={this.state.gender} width={width * .3}
                    selectedValue={this.state.selectedGender}
                    callBack={(value) => this.onGenderChange(value)}></CustomPicker> */}

                </TouchableOpacity>
              </View>
            </View>
          </View>


          <View style={{ flex: 1, flexDirection: 'row', marginTop: 30 }}>
            {/* <View style={{ flex: 1, flexDirection: 'row' }}>
              <Image style={{ width: 30, height: 40, alignSelf: 'center', marginRight: 5 }}
                source={require('../assets/Icons/height.png')}
                resizeMode='contain'></Image>

              <View style={{ flexDirection: 'column', marginRight: 5 }}>
                <Text style={{
                  fontSize: 14,
                  fontFamily: 'Verdana Pro Cond Bold',
                  color: Colors.purple2, marginBottom: 5
                }}>Height</Text>


                <TextInput
                  placeholder="00"
                  placeholderTextColor={Colors.inputHint}
                  maxLength={4}
                  returnKeyType='done'
                  keyboardType='numeric'
                  onChangeText={(height) => this.setState({ height })}
                  value={this.state.height}
                  style={styles.textInput}>
                </TextInput>

              </View>
              <View style={{ flexDirection: 'column', }}>
                <Text style={{
                  fontSize: 14,
                  fontFamily: 'Verdana Pro Cond Bold',
                  color: Colors.purple2, marginBottom: 5
                }}>Units</Text>

                <TouchableOpacity
                  onPress={() => this.setState({ heightPickerVisible: true })}
                  style={{
                    borderWidth: 1, flexDirection: 'row', backgroundColor: Colors.inputBackground,
                    borderColor: Colors.strokeColor, width: width * .1 + 22
                  }}>

                  <Text
                    numberOfLines={1}
                    style={{ fontFamily: 'Verdana Pro Cond Semibold', paddingTop: 8, paddingBottom: 8, paddingLeft: 8, paddingRight: 15 }}>{this.state.selectedUnitH}</Text>
                  <Image style={{ width: 10, height: 5, marginRight: 5, position: 'absolute', right: 0, alignSelf: 'center' }}
                    source={require('../assets/Icons/dropdown.png')} />
                  <AndroidPicker data={this.state.heightUnit}
                    visibility={this.state.heightPickerVisible} visible={(heightPickerVisible) => this.setState({ heightPickerVisible })}
                    callback={(item) => this.setState({ selectedUnitH: item, heightPickerVisible: false })}>
                  </AndroidPicker>

                </TouchableOpacity>
              </View>
            </View> */}

            <View style={{ flex: 1, flexDirection: 'row',  }}>
              <Image style={{ width: 30, height: 30, alignSelf: 'center', marginRight: 10 }}
                source={require('../assets/Icons/weight.png')}
                resizeMode='contain'></Image>

              <View style={{ flexDirection: 'column', marginRight: 5 }}>
                <Text style={{
                  fontSize: 14,
                  fontFamily: 'Verdana Pro Cond Bold',
                  color: Colors.purple2, marginBottom: 5
                }}>Weight</Text>


                <TextInput
                  placeholder="00"
                  placeholderTextColor={Colors.inputHint}
                  maxLength={4}
                  returnKeyType='done'
                  keyboardType='numeric'
                  onChangeText={(weight) => this.setState({ weight })}
                  value={this.state.weight}
                  style={styles.textInput}>
                </TextInput>

              </View>
              <View style={{ flexDirection: 'column', }}>
                <Text style={{
                  fontSize: 14,
                  fontFamily: 'Verdana Pro Cond Bold',
                  color: Colors.purple2, marginBottom: 5
                }}>Units</Text>

                <TouchableOpacity
                  onPress={() => this.setState({ weightPickerVisible: true })}
                  style={{
                    borderWidth: 1, flexDirection: 'row', backgroundColor: Colors.inputBackground,
                    borderColor: Colors.strokeColor, width: width * .2
                  }}>

                  <Text
                    numberOfLines={1}
                    style={{
                      fontFamily: 'Verdana Pro Cond Semibold',
                      paddingTop: 8, paddingBottom: 8,
                      paddingLeft: 8, paddingRight: 15
                    }}>{this.state.selectedUnitW}</Text>
                  <Image style={{ width: 10, height: 5, marginRight: 5, position: 'absolute', right: 0, alignSelf: 'center' }}
                    source={require('../assets/Icons/dropdown.png')} />
                  <AndroidPicker data={this.state.weightUnit}
                    visibility={this.state.weightPickerVisible}
                    visible={(weightPickerVisible) => this.setState({ weightPickerVisible })}
                    callback={(item) => this.setState({ selectedUnitW: item, weightPickerVisible: false })}>
                  </AndroidPicker>

                  {/* <CustomPicker values={this.state.weightUnit} width={width * .1 + 20}
                    selectedValue={this.state.selectedUnitW}
                    callBack={(value) => this.onWeightUnitChange(value)}></CustomPicker> */}
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={{ flexDirection: 'row', marginTop: 30 }}>
            <Text style={{
              flex: 1,
              fontSize: 14, fontFamily: 'Verdana Pro Cond Bold',
              color: Colors.purple2, alignSelf: 'center'
            }}>Suggestive Symptoms or TPO Positive</Text>
            <TouchableOpacity
              onPress={() => this.setState({ ftPickerVisible: true })}
              style={{
                borderWidth: 1, flexDirection: 'row', backgroundColor: Colors.inputBackground,
                borderColor: Colors.strokeColor, width: width * .2 + 12
              }}>

              <Text
                numberOfLines={1}
                style={{ fontFamily: 'Verdana Pro Cond Semibold', paddingTop: 8, paddingBottom: 8, paddingLeft: 8, paddingRight: 15 }}>{this.state.selectedFtLevel}</Text>
              <Image style={{ width: 10, height: 5, marginRight: 5, position: 'absolute', right: 0, alignSelf: 'center' }}
                source={require('../assets/Icons/dropdown.png')} />
              <AndroidPicker data={this.state.ftLevel}
                visibility={this.state.ftPickerVisible} visible={(ftPickerVisible) => this.setState({ ftPickerVisible })}
                callback={(item) => this.setState({ selectedFtLevel: item, ftPickerVisible: false })}>
              </AndroidPicker>

              {/* <CustomPicker values={this.state.ftLevel} width={width * .2 + 10}
                selectedValue={this.state.selectedFtLevel}
                callBack={(value) => this.onFtLevelChange(value)}></CustomPicker> */}
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: 'row', marginTop: 30, }}>
            <Text style={{
              flex: 1,
              fontSize: 14, fontFamily: 'Verdana Pro Cond Bold',
              color: Colors.purple2, alignSelf: 'center'
            }}>Known or suspected heart disease?</Text>
            <TouchableOpacity
              onPress={() => this.setState({ diseasePickerVisible: true })}
              style={{
                borderWidth: 1, flexDirection: 'row', backgroundColor: Colors.inputBackground,
                borderColor: Colors.strokeColor, width: width * .2 + 12
              }}>

              <Text
                numberOfLines={1}
                style={{
                  fontFamily: 'Verdana Pro Cond Semibold',
                  paddingTop: 8,
                  paddingBottom: 8, paddingLeft: 8,
                  paddingRight: 15
                }}>{this.state.selectedDisease}</Text>
              <Image style={{ width: 10, height: 5, marginRight: 5, position: 'absolute', right: 0, alignSelf: 'center' }}
                source={require('../assets/Icons/dropdown.png')} />
              <AndroidPicker data={this.state.disease}
                visibility={this.state.diseasePickerVisible} visible={(diseasePickerVisible) => this.setState({ diseasePickerVisible })}
                callback={(item) => this.setState({ selectedDisease: item, diseasePickerVisible: false })}>
              </AndroidPicker>

              {/* <CustomPicker values={this.state.disease} width={width * .2 + 10}
                selectedValue={this.state.selectedDisease}
                callBack={(value) => this.onDiseaseChange(value)}></CustomPicker> */}
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: 'row', marginTop: 40 }}>

            <TouchableOpacity
              onPress={() => this.onDisclaimerClick()}
              style={{
                width: 20, height: 20, borderWidth: 1,
                borderColor: Colors.strokeColor
              }}>

              {this.state.disclaimerSelected ? <Image
                style={{ width: 16, height: 16, alignSelf: 'center' }}
                source={require('../assets/Icons/tick.png')}></Image> : null
              }

            </TouchableOpacity>

            <Text style={{
              fontSize: 14,
              fontFamily: 'Verdana Pro Cond Regular',
              color: Colors.purple2, marginLeft: 10
            }}>
              <Text>I have read the </Text>
              <Text
                onPress={() => this.setState({ disclaimerModal: true })}
                style={{
                  fontFamily: 'Verdana Pro Cond Bold',
                }}>disclaimer </Text>
              <Text >and agreed to it</Text>
            </Text>

          </View>

          <Text onPress={() => this.onCalculate()}

            style={{
              width: width * .9, padding: 15,
              alignSelf: 'center', marginTop: 30,
              backgroundColor: Colors.green, textAlign: 'center',
              color: '#fff', fontSize: 14, fontFamily: 'Verdana Pro Cond Bold',
            }}>Calculate</Text>

        </ScrollView>

      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',


  },
  modal: {
    flex: 1, marginLeft: 30, marginRight: 30, marginTop: 60, marginBottom: 60,
    backgroundColor: '#fff', padding: 15, paddingLeft: 20, paddingRight: 20


  },
  alignment: {
    justifyContent: 'center',
    alignItems: 'center',

  },

  textInput: {
    width: width * .2 ,
    height: 36,
    fontSize: 14,
    paddingTop: Platform.OS == 'ios' ? 0 : 5,
    paddingBottom: Platform.OS == 'ios' ? 0 : 5,
    paddingLeft: 5,
    fontFamily: 'Verdana Pro Cond Semibold',
    backgroundColor: Colors.inputBackground,
    borderWidth: 1,
    borderColor: Colors.strokeColor,


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
    fetchData: (authKey, userid, age, gender, height, weight, ft_level, suspected) => dispatch(calculatorResult(authKey, userid, age, gender, height, weight, ft_level, suspected)),
    disclaimer: (authKey) => dispatch(fetchData(authKey))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Calculator)