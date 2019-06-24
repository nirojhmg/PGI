import React, { Component } from 'react';
import { Button, Image, View, StyleSheet, Text, TextInput, AppRegistry, FlatList,Alert,TouchableOpacity,Picker,AsyncStorage,Dimensions,Animated } from 'react-native';
import DialogInput from 'react-native-dialog-input';
import {
    COLOR_PINK, COLOR_PINK_LIGHT,
    COLOR_FACEBOOK, COLOR_PINK_MEDIUM, COLOR_GREEN
}
    from './myColors';
//import Picker from 'react-native-simple-modal-picker'
 let windowWidth = Dimensions.get('window').width
let windowHeight = Dimensions.get('window').height
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



export default class TeacherAttendance extends Component {
    constructor(props) {
        super(props);
         this.animatedValue = new Animated.Value(0)
    this.animatedXValue = new Animated.Value(-windowWidth)
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
          date:'',
          subject_name:'',
           modalShown: false,

         };

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
 setToastType(message='Success!', type='success') {
    let color
    if (type == 'error') color = 'red'
    if (type == 'primary') color = '#2487DB'
    if (type == 'warning') color = '#ec971f'
    if (type == 'success') color = 'green'
    this.setState({ toastColor: color, message: message })
  }
       SubmitFunction = () => {






            this.saveItem('fullname', this.state.full_name)
         fetch('http://kyalin.pythonanywhere.com/users/attendancerecord/', {
         method: 'POST',

          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            // Authorization:  `7419b3f8649566eeee73097184dd4541920af853`,
            Authorization: `Token `+this.state.key,

          },
         body:
                JSON.stringify({

        "subject_name": this.state.PickerValueHolder,
        "full_name": this.state.fullname,
        "Date": this.state.date,
        "present": "true"
                })




        }).then((response) => response.json())
          .then((responseJson) => {
            this.setState({ defaultAnimationDialog: false });
             this.callToast("Attendance has been added","success")
            //this.props.navigation.navigate("TeacherAttendanceView")

          });



      }

       componentDidMount(){
        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year


      AsyncStorage.getItem('key').then((key) => {

        this.setState({
        key:key

        })
    })
    AsyncStorage.getItem('user').then((user) => {

        this.setState({
        user:user

        })
    })
    console.log("Faculty:"+this.state.user)
        fetch("http://kyalin.pythonanywhere.com/users/users/")
        .then(response => response.json())
        .then((responseJson)=> {
          this.setState({
           loading: false,
           dataSource: responseJson.filter(d => d.is_student === true),
           date:
        year+ '-' + month + '-' + date,
          })
          .catch(error=>console.log(error))
        })
        return fetch('http://kyalin.pythonanywhere.com/users/subject/')
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({

            drop_down_data: responseJson.filter(d => d.faculty.toString() === this.state.user),
            PickerValueHolder:responseJson.filter(d => d.faculty.toString() === this.state.user)[0].subject_name,
            subject_name:responseJson.filter(d => d.faculty.toString() === this.state.user)[0].subject_name

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
      return( this.state.dataSource.username.map( (x,i) => {
            return( <Picker.Item label={x} key={i} value={x}  />)} ));
  }
    GetItem (item) {
      this.setState({
        defaultAnimationDialog: true,
        fullname:item,
      });




    }


    render() {

let animation = this.animatedValue.interpolate({
       inputRange: [0, .3, 1],
       outputRange: [-70, -10, 0]
     })
      return (

  <View style={styles.MainContainer}>

<TouchableOpacity  style={styles.button}   onPress={() =>  this.props.navigation.navigate("TeacherMainTabNavigator")} >
              <Text style={{  fontSize: 30}}>←</Text>

            </TouchableOpacity>

         <FlatList

            data={ this.state.dataSource }

            ItemSeparatorComponent = {this.FlatListItemSeparator}

            renderItem={({item}) => <Text style={styles.item}
            onPress=
        {this.GetItem.bind(this, item.username)}
            > {item.username} </Text>}
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
            <Picker.Item label={item.subject_name} value={item.subject_name} key={key} />)
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

 <Animated.View  style={{ transform: [{ translateY: animation }], height: 70, backgroundColor: this.state.toastColor, position: 'absolute',left:0, top:0, right:0, justifyContent:  'center' }}>
          <Text style={{ marginLeft: 10,  color: 'white',  fontSize:16, fontWeight: 'bold' }}>
            { this.state.message }
          </Text>
        </Animated.View>
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