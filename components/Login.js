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

  BackHandler,
  AsyncStorage,
  TouchableHighlight,

  Animated,
  Dimensions,




  CheckBox,

} from 'react-native'

import {
  COLOR_PINK, COLOR_PINK_LIGHT,
  COLOR_FACEBOOK, COLOR_PINK_MEDIUM, COLOR_GREEN}
from './myColors';
const STORAGE_KEY = 'ASYNC_STORAGE_NAME_EXAMPLE'
let windowWidth = Dimensions.get('window').width
let windowHeight = Dimensions.get('window').height
export default class Login extends Component {

  static navigationOptions = {
    header: null,
  }
//   componentDidMount() {
//   BackHandler.addEventListener('hardwareBackPress', function() {
//     // this.onMainScreen and this.goBack are just examples, you need to use your own implementation here
//     // Typically you would use the navigator here to go to the last state.


//     return true;
//   })
// }
constructor(props) {
    super(props)
    this.animatedValue = new Animated.Value(0)
    this.animatedXValue = new Animated.Value(-windowWidth)
    this.state = {
      modalShown: false,
      email:'',
    password:'',
    username:''
    }
  }


  UserLoginFunction = () =>{




     fetch('http://kyalin.pythonanywhere.com/rest-auth/login/', {
       method: 'POST',
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({
        username:this.state.username,
         email: this.state.email,

           password: this.state.password


       })

     }).then((response) => response.json())
           .then((responseJson) => {

            console.log(responseJson.key)
             // If server response message same as Data
             this.saveItem('username', this.state.username)
           this.saveItem('key', responseJson.key)
             this.saveItem('user', responseJson.user.toString())



             if(responseJson.key !=null  )
                 {

                       if(responseJson.user_type.is_student==true){
                      this.props.navigation.navigate("StudentMainTabNavigator")
                     }
                else if (responseJson.user_type.is_teacher==true)
                {
                  this.props.navigation.navigate("TeacherMainTabNavigator")
                }
         else{
           Alert.alert('Must be Teacher or student')
         }
                 }
             else{

               Alert.alert(JSON.stringify(responseJson));
             }

           }).catch((error) => {
              this.callToast("Invalid username and password","error")
           });

       }
       async saveItem(item, selectedValue) {
        try {
          await AsyncStorage.setItem(item, selectedValue);
        } catch (error) {
          console.error('AsyncStorage error: ' + error.message);
        }
      }

        callToast(message, type) {
    if(this.state.modalShown) return
    this.setToastType(message, type)
    this.setState({ modalShown: true })
    Animated.timing(
      this.animatedValue,
      {
        toValue: 1,
        duration: 350
      }).start(this.closeToast())
  }

  closeToast() {
    setTimeout(() => {
      this.setState({ modalShown: false })
      Animated.timing(
      this.animatedValue,
      {
        toValue: 0,
        duration: 350
      }).start()
    }, 2000)
  }

  callXToast() {
    Animated.timing(
      this.animatedXValue,
      {
        toValue: 0,
        duration: 350
      }).start(this.closeXToast())
  }

  closeXToast() {
    setTimeout(() => {
      Animated.timing(
      this.animatedXValue,
      {
        toValue: -windowWidth,
        duration: 350
      }).start()
    }, 2000)
  }

  setToastType(message='Success!', type='success') {
    let color
    if (type == 'error') color = 'red'
    if (type == 'primary') color = '#2487DB'
    if (type == 'warning') color = '#ec971f'
    if (type == 'success') color = 'green'
    this.setState({ toastColor: color, message: message })
  }

  render() {

     let animation = this.animatedValue.interpolate({
       inputRange: [0, .3, 1],
       outputRange: [-70, -10, 0]
     })
    const Divider = (props) => {
      return <View {...props}>
        <View style={styles.line}></View>
        <Text style={styles.textOR}>OR</Text>
        <View style={styles.line}></View>
      </View>
    }
    return (


      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.up}>

            <Image
         style={{width: 130, height: 130,borderRadius: 130 / 2,    }}
          source={require('./images/collegelogo.png')}
        />
          <Text style={styles.title}>
             Phonics Group Of Instution
          </Text>
          </View>
          <View style={styles.down}>
            <View style={styles.textInputContainer}>
              <TextInput
                style={styles.textInput}

                placeholder="Enter your username"
                placeholderTextColor='black'
                onChangeText={username => this.setState({username})}
              >
              </TextInput>
            </View>
            <View style={styles.textInputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Enter your password"
                placeholderTextColor='black'
                secureTextEntry={true}
                onChangeText={password => this.setState({password})}
              >
              </TextInput>
            </View>
            <TouchableOpacity style={styles.loginButton} onPress={this.UserLoginFunction}>
              <Text style={styles.loginButtonTitle} >LOGIN</Text>
            </TouchableOpacity>
            <Divider style={styles.divider}></Divider>
            <TouchableOpacity style={styles.RegisterButton}   onPress={() =>  this.props.navigation.navigate("Registration")} >
              <Text style={styles.loginButtonTitle}>Create an account</Text>

            </TouchableOpacity>
          </View>

<Animated.View  style={{ transform: [{ translateY: animation }], height: 70, backgroundColor: this.state.toastColor, position: 'absolute',left:0, top:0, right:0, justifyContent:  'center' }}>
          <Text style={{ marginLeft: 10,  color: 'white',  fontSize:16, fontWeight: 'bold' }}>
            { this.state.message }
          </Text>
        </Animated.View>

        <Animated.View style={{ transform: [{ translateX: this.animatedXValue }], height: 70, marginTop: windowHeight - 70, backgroundColor: 'green', position: 'absolute', left:0, top:0, width: windowWidth, justifyContent: 'center' }}>
          <Text style={{ marginLeft: 10, color: 'white', fontSize:16, fontWeight: 'bold', textAlign: 'center' }}>Success full created account!</Text>
        </Animated.View>


        </View>
      </TouchableWithoutFeedback>

    )
  }
}
class Button extends Component {
  render() {
    let { callToast, type } = this.props
    return (
      <View style={ styles.buttonContainer }>
        <TouchableHighlight onPress={ callToast } underlayColor="ddd" style={{ height:60, justifyContent: 'center', alignItems: 'center', backgroundColor: 'ededed', borderWidth: 1, borderColor: 'ddd' }}>
          <Text>Call { type } toast.</Text>
        </TouchableHighlight>
      </View>
    )
  }
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
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
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
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
   buttonContainer: {
    marginTop:10
  }
})

