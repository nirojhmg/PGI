import React, { Component } from 'react';
import { Button, Image, StyleSheet, TextInput,ScrollView, View, Text, TouchableOpacity, ActivityIndicator, FlatList, Alert, Picker,AsyncStorage,TouchableHighlight,CheckBox,Animated,Dimensions } from 'react-native';


import {
  COLOR_PINK, COLOR_PINK_LIGHT,
  COLOR_FACEBOOK, COLOR_PINK_MEDIUM, COLOR_GREEN
}
  from './myColors';
import { Avatar } from 'react-native-elements';
import { Card, WhiteSpace, WingBlank } from '@ant-design/react-native';
import { ExpoLinksView } from '@expo/samples';
let windowWidth = Dimensions.get('window').width
let windowHeight = Dimensions.get('window').height
export default class TeacherProfile extends Component {
  static navigationOptions = {
    title: 'Profile',

  }


  constructor(props) {
    super(props);
     this.animatedValue = new Animated.Value(0)
    this.animatedXValue = new Animated.Value(-windowWidth)
    this.state = {
      info: '',
      inputCount: 3,
      data: [],
      isLoading: true,
      modalShown:false,


    user:'',
     // user:null,
      dataSource: [],
       hasToken: false
    };
    this.inputRefs = {};
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
 setToastType(message='Success!', type='success') {
    let color
    if (type == 'error') color = 'red'
    if (type == 'primary') color = '#2487DB'
    if (type == 'warning') color = '#ec971f'
    if (type == 'success') color = 'green'
    this.setState({ toastColor: color, message: message })
  }
  onAddMore() {
    const newData = this.state.data;
    newData.push({ name: `input${this.state.inputCount + 1}` });
    this.setState(prevState => ({
      inputCount: prevState.inputCount + 1,
      data: newData,
    }));
    fetch('http://kyalin.pythonanywhere.com/users/subject/', {
      method: 'POST',

      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        // Authorization:  `280f577b841ee70418adecec5fdc918ea3ee0a07`,
        Authorization: `Token `+this.state.key,

      },
      body:
        JSON.stringify({
          "subject_name": this.state.user,

          "faculty": this.state.user
        })




    }).then((response) => response.json())
      .then((responseJson) => {

        // If server response message same as Data Matched

        Alert.alert(JSON.stringify(responseJson));

      });


  }
  _onChangeText(text, inputName) {
    console.log('Input Name:', inputName, text);
    console.log("Inout's Ref:", this.inputRefs[inputName]);
    const info = `${this.state.info}\n\r${inputName} changed text`;
    this.setState({
      info
    });
  }
  _onChange(event, inputName) {
    console.log('Input Name:', inputName);
  }


  ProfileSubmitFunction = () => {


  //  console.log(this.props.navigation.state.params.key)

  console.log("Users:"+this.state.user)
  console.log("Key:"+this.state.key)

    fetch('http://kyalin.pythonanywhere.com/users/faculty/'+this.state.user+'/', {
      method: 'PUT',

      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        // Authorization:  `280f577b841ee70418adecec5fdc918ea3ee0a07`,
        Authorization: `Token `+this.state.key,

      },
      body:
        JSON.stringify({
          "user": this.state.user,

          "subject_name": this.state.dataSource.subject_name
        })




    }).then((response) => response.json())
      .then((responseJson) => {

        // If server response message same as Data Matched

       this.callToast("Successfully edited Profile","success")

      });


  }
  componentDidMount() {
    AsyncStorage.getItem('user').then((user) => {

      this.setState({
      user:user

      })

     fetch('http://kyalin.pythonanywhere.com/users/subject/')
    .then(response => response.json())
    .then(data => {
     console.log("Users ghghg:"+this.state.user)
      this.setState({ data: data.filter(d => d.faculty.toString() === this.state.user) })
    })
    .catch(error => {
      console.error(error);
    });
    AsyncStorage.getItem('username').then((username) => {

      this.setState({
      username:username

      })

      console.log("Username:"+this.state.username)

    })
    AsyncStorage.getItem('key').then((key) => {

      this.setState({
      key:key

      })

      console.log("key:"+this.state.key)

    })

      console.log("Usernamezz:"+this.state.user)
      return fetch('http://kyalin.pythonanywhere.com/users/faculty/'+this.state.user+'/')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson

        }, function () {

        });

        console.log(responseJson)

      })
      .catch((error) => {
        console.error(error);
      });

    })






  }



  render() {

      console.log(this.state.data)
    console.log("Usernamess:"+this.state.user)
     let animation = this.animatedValue.interpolate({
       inputRange: [0, .3, 1],
       outputRange: [-70, -10, 0]
     })
    const Divider = (props) => {
        return <View {...props}>

        </View>
      }

    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      )
    }

    return (

      <View style={styles.container}>

        <View style={styles.up}   >
          <Avatar rounded
            source={{
              uri:
                this.state.dataSource.photo,
            }}
            size="large"
            showEditButton
            onEditPress={() => console.log("Works!!")}


          />
          <TouchableOpacity style={styles.loginButton}  >
              <Text style={styles.loginButtonTitle} >{this.state.username}</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.down}>
          <View style={styles.SectionStyle}>

            <Text style={styles.TextStyle}>Department:</Text>

            <TextInput
              style={{ flex: 1 }}
              value={this.state.dataSource.subject_name}
              underlineColorAndroid="transparent"
              onChangeText={(subject_name) => { this.setState({ dataSource: { ...this.state.dataSource, subject_name: subject_name} }) }}

            />

          </View>


          <View>
              <WingBlank size={8}>
          <Card>
            <Card.Header
              title="Your Subjects"
            />
            <Card.Body>
              <View style={{ height: 42 }}>
               <FlatList
          data={this.state.data}
          renderItem={({item}) => <Text  style={{color: 'blue'}}>{item.subject_name}</Text>}

        />

              </View>
            </Card.Body>
          </Card>

        </WingBlank>

          </View>


        <TextInput
          multiline={true}
          editable={false}
          style={styles.info}>
            {this.state.info}
          </TextInput>
          </View>







        <TouchableOpacity style={styles.SubmitsButton} onPress={this.ProfileSubmitFunction} >
          <Text style={styles.SubmitsButtonTitle} >Submit</Text>
        </TouchableOpacity>
<Animated.View  style={{ transform: [{ translateY: animation }], height: 70, backgroundColor: this.state.toastColor, position: 'absolute',left:0, top:0, right:0, justifyContent:  'center' }}>
          <Text style={{ marginLeft: 10,  color: 'white',  fontSize:16, fontWeight: 'bold' }}>
            { this.state.message }
          </Text>
        </Animated.View>
      </View>
    );
  }


};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
//    justifyContent: 'center',
//    alignItems: 'stretch',
    backgroundColor: 'white'
  },
  up: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  down: {
    flex: 7,//70% of column
    flexDirection: 'column',
    justifyContent: 'flex-start',
   // alignItems: 'center'
  },
  SectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: .5,
    borderColor: '#000',
    height: 40,
    borderRadius: 5,
    margin: 10
  },

  TextStyle: {
    flexDirection: 'row',
    margin: 0,

    resizeMode: 'stretch',
    alignItems: 'center'

  },
  ImageStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
    alignItems: 'center'
  },
  SubmitButton: {
    width: 300,
    height: 45,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black'
  },
    SubmitsButton: {
    flex: 1,
//    width: 425,
    height: 45,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4f7ebc'
  },
  SubmitButtonTitle: {
    fontSize: 10,
    color: 'white'
  },
  SubmitsButtonTitle: {
    fontSize: 20,
    color: 'white'
  },
  loginButton: {
    width: 100,
    height: 30,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black'
  },
  loginButtonTitle: {
    fontSize: 18,
    color: 'white'
  },
  info: {
    flex: 0.5,
  },
  inputWrapper: {
    backgroundColor: 'yellow',
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
  },
  input: {
    height: 55,
    paddingLeft: 15,
    paddingRight: 5,
    paddingTop: 5,
    paddingBottom: 5,
  },
  line: {
    height: 1,
    flex: 2,
    backgroundColor: 'black'
  },
  textOR: {
      flex: 1,
      backgroundColor: '#7a42f4',
      height: 30,
  },
  divider: {
    flexDirection: 'row',
    height: 40,
    width: 298,
    justifyContent: 'center',
    alignItems: 'center'
  },
})