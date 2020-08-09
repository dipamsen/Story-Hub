import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { SearchBar, ListItem } from "react-native-elements";
import db from '../config'

export default class Read extends React.Component {
  constructor() {
    super();
    this.state = {
      searchText: "",
      list: [{
        title: "Loading..."
      }],
      allStories: []
    }
  }
  componentDidMount() {
    this.getStories();
  }
  getStories = () => {
    db.collection("stories").get().then((stories) => {
      let storyList = [];
      stories.forEach((storyData) => {
        storyList.push(storyData.data())
      })
      this.setState({ allStories: storyList, list: storyList })
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <SearchBar autoCapitalize="none" searchIcon={styles.searchInp} cancelIcon={styles.searchInp} lightTheme containerStyle={styles.search} inputContainerStyle={styles.searchInpCont} inputStyle={styles.searchInp} value={this.state.searchText} onChangeText={this.refreshList} placeholder="Search..." />
        <ScrollView showsVerticalScrollIndicator>
          {
            this.state.list.map((story, i) => (
              <ListItem
                key={i}
                title={story.title}
                subtitle={story.author}
                bottomDivider
                chevron
                onPress={() => { }}
              />
            ))
          }
        </ScrollView>
      </View>
    );
  }
  refreshList = (searchText) => {
    searchText = searchText.trim().toLowerCase()
    this.setState({ searchText });
    let { allStories } = this.state;
    // ES6 Array.filter() to the rescue!
    let newList = allStories.filter((story) => {
      return story.story.toLowerCase().includes(searchText) || story.title.toLowerCase().includes(searchText) || story.author.toLowerCase().includes(searchText)
    })
    this.setState({ list: newList })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
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
});
