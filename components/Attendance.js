import React, { Component } from 'react';
import { Button, Image, View, StyleSheet, Text, TextInput, AppRegistry, FlatList,Alert,TouchableOpacity,Picker } from 'react-native';
import DialogInput from 'react-native-dialog-input';
import {
    COLOR_PINK, COLOR_PINK_LIGHT,
    COLOR_FACEBOOK, COLOR_PINK_MEDIUM, COLOR_GREEN
}
    from './myColors';
import MockData from './MockData'
//import Picker from 'react-native-simple-modal-picker'
import { Dropdown } from 'react-native-material-dropdown';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogButton,
  SlideAnimation,
  ScaleAnimation,
} from 'react-native-popup-dialog';



export default class Attendance extends Component {
    constructor(props) {
        super(props);
        this.state = {
          loading: true,
          dataSource:[],
          selectedIndex: 0,
          isDialogVisible: false,
          defaultAnimationDialog: false,
          fullname:'',
          language:'',
          PickerValueHolder : '',
          drop_down_data:[],
          date:''
         };

       }

       SubmitFunction = () => {

 console.log("Keyzzz :"+this.state.key)
        fetch('http://100.121.155.148:8000/users/attendancerecord/', {
          method: 'POST',

          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            // Authorization:  `7419b3f8649566eeee73097184dd4541920af853`,
            Authorization: `Token `+this.props.navigation.state.params.key,

          },
          body:
            JSON.stringify({
              "subject_id":this.state.PickerValueHolder ,
    "subject_name": this.state.Subject_name,
    "full_name": this.state.fullname,
    "Date": this.state.date,
    "present": "true"
            })




        }).then((response) => response.json())
          .then((responseJson) => {

            // If server response message same as Data Matched

            Alert.alert(JSON.stringify(responseJson));

          });

         this.setState({ defaultAnimationDialog: false });


       }

       componentDidMount(){
        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year
        fetch("http://100.121.155.148:8000/users/student/")
        .then(response => response.json())
        .then((responseJson)=> {
          this.setState({
           loading: false,
           dataSource: responseJson,
           date:
        year+ '-' + month + '-' + date,
          })
          .catch(error=>console.log(error))
        })
        return fetch('http://100.121.155.148:8000/users/subject/')
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({

            drop_down_data: responseJson,

          }, function() {
            // In this block you can do something with new state.
          });
        })
        .catch((error) => {
          console.error(error);
        });


        }

        showDialog(isShow){
            this.setState({isDialogVisible: isShow});
          }
          sendInput(inputText){
            console.log("sendInput (DialogInput#1): "+inputText);
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
    countryList = () =>{
      return( this.state.dataSource.full_name.map( (x,i) => {
            return( <Picker.Item label={x} key={i} value={x}  />)} ));
  }
    GetItem (item) {
      this.setState({
        defaultAnimationDialog: true,
        fullname:item,
      });
     console.log(item);
     console.log(this.state.drop_down_data)


    }


    render() {


      return (

  <View style={styles.MainContainer}>



         <FlatList

            data={ this.state.dataSource }

            ItemSeparatorComponent = {this.FlatListItemSeparator}

            renderItem={({item}) => <Text style={styles.item}
            onPress=
        {this.GetItem.bind(this, item.full_name)}
            > {item.full_name} </Text>}
           >

           </FlatList>

             {/* <Button
            title="Show Dialog - Default Animation"
            onPress={() => {
              this.setState({
                defaultAnimationDialog: true,
              });
            }}
          /> */}
           <Dialog
          onDismiss={() => {
            this.setState({ defaultAnimationDialog: false });
          }}
          width={0.9}
          visible={this.state.defaultAnimationDialog}
          rounded
          actionsBordered
          // actionContainerStyle={{
          //   height: 100,
          //   flexDirection: 'column',

          // }}
          dialogTitle={
            <DialogTitle
              title={"add attendance of "+ this.state.fullname}
              style={{
                backgroundColor: '#F7F7F8',
              }}
              hasTitleBar={false}
              align="left"
            />
          }
          footer={
            <DialogFooter>
              <DialogButton
                text="CANCEL"
                bordered
                onPress={() => {
                  this.setState({ defaultAnimationDialog: false });
                }}
                key="button-1"
              />
              <DialogButton
                text="OK"
                bordered
                onPress={
                  this.SubmitFunction
                }
                key="button-2"
              />
            </DialogFooter>
          }
        >
          <DialogContent
            style={{
              backgroundColor: '#F7F7F8',
            }}
          >


 <Picker
            selectedValue={this.state.PickerValueHolder}
            onValueChange={(itemValue, itemIndex) => this.setState({PickerValueHolder: itemValue})} >
            { this.state.drop_down_data.map((item, key)=>(
            <Picker.Item label={item.subject_name} value={item.subject_id} key={key} />)
            )}

          </Picker>
{/* <Picker
                    selectedValue={this.state.dataSource.full_name}
                    onValueChange={ (value) => (  this.setState({ dataSource: { ...this.state.dataSource, full_name: value} }) )}>
                    { this.countryList() }
                </Picker> */}
          </DialogContent>
        </Dialog>




      {/* <View style={styles.container}>
        {this.simplePickerView()}
        {this.customRowPickerView()}
        {this.dropDownView()}
      </View> */}

         </View>

      );
    }
    simplePickerView(){
      return(
        <View>
          <Picker
            ref={instance => this.simplePicker = instance}
            data={this.data}
            label={'name'}
            value={'value'}
            onValueChange={(value) => alert(value + ' selected')} />

          <View style={styles.subContainer}>
            <Button
              title={'Open Simple Picker'}
              onPress={() => this.simplePicker.setModalVisible(true)} />
          </View>
        </View>
      )
    }
    customRowPickerView(){
      return(
        <View>
          <Picker
            ref={instance => this.customRowPicker = instance}
            data={this.data}
            label={'name'}
            value={'value'}
            onValueChange={(value) => alert(value + ' selected')}
            renderRow={(rowData) => <Text style={styles.rowStyle}>{rowData.name}</Text>} />
          <View style={styles.subContainer}>
            <Button
              title={'Open Cutome Row Picker'}
              onPress={() => this.customRowPicker.setModalVisible(true)} />
          </View>
        </View>
      )
    }
    dropDownView(){
      return(
        <View>
          <Picker
            ref={instance => this.dropDownPicker = instance}
            data={this.data}
            label={'name'}
            value={'value'}
            onValueChange={(value, selectedIndex) => this.setState({selectedIndex})} />
          <View style={styles.subContainer}>
            <TouchableOpacity style={styles.dropDownContainer} onPress={() => this.dropDownPicker.setModalVisible(true)}>
              <Text style={styles.dropDownText}>{this.data[this.state.selectedIndex].name}</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }
  }

  const styles = StyleSheet.create({

  MainContainer :{

  // Setting up View inside content in Vertically center.
  justifyContent: 'center',
  flex:1,
  margin: 10

  },

  item: {
      padding: 10,
      fontSize: 18,
      height: 44,
    },
    subContainer:{
      margin: 8
    },
    rowStyle:{
      backgroundColor: '#FFF',
      color: '#333',
      padding: 8,
      fontSize: 20
    },
    dropDownContainer:{
      borderBottomWidth: 1,
      padding: 8
    },
    dropDownText:{
      fontSize: 20,
      margin: 8
    }
  });