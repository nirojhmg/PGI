import { StyleSheet, StatusBar, TouchableOpacity, ScrollView, Text, View,AppRegistry,Image,AsyncStorage } from 'react-native';
import {
  COLOR_PINK, COLOR_PINK_LIGHT,
  COLOR_FACEBOOK, COLOR_PINK_MEDIUM, COLOR_GREEN}
from './myColors';
import { Avatar }  from 'react-native-elements';

import React, { Component } from 'react';

import Dashboard from 'react-native-dashboard';

import {DrawerNavigator} from 'react-navigation'
const items = [

  { name: 'Attendance', background: '#4f7ebc', icon: 'calendar' },
  { name: 'Vote', background: '#FF4500', icon: 'briefcase' },
  { name: 'Notice', background: '#FF4500', icon: 'users' },
  { name: 'Logout', background: '#4f7ebc', icon: 'file' }
  
];
export default class StudentDashboard extends Component {
  static navigationOptions = {
    header: null,

  }
  constructor(props) {
    super(props);
    this.state = { dataSource: [],hasToken: false }

   // this.state = {date:"2016-05-15"}
  }

  componentDidMount(){
    //console.log(this.props.navigation.state.params.username)
    fetch("http://kyalin.pythonanywhere.com/users/users/"+this.state.username+"/")
    .then(response => response.json())
    .then((responseJson)=> {
      this.setState({

       dataSource: responseJson
      })
      .catch(error=>console.log(error))
    })
    AsyncStorage.getItem('username').then((username) => {

      this.setState({
      username:username

      })

      console.log("Username:"+this.state.username)

    })
    // AsyncStorage.getItem('key').then((key) => {

    //   this.setState({
    //   key:key

    //   })


    //  console.log("key:"+this.state.key)

    // })
  }
_card = el => {

  if(el.name!=="Logout"){
    this.props.navigation.navigate('Student'+el.name)
}
else
{
    this.props.navigation.navigate("Login")
}
   
  };
  render() {


    return (

      <View style={styles.container}>
        <View style={styles.up}>
        <Avatar rounded
  source={{
    uri:
      'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
  }}
  size="large"

/>
<TouchableOpacity style={styles.loginButton}  >
              <Text style={styles.loginButtonTitle} >{this.state.username}</Text>
            </TouchableOpacity>


        </View>
      <View style={styles.dashboard}>
        <Dashboard items={items} background={true} card={this._card} column={2}  />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#d7e3f7'
  },
  dashboard:{
    flex: 8,//70% of column
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  up: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  loginButton: {
    width: 100,
    height: 30,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR_PINK
  },
  loginButtonTitle: {
    fontSize: 18,
    color: 'white'
  },

});