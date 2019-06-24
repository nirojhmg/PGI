 import React, { Component } from 'react'
import {
  Alert,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  Button,
  BackHandler,
  AsyncStorage


} from 'react-native'

import {
  COLOR_PINK, COLOR_PINK_LIGHT,
  COLOR_FACEBOOK, COLOR_PINK_MEDIUM, COLOR_GREEN}
from './myColors';

export default class TeacherNotice extends Component {



  state = {


    title:'',
    password:'',
    noticedetails:''

  }



  componentDidMount() {


    AsyncStorage.getItem('key').then((key) => {

      this.setState({
      key:key

      })

      console.log("key:"+this.state.key)

    })
    AsyncStorage.getItem('user').then((user) => {

      this.setState({
      user:user

      })
})

      console.log("Usernamezz:"+this.state.user)


}
  UserLoginFunction = () =>{



  fetch('http://kyalin.pythonanywhere.com/users/notice/', {
        method: 'POST',

         headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json',
           // Authorization:  `7419b3f8649566eeee73097184dd4541920af853`,
           Authorization: `Token `+this.state.key,

         },
        body:
               JSON.stringify({

       "title":this.state.title,
    // "faculty": this.state.user,
        "noticedetails": this.state.noticedetails

               })




       }).then((response) => response.json())
         .then((responseJson) => {

         if(responseJson.title !='This field may not be blank.' && responseJson.noticedetails !='This field may not be blank.' ){
        this.props.navigation.navigate("FacultyNoticeView")
         }
         else{
         Alert.alert('No notice details provided. Cannot be posted')
         }


         }).catch((error) => {
              Alert.alert('No notice details provided. Cannot be posted')
           });;





       }


  render() {



    return (
      //Donot dismis Keyboard when click outside of TextInput
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
 <TouchableOpacity  style={styles.button}   onPress={() =>  this.props.navigation.navigate("TeacherMainTabNavigator")} >
              <Text style={{  fontSize: 30}}>←</Text>

            </TouchableOpacity>
          <View style={styles.down}>
            <View style={styles.textInputContainer}>
              <TextInput
                style={styles.textInput}

                placeholder="Title"
                placeholderTextColor='black'
                onChangeText={title => this.setState({title})}
              >
              </TextInput>
            </View>
            <View style={styles.textInputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Noticedetails"
                placeholderTextColor='black'
                onChangeText={noticedetails => this.setState({noticedetails})}
              >
              </TextInput>
            </View>
            <TouchableOpacity style={styles.loginButton} onPress={ this.UserLoginFunction }>
              <Text style={styles.loginButtonTitle} >Post Notice</Text>
            </TouchableOpacity>

          </View>




        </View>
      </TouchableWithoutFeedback>

    )
  }
}

const styles = StyleSheet.create({
  container: {
        flex: 1,
        flexDirection: 'column',
       // justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: COLOR_PINK_LIGHT
  },
  up: {
    flex: 3,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  down: {
    flex: 7,//70% of column
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  title: {
    color: 'white',
    color: COLOR_PINK_MEDIUM,
    textAlign: 'center',
    width: 400,
    fontSize: 23
  },
  textInputContainer: {
    paddingHorizontal: 10,
    borderRadius: 6,
  marginBottom: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    color:'black'
  //a = alpha = opacity
  },
  textInput: {
    width: 280,
    height: 45
  },
  loginButton: {
    width: 300,
    height: 45,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR_PINK
  },
  loginButtonTitle: {
    fontSize: 18,
    color: 'white'
  },
  RegisterButton: {
    width: 300,
    height: 45,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR_GREEN
  },
  line: {
    height: 1,
    flex: 2,
    backgroundColor: 'black'
  },
  textOR: {
    flex: 1,
    textAlign: 'center'
  },
  divider: {
    flexDirection: 'row',
    height: 40,
    width: 298,
    justifyContent: 'center',
    alignItems: 'center'
  },
  dialogContentView: {
    // flex: 1,
    paddingLeft: 18,
    paddingRight: 18,
    // backgroundColor: '#000',
    // opacity: 0.4,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  navigationBar: {
    borderBottomColor: '#b5b5b5',
    borderBottomWidth: 0.5,
    backgroundColor: '#ffffff',
  },
  navigationTitle: {
    padding: 10,
  },
  navigationButton: {
    padding: 10,
  },
  navigationLeftButton: {
    paddingLeft: 20,
    paddingRight: 40,
  },
  navigator: {
    flex: 1,
    // backgroundColor: '#000000',
  },
  customBackgroundDialog: {
    opacity: 0.5,
    backgroundColor: '#000',
  },
  button:{
        marginTop:25,
        height: 45,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLOR_FACEBOOK,
      },
})