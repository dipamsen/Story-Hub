import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Button, ThemeProvider } from "react-native-elements";

export default class ReadOneStory extends React.Component {
  constructor() {
    super();
    this.state = {
      title: '',
      story: '',
      author: '',
    }
  }
  componentDidMount() {
    this.getStory();
  }
  getStory = () => {
    this.setState({
      title: this.props.navigation.getParam("title"),
      story: this.props.navigation.getParam("story"),
      author: this.props.navigation.getParam("author"),
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{this.state.title}</Text>
        <Text style={styles.author}>by {this.state.author}</Text>
        <ScrollView style={styles.storyBox}>
          <Text>{this.state.story}</Text>
        </ScrollView>
        <ThemeProvider theme={{ colors: { primary: "green" } }}>
          <Button onPress={() => { this.props.navigation.navigate("StoryList") }} title="BACK" />
        </ThemeProvider>
      </View >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  search: {
    backgroundColor: 'transparent'
  },
  searchInp: {
    color: '#000'
  },
  searchInpCont: {
    backgroundColor: '#dbdbdb'
  },
  title: {
    fontSize: 30,
    textAlign: "center",
    fontWeight: 'bold',
  },
  author: {
    fontStyle: "italic",
    fontSize: 20,
    textAlign: "center"
  },
  storyBox: {
    // borderWidth: 0.5,
    width: '90%',
    padding: 10,
    alignSelf: "center",
    height: '60%'
  }
});
