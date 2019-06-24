import React, { Component } from "react";
import { FlatList, StyleSheet, Text, View, Button,TouchableOpacity } from "react-native";
import {
  COLOR_PINK, COLOR_PINK_LIGHT,
  COLOR_FACEBOOK, COLOR_PINK_MEDIUM, COLOR_GREEN}
from './myColors';
export default class FacultyNoticeView extends Component {

  state = {
    data: []
  };

  componentWillMount() {
    this.fetchData();
  }

  fetchData = async () => {
    const response = await fetch("http://kyalin.pythonanywhere.com/users/notice/");
    const json = await response.json();
    this.setState({ data: json.reverse() });
  };

  render() {
    return (
      <View style={styles.container}>
      <TouchableOpacity  style={styles.button}   onPress={() =>  this.props.navigation.navigate("TeacherMainTabNavigator")} >
              <Text style={{  fontSize: 30}}>←</Text>

            </TouchableOpacity>
        <FlatList
          data={this.state.data}
          keyExtractor={(x, i) => i}
          renderItem={({ item }) =>
          <>
          <Button title={ item.title }/>
            <Text>
              {`${item.noticedetails}`}
            </Text>
</>
             }

        />
      </View>
    );
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
  button:{
    marginTop:25,

    height: 45,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR_FACEBOOK,
  },
});