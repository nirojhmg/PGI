import { StyleSheet,Dimensions,FlatList,StatusBar, TouchableOpacity, ScrollView, Text, View,AppRegistry,Image,AsyncStorage,TouchableHighlight } from 'react-native';
import {
  COLOR_PINK, COLOR_PINK_LIGHT,
  COLOR_FACEBOOK, COLOR_PINK_MEDIUM, COLOR_GREEN}
from './myColors';
import { Avatar }  from 'react-native-elements';
//import { Accordion, List } from 'antd-mobile';
import React, { Component } from 'react';
import { CardViewWithIcon } from "react-native-simple-card-view";
import DialogInput from 'react-native-dialog-input';

export default class StudentAttendance extends Component {
    static navigationOptions = {
        title: 'Attendance Record',

      }
      constructor(props) {
        super(props);
        this.state = {
          loading: true,
          data:[],
          isDialogVisible: false,
          github       : 0,

         };

       }


       componentDidMount(){

        AsyncStorage.getItem('username').then((username) => {

            this.setState({
            username:username

            })




//        fetch('http://kyalin.pythonanywhere.com/users/student/'+this.state.user+'/')
//        .then((response) => response.json())
//        .then(data => {
//
//      this.setState({ full_name:data.full_name })
//      console.log("FUllName:"+this.state.full_name)
//    })
//        .catch((error) => {
//          console.error(error);
//        });

        fetch('http://kyalin.pythonanywhere.com/users/attendancerecord/')
              .then((response) => response.json())
              .then(data => {

            this.setState({ data: data.filter(d => d.full_name === this.state.username) })
            console.log("Data:"+this.state.data)
          })
          console.log("Data:"+this.state.data)
              .catch((error) => {
                console.error(error);
              });




            })

       }


       FlatListItemSeparator = () => {
        return (
          <View
            style={{
              height: 1,
              width: "100%",
              backgroundColor: "#607D8B",
            }}
          />
        );
      }


    render() {
      const miniCardStyle = {shadowColor       : '#000000',shadowOffsetWidth : 2,shadowOffsetHeight: 2,shadowOpacity     : 0.1,hadowRadius      : 5,bgColor           : '#ffffff',padding           : 5,margin            : 5,borderRadius      : 3,elevation         : 3,width             : (Dimensions.get("window").width / 2) - 10
    };
    const uniqueTags = [];


this.state.data.map(img => {
    if (uniqueTags.indexOf(img.subject_name) === -1) {
        uniqueTags.push(img.subject_name)
    }
});



var elements=[];
    for(var i=0;i<uniqueTags.length;i++){
        var count = Object.keys(this.state.data.filter(d => d.subject_name === uniqueTags[i])).length;
     elements.push({"name":uniqueTags[i],"count":count});

    }
    console.log(elements)
    return(
        <View style={styles.MainContainer}>
        <TouchableOpacity  style={styles.button}   onPress={() =>  this.props.navigation.navigate("StudentMainTabNavigator")} >
              <Text style={{  fontSize: 30}}>←</Text>

            </TouchableOpacity>
        <View style={styles.up}>
        <View style={ {alignItems   : "center",flexDirection: "row",flexWrap     : 'wrap',} }>
        { elements.map((item, key)=>(

         <CardViewWithIcon
         key={key}
            withBackground={ false }
            // androidIcon={ 'logo-github' }
            // iosIcon={ 'logo-github' }
            iconHeight={ 30 }
            iconColor={ '#333' }
            title={ item.name  }
            contentFontSize={ 20 }
            titleFontSize={ 12 }
            style={ miniCardStyle }
            content={ item.count.toString() }
            // onPress={ () => this.setState({
            //          github       : this.state.github + 1
            // }) }
          />
         )
         )}



        </View>
        </View>
        {/* <FlatList

         data={ this.state.data }

         ItemSeparatorComponent = {this.FlatListItemSeparator}

         renderItem={({item}) => <Text style={styles.item}

         > {item.subject_name}-{item.Date} </Text>}
        >

        </FlatList> */}


                    </View>
    );
    }
}
const styles = StyleSheet.create({
    MainContainer: {
      flex: 1,
      flexDirection: 'column',
      // justifyContent: 'center',
       alignItems: 'stretch',
        backgroundColor: COLOR_PINK_LIGHT
      },
      item: {
        padding: 10,
        fontSize: 18,
        height: 44,
      },
      title: {
        fontSize: 38,
        backgroundColor: 'transparent'
      },
      up: {
        flex: 3,
        flexDirection: 'column',
        // justifyContent: 'center',
        // alignItems: 'center'
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