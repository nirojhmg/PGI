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
export default class StudentAnalytics extends Component {

  static navigationOptions = {
    title: 'Stats',
  }
  constructor(props) {
    super(props);
    this.state = {



       data:[],

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

  componentDidMount(){


  AsyncStorage.getItem('user').then((user) => {

            this.setState({
            user:user

            })


 fetch('http://kyalin.pythonanywhere.com/users/student/'+this.state.user+'/')
    .then((response) => response.json())
    .then((responseJson) => {
     this.setState({ AcademicData:responseJson})


this.generateData()

    })
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




      return(
      <View>

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



const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
   alignItems: 'stretch',
   // backgroundColor: COLOR_PINK_LIGHT
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

