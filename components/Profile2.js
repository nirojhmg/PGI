import React, { Component } from "react";
import { FlatList, StyleSheet, Text, View, Button } from "react-native";

export default class Profile2 extends Component {
  state = {
    data: []
  };

  componentWillMount() {
    this.fetchData();
  }

  fetchData = async () => {
    const response = await fetch("http://100.121.155.148:8000/users/notice/");
    const json = await response.json();
    this.setState({ data: json.reverse() });
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.data}
          keyExtractor={(x, i) => i}
          renderItem={({ item }) =>
          <>
          <Button title={ item.title }/>
            <Text>
              {`${item.title} ${item.noticedetails}`}
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
    marginTop: 15,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  }
});