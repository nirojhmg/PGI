import { StyleSheet, StatusBar, TouchableOpacity, ScrollView, Text, View,AppRegistry,Image,AsyncStorage } from 'react-native';
import {
  COLOR_PINK, COLOR_PINK_LIGHT,
  COLOR_FACEBOOK, COLOR_PINK_MEDIUM, COLOR_GREEN}
from './myColors';
import { Avatar }  from 'react-native-elements';

import React, { Component } from 'react';

import Dashboard from 'react-native-dashboard';

const items = [

  { name: 'Attendance', background: '#4f7ebc', icon: 'calendar' },
  { name: 'Subject', background: '#FF4500', icon: 'briefcase' },
  { name: 'Vote', background: '#FF4500', icon: 'users' },
  { name: 'Notice', background: '#4f7ebc', icon: 'file' },
  { name: 'Logout', background: '#4f7ebc', icon: 'gear' },
];
export default class TeacherDashboard extends Component {

  static navigationOptions = {
        header: null

      }
  constructor(props) {

    super(props);
    this.state = { username:'', }
  }
_card = el => {
    console.log('Card: ' +'Teacher'+ el.name)
    if(el.name!=="Logout"){
    this.props.navigation.navigate('Teacher'+el.name)
}
else
{
    this.props.navigation.navigate("Login")
}

  };
  componentDidMount(){
    AsyncStorage.getItem('username').then((username) => {

      this.setState({
      username:username

      })

      console.log("Username:"+this.state.username)

    })
  }
  render() {

//console.log("Teacher USername:"+this.state.username)
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
        <Dashboard items={items} background={true} card={this._card} column={2} />
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