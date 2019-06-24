import React,{Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  processColor,Picker,ActivityIndicator,AsyncStorage,TouchableOpacity
} from 'react-native';

import PureChart from 'react-native-pure-chart';
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogButton,
  SlideAnimation,
  ScaleAnimation,
} from 'react-native-popup-dialog';

import {
  COLOR_PINK, COLOR_PINK_LIGHT,
  COLOR_FACEBOOK, COLOR_PINK_MEDIUM, COLOR_GREEN}
from './myColors';
export default class TeacherAnalytics extends Component {

  static navigationOptions = {
    title: 'Stats',
  }
  constructor(props) {
    super(props);
    this.state = {


       defaultAnimationDialog:true,
       language:'Academic',
       drop_down_data:[],
       data:[],
       loading:false,
       AcademicData:[],
     };

   }
   async saveItem(item, selectedValue) {
        try {
          await AsyncStorage.setItem(item, selectedValue);
        } catch (error) {
          console.error('AsyncStorage error: ' + error.message);
        }
      }
   showDialog(isShow){
    this.setState({isDialogVisible: isShow});
  }
  fn(){

     this.saveItem('studentid', this.state.PickerValueHolder.toString())

    fetch('http://kyalin.pythonanywhere.com/users/student/'+this.state.PickerValueHolder+'/')
    .then((response) => response.json())
    .then((responseJson) => {
     this.setState({ AcademicData:responseJson})
    // console.log("sahgjsjh:"+responseJson.first_sem_percentage)
//     this.saveItem('firstsem', responseJson.first_sem_percentage.toString())
//          this.saveItem('secondsem', responseJson.second_sem_percentage.toString())
//          this.saveItem('thirdsem', responseJson.third_sem_percentage.toString())
//          this.saveItem('fourthsem', responseJson.fourth_sem_percentage.toString())
//          this.saveItem('fifthsen', responseJson.fifth_sem_percentage.toString())
//          this.saveItem('sixthsem', responseJson.sixth_sem_percentage.toString())
//          this.saveItem('seventhsem', responseJson.seventh_sem_percentage.toString())
//          this.saveItem('eighthsem', responseJson.eighth_sem_percentage.toString())
this.generateData()

    })






  }
  componentDidMount(){
    fetch('http://kyalin.pythonanywhere.com/users/users/')
    .then((response) => response.json())
    .then(data => {



  this.setState({ drop_down_data: data.filter(d => d.is_student === true),PickerValueHolder:data.filter(d => d.is_student === true)[0].id})
  console.log("drop:"+this.state.drop_down_data)
})
    .catch((error) => {
      console.error(error);
    })




   }

generateData () {
console.log("Firstssss:"+parseInt(this.state.firstsem, 10))
    var data = []

      data.push(
        {
          x: '1st sem',
          y:parseInt(this.state.AcademicData.first_sem_percentage, 10)
        }
      )
      data.push(
        {
          x: '2st sem',
          y: parseInt(this.state.AcademicData.second_sem_percentage, 10)
        }
      )
      data.push(
        {
          x: '3rd sem',
          y: parseInt(this.state.AcademicData.third_sem_percentage, 10)
        }
      )
      data.push(
        {
          x: '4th sem',
          y: parseInt(this.state.AcademicData.fourth_sem_percentage, 10)
        }
      )
      data.push(
        {
          x: '5th sem',
          y: parseInt(this.state.AcademicData.fifth_sem_percentage, 10)
        }
      )
      data.push(
        {
          x: '6th sem',
          y: parseInt(this.state.AcademicData.sixth_sem_percentage, 10)
        }
      )
      data.push(
        {
          x: '7th sem',
          y: parseInt(this.state.AcademicData.seventh_sem_percentage, 10)
        }
      )
      data.push(
        {
          x: '8th sem',
          y: parseInt(this.state.AcademicData.eighth_sem_percentage, 10)
        }
      )

this.setState({
      data: [
        {
           data: data.slice()
        } ],
        loading:true
    })

    }
  render() {

if(this.state.loading==false){
    return(
      <View style={{flex: 1, padding: 20}}>
      <View style={styles.picker}>
            < Dialog
          onDismiss={() => {
            this.setState({ defaultAnimationDialog: false });
          }}
          width={0.9}
          visible={this.state.defaultAnimationDialog}
          rounded
          actionsBordered
          dialogTitle={
            <DialogTitle
              title={"Select Type and Students "}
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
                onPress={() => {
                this.setState({ defaultAnimationDialog: false })

                this.fn()



                }}
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
            <Picker.Item label={item.username} value={item.id} key={key} />)
            )}

          </Picker>

        </DialogContent>
        </Dialog>
</View>

      </View>
    );
    }

    else if (this.state.loading==true){
      return(
      <View>
      <View>
       <TouchableOpacity  style={styles.button}   onPress={() =>  this.setState({
       loading:false,
       defaultAnimationDialog:true
       })} >
              <Text style={{  fontSize: 30}}>←</Text>

            </TouchableOpacity>
            </View>
     <PureChart type={'line'}
    data={this.state.data}
    width={'100%'}
    height={200}
    //style={styles.PureChart}
//    customValueRenderer={(index, point) => {
//       if (index % 2 === 0) return null
//      return (
//        <Text style={{textAlign: 'right'}}>{point.y}</Text>
//      )
//    }}
    />
    </View>
       );
      }
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
   alignItems: 'stretch',
   // backgroundColor: COLOR_PINK_LIGHT
  },
  picker:{
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  button:{

marginBottom:45,
    height: 45,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR_FACEBOOK,
  },

});

