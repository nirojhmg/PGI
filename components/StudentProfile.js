import React, { Component } from 'react';
import { Button, Image, StyleSheet, TextInput,ScrollView, View, Text, TouchableOpacity, ActivityIndicator, FlatList, Alert, Picker,AsyncStorage,TouchableHighlight,CheckBox,Animated,Dimensions } from 'react-native';
//import { ImagePicker } from 'expo';

import {
  COLOR_PINK, COLOR_PINK_LIGHT,
  COLOR_FACEBOOK, COLOR_PINK_MEDIUM, COLOR_GREEN
}
  from './myColors';
  let windowWidth = Dimensions.get('window').width
let windowHeight = Dimensions.get('window').height
import { Avatar } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
export default class StudentProfile extends Component {
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
       modalShown: false,



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
  console.log("keyxx:"+this.state.dataSource.DOB)

    fetch('http://kyalin.pythonanywhere.com/users/student/'+this.state.user+'/', {
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

          "full_name": this.state.dataSource.full_name,
"DOB":this.state.dataSource.DOB,
         "first_sem_percentage": this.state.dataSource.first_sem_percentage,
          "second_sem_percentage": this.state.dataSource.second_sem_percentage,
          "third_sem_percentage": this.state.dataSource.third_sem_percentage,
          "fourth_sem_percentage":this.state.dataSource.fourth_sem_percentage,
          "fifth_sem_percentage": this.state.dataSource.fifth_sem_percentage,
          "sixth_sem_percentage": this.state.dataSource.sixth_sem_percentage,
          "seventh_sem_percentage": this.state.dataSource.seventh_sem_percentage,
          "eighth_sem_percentage":this.state.dataSource.eighth_sem_percentage,
          "branch": this.state.dataSource.branch
        })




    }).then((response) => response.json())
      .then((responseJson) => {

        // If server response message same as Data Matched

        this.callToast("Successfully edited Profile","success")

      });


  }
   componentDidMount() {
    // AsyncStorage.getItem('username').then((username) => {

    //   this.setState({
    //   username:username

    //   })

    //   console.log("Username:"+this.state.username)

    // })
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

      console.log("Usernamezz:"+this.state.user)
      return fetch('http://kyalin.pythonanywhere.com/users/student/'+this.state.user+'/')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson,
          DOB:responseJson.DOB
        }, function () {

        });


      })
      .catch((error) => {
        console.error(error);
      });

    })

    console.log("Usernameaa:"+this.state.user)




  }



  render() {
  let animation = this.animatedValue.interpolate({
       inputRange: [0, .3, 1],
       outputRange: [-70, -10, 0]
     })
      console.log(this.state.data)
    console.log("Usernamess:"+this.state.user)
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
      <ScrollView >
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
        </View>
        <View style={styles.down}>
          <View style={styles.SectionStyle}>

            <Text style={styles.TextStyle}>Full Name:</Text>

            <TextInput
              style={{ flex: 1 }}
              value={this.state.dataSource.full_name}
              underlineColorAndroid="transparent"
              onChangeText={(full_name) => { this.setState({ dataSource: { ...this.state.dataSource, full_name: full_name} }) }}

            />

          </View>
          <View style={styles.SectionStyle}>

             <Text style={styles.TextStyle}>DOB:</Text>

             <DatePicker
              style={{ flex: 1 }}
              //style={{width: 200}}
              date={this.state.dataSource.DOB}
              mode="date"
              placeholder="select date"
              format="YYYY-MM-DD"
              minDate="1990/01/01"
              maxDate={new Date().getDate()}
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0
                },
                dateInput: {
                  marginLeft: 36
                }
                // ... You can check the source to find the other keys.
              }}
              onDateChange={(date) => { this.setState({ dataSource: { ...this.state.dataSource, DOB: date} }) }}

         />

   </View>
          <View style={styles.SectionStyle}>

            <Text style={styles.TextStyle}>first_sem_percentage:</Text>

            <TextInput
              style={{ flex: 1 }}
              keyboardType='numeric'

              underlineColorAndroid="transparent"
              value={this.state.dataSource.first_sem_percentage.toString()}
              //onChange={(value) => { this.setState({ dataSource: { ...this.state.dataSource, first_sem_percentage: value} }) }}
                           onChangeText={(first_sem_percentage) => { this.setState({ dataSource: { ...this.state.dataSource, first_sem_percentage: first_sem_percentage} }) }}

            />

          </View>
          <View style={styles.SectionStyle}>

            <Text style={styles.TextStyle}>second_sem_percentage:</Text>

            <TextInput
              style={{ flex: 1 }}
              keyboardType="numeric"
              value={this.state.dataSource.second_sem_percentage.toString()}
              onChangeText={(second_sem_percentage) => { this.setState({ dataSource: { ...this.state.dataSource, second_sem_percentage: second_sem_percentage} }) }}

              underlineColorAndroid="transparent"

            />

          </View>
          <View style={styles.SectionStyle}>

            <Text style={styles.TextStyle}>third_sem_percentage:</Text>

            <TextInput
              style={{ flex: 1 }}
              keyboardType="numeric"
              value={this.state.dataSource.third_sem_percentage.toString()}
              onChangeText={(third_sem_percentage) => { this.setState({ dataSource: { ...this.state.dataSource, third_sem_percentage: third_sem_percentage} }) }}

              underlineColorAndroid="transparent"

            />

          </View>
          <View style={styles.SectionStyle}>

            <Text style={styles.TextStyle}>fourth_sem_percentage:</Text>

            <TextInput
              style={{ flex: 1 }}
              keyboardType="numeric"
              value={this.state.dataSource.fourth_sem_percentage.toString()}
              onChangeText={(fourth_sem_percentage) => { this.setState({ dataSource: { ...this.state.dataSource, fourth_sem_percentage: fourth_sem_percentage} }) }}

              underlineColorAndroid="transparent"

            />

          </View>
          <View style={styles.SectionStyle}>

            <Text style={styles.TextStyle}>fifth_sem_percentage:</Text>

            <TextInput
              style={{ flex: 1 }}
              keyboardType="numeric"
              value={this.state.dataSource.fifth_sem_percentage.toString()}
              onChangeText={(fifth_sem_percentage) => { this.setState({ dataSource: { ...this.state.dataSource, fifth_sem_percentage: fifth_sem_percentage} }) }}

              underlineColorAndroid="transparent"

            />

          </View>
          <View style={styles.SectionStyle}>

<Text style={styles.TextStyle}>sixth_sem_percentage:</Text>

<TextInput
  style={{ flex: 1 }}
  keyboardType="numeric"
  value={this.state.dataSource.sixth_sem_percentage.toString()}
  onChangeText={(sixth_sem_percentage) => { this.setState({ dataSource: { ...this.state.dataSource, sixth_sem_percentage: sixth_sem_percentage} }) }}

  underlineColorAndroid="transparent"

/>

</View>
<View style={styles.SectionStyle}>

<Text style={styles.TextStyle}>seventh_sem_percentage:</Text>

<TextInput
  style={{ flex: 1 }}
  keyboardType="numeric"
  value={this.state.dataSource.seventh_sem_percentage.toString()}
  onChangeText={(seventh_sem_percentage) => { this.setState({ dataSource: { ...this.state.dataSource, seventh_sem_percentage: seventh_sem_percentage} }) }}

  underlineColorAndroid="transparent"

/>

</View>
<View style={styles.SectionStyle}>

<Text style={styles.TextStyle}>eighth_sem_percentage:</Text>

<TextInput
  style={{ flex: 1 }}
  keyboardType="numeric"
  value={this.state.dataSource.eighth_sem_percentage.toString()}
  onChangeText={(eighth_sem_percentage) => { this.setState({ dataSource: { ...this.state.dataSource, eighth_sem_percentage: eighth_sem_percentage} }) }}

  underlineColorAndroid="transparent"

/>

</View>

          <View style={styles.SectionStyle}>

<Text style={styles.TextStyle}>Branch:</Text>


<Picker
  style={{ flex: 1 }}
  selectedValue={this.state.dataSource.branch}
  //style={{height: 50, width: 100}}
  onValueChange={(itemValue, itemIndex) =>
    this.setState({ dataSource: { ...this.state.dataSource, branch: itemValue} })
  }>
  <Picker.Item label="Computer Science & Engineering" value="Computer Science & Engineering" />
  <Picker.Item label="Mechanical Engineering" value="Mechanical Engineering" />
  <Picker.Item label="Others" value="Others" />

</Picker>

</View>




        </View>




        <TouchableOpacity style={styles.SubmitButton} onPress={this.ProfileSubmitFunction} >
          <Text style={styles.SubmitButtonTitle} >Submit</Text>
        </TouchableOpacity>

 <Animated.View  style={{ transform: [{ translateY: animation }], height: 70, backgroundColor: this.state.toastColor, position: 'absolute',left:0, top:0, right:0, justifyContent:  'center' }}>
          <Text style={{ marginLeft: 10,  color: 'white',  fontSize:16, fontWeight: 'bold' }}>
            { this.state.message }
          </Text>
        </Animated.View>
      </ScrollView>
    );
  }


};

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
    flex: 7,//70% of column
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center'
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
  flex:1,
    width: 400,
    height: 45,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR_PINK
  },
  SubmitButtonTitle: {
    fontSize: 18,
    color: 'white'
  },
})