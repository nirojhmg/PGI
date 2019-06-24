import React,{Component} from 'react';
import {

  StyleSheet,
  Text,
  View,
  processColor,Picker,ActivityIndicator,AsyncStorage,
} from 'react-native';

import PureChart from 'react-native-pure-chart';



export default class FacultyAnalysisView extends Component {

  static navigationOptions = {
    header: null,
  }
  constructor(props) {
    super(props);
    this.state = {




      first_sem_percentage:null,
       data:[]
     };

   }


  componentDidMount(){


          AsyncStorage.getItem('firstsem').then((firstsem) => {

            this.setState({
            firstsem:firstsem

            })



          })
          AsyncStorage.getItem('secondsem').then((secondsem) => {

            this.setState({
            secondsem:secondsem

            })



          })
          AsyncStorage.getItem('thirdsem').then((thirdsem) => {

            this.setState({
            thirdsem:thirdsem

            })

           this.generateData()

          })






   }
generateData () {
console.log("Firstssss:"+parseInt(this.state.firstsem, 10))
    var data = []

      data.push(
        {
          x: '1st sem',
          y:parseInt(this.state.firstsem, 10)
        }
      )
      data.push(
        {
          x: '2st sem',
          y: parseInt(this.state.firstsem, 10)
        }
      )
      data.push(
        {
          x: '3rd sem',
          y: parseInt(this.state.thirdsem, 10)
        }
      )
this.setState({
      data: [
        {
           data: data.slice()
        } ]
    })

    }





  render() {

var sampleData = []


console.log("first:ss"+Number(this.state.firstsem))


    return (

   <View style={styles.container}>



   <PureChart type={'line'}
    data={this.state.data}
    width={'100%'}
    height={200}
    customValueRenderer={(index, point) => {
       if (index % 2 === 0) return null
      return (
        <Text style={{textAlign: 'center'}}>{point.y}</Text>
      )
    }}/>


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


});

