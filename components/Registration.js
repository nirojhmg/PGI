import React ,{Component} from 'react'
import  {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Animated,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Image,

  CheckBox,
} from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';

import {
  COLOR_PINK, COLOR_PINK_LIGHT,
  COLOR_FACEBOOK, COLOR_PINK_MEDIUM, COLOR_GREEN}
from './myColors';
let windowWidth = Dimensions.get('window').width
let windowHeight = Dimensions.get('window').height

export default class Registration extends Component {

  constructor(props) {
    super(props)
    this.animatedValue = new Animated.Value(0)
    this.animatedXValue = new Animated.Value(-windowWidth)
    this.state = {
      modalShown: false,
      toastColor: 'green',
      message: 'Success!',
      data:[{label:'Student'},{label:'Faculty'}],
      email:'',
    password1:'',
    password2:'',
    username:'',
    is_student:false,
    is_teacher:false,
    selectedButton:'Student',
    visible: false,
    }
  }
onPress = data =>{ this.setState({ data }),console.log(data)};
UserRegistrationFunction = (selectedButton) =>{

       if(selectedButton=='Student')
       {
        this.setState({is_student: true}, function () {
        fetch('http://kyalin.pythonanywhere.com/rest-auth/registration/', {
           method: 'POST',
           headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json',
           },
           body: JSON.stringify({
             email: this.state.email,

                 password1: this.state.password1,
               password2: this.state.password2,
                 username:this.state.username,
                 is_student:this.state.is_student,
               is_teacher:this.state.is_teacher


           })

         }).then((response) => response.json())
               .then((responseJson) => {

                 // If server response message same as Data Matched
            console.log("Responson"+responseJson)
                 if(responseJson.key !=null )
                 {
                     this.callXToast()
                   this.setState({
                   key:responseJson.key
                 })
                 console.log("Keyzz:"+this.state.key)
                 fetch('http://kyalin.pythonanywhere.com/users/student/', {
                  method: 'POST',

                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    // Authorization:  `280f577b841ee70418adecec5fdc918ea3ee0a07`,
                    Authorization: `Token `+this.state.key,

                  },
                  body:
                    JSON.stringify({
                      "user": responseJson.user

                    })




                }).then((response) => response.json())
                  .then((responseJson) => {




                    // If server response message same as Data Matched

                   // this.props.navigation.navigate("Login")

                  });


                 }
                 else
                 {
                   this.callToast('warning','warning')
                 }


               }).catch((error) => {
 // this.callToast('warning','warning')

               });


      });

       }
       else if (selectedButton=='Faculty')
       {
       this.setState({is_teacher: true}, function () {
        fetch('http://kyalin.pythonanywhere.com/rest-auth/registration/', {
           method: 'POST',
           headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json',
           },
           body: JSON.stringify({
             email: this.state.email,

                 password1: this.state.password1,
               password2: this.state.password2,
                 username:this.state.username,
                 is_student:this.state.is_student,
               is_teacher:this.state.is_teacher


           })

         }).then((response) => response.json())
               .then((responseJson) => {

                 // If server response message same as Data Matched
            console.log("Responson"+responseJson)
                 if(responseJson.key !=null )
                 {
                     this.callXToast()
                   this.setState({
                   key:responseJson.key
                 })
                 console.log("Keyzz:"+this.state.key)
                 fetch('http://kyalin.pythonanywhere.com/users/faculty/', {
                  method: 'POST',

                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    // Authorization:  `280f577b841ee70418adecec5fdc918ea3ee0a07`,
                    Authorization: `Token `+this.state.key,

                  },
                  body:
                    JSON.stringify({
                      "user": responseJson.user

                    })




                }).then((response) => response.json())
                  .then((responseJson) => {




                    // If server response message same as Data Matched

                   // this.props.navigation.navigate("Login")

                  });


                 }
                 else
                 {
                   this.callToast('warning','warning')
                 }


               }).catch((error) => {
 // this.callToast('warning','warning')

               });


      });
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
     let selectedButton = this.state.data.find(e => e.selected == true);
      selectedButton = selectedButton ? selectedButton.value : this.state.data[0].label;

        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

             <View style={styles.container}>
             <View style={styles.up}>
             <Text style={styles.title}>
             Phonics Group Of Institution
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

                placeholder="Enter your email"
                placeholderTextColor='black'
                onChangeText={email => this.setState({email})}
              >
              </TextInput>
            </View>

            <View style={styles.textInputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="enter password"
                placeholderTextColor='black'
                secureTextEntry={true}
                onChangeText={password1 => this.setState({password1})}
              >
              </TextInput>
            </View>
            <View style={styles.textInputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="confirm password"
                placeholderTextColor='black'
                secureTextEntry={true}
                onChangeText={password2 => this.setState({password2})}
              >
              </TextInput>
            </View>
            <View style={styles.textInputContainer}>
              <Text
              > Are u a?
              </Text>
              <View >

                <RadioGroup radioButtons={this.state.data} onPress={this.onPress} />

            </View>

            </View>
            <TouchableOpacity style={styles.RegisterButton} onPress={() => {
    this.UserRegistrationFunction(selectedButton);


  }} >
              <Text style={styles.loginButtonTitle} >Register</Text>

            </TouchableOpacity>


             <TouchableOpacity style={styles.loginButton} onPress={() =>  this.props.navigation.navigate("Login")}>
              <Text style={styles.loginButtonTitle} >LOGIN</Text>
            </TouchableOpacity>
             </View>

 <Animated.View  style={{ transform: [{ translateY: animation }], height: 70, backgroundColor: this.state.toastColor, position: 'absolute',left:0, top:0, right:0, justifyContent:  'center' }}>
          <Text style={{ marginLeft: 10,  color: 'white',  fontSize:16, fontWeight: 'bold' }}>
            { this.state.message +' Invalid Details'}
          </Text>
        </Animated.View>

        <Animated.View style={{ transform: [{ translateX: this.animatedXValue }], height: 70, marginTop: windowHeight - 70, backgroundColor: 'green', position: 'absolute', left:0, top:0, width: windowWidth, justifyContent: 'center' }}>
          <Text style={{ marginLeft: 10, color: 'white', fontSize:16, fontWeight: 'bold', textAlign: 'center' }}>Success full created account!</Text>
        </Animated.View>
                 </View>

            </TouchableWithoutFeedback>


        );
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
        flex: 2,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      },
      down: {
        flex: 8,//70% of column
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
      RegisterButton: {
        width: 300,
        height: 45,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLOR_GREEN
      },
      loginButtonTitle: {
        fontSize: 18,
        color: 'white'
      },
      loginButton: {
    width: 300,
    height: 45,
    marginTop:5,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR_PINK
  },
   buttonContainer: {
    marginTop:10
  }
})

