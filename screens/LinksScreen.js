import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Tabs } from '@ant-design/react-native';
import TeacherAnalytics from '../components/TeacherAnalytics';
import StudentAnalytics from '../components/StudentAnalytics';

const renderContent = (tab, index) => {
  const style = {
    paddingVertical: 40,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    backgroundColor: '#ddd',
  };
  const content = [1, 2, 3, 4, 5, 6, 7, 8].map(i => {
    return (
      <View key={`${index}_${i}`} style={style}>
        <Text>
          {tab.title} - {i}
        </Text>
      </View>
    );
  });
  return <ScrollView style={{ backgroundColor: '#fff' }}>{content}</ScrollView>;
};
export default class LinksScreen extends React.Component {
  render() {
    const tabs = [
      { title: 'First Tab' },
      { title: 'Second Tab' },

    ];

    const style = {
      alignItems: 'center',
      justifyContent: 'center',
      height: 150,
      backgroundColor: '#fff',
    };
    return (
      <View style={{ flex: 1 }}>
        <Tabs tabs={tabs}>
          <View style={style}>
            <StudentAnalytics/>
          </View>
          <View style={style}>
            <TeacherAnalytics/>
          </View>

        </Tabs>


      </View>
    );
  }
}
export const title = 'Tabs';
export const description = 'Tabs example';