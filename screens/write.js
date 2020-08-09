import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, Alert, KeyboardAvoidingView, ToastAndroid } from 'react-native';

import db from '../config';
import firebase from 'firebase';

export default class Write extends React.Component {
  constructor() {
    super();
    this.state = {
      title: '',
      author: '',
      story: ''
    }
  }
  render() {
    return (
      <KeyboardAvoidingView enabled behaviour="padding" style={styles.container} onPress={() => { Keyboard.dismiss() }}>
        <TextInput style={styles.sinput} placeholder="Title" value={this.state.title} onChangeText={(title) => { this.setState({ title }) }} placeholderTextColor="black" />
        <TextInput style={styles.sinput} placeholder="Author's Name" value={this.state.author} onChangeText={(author) => { this.setState({ author }) }} placeholderTextColor="black" />
        <TextInput style={styles.input} multiline numberOfLines={10} placeholder="Write your story here..." value={this.state.story} onChangeText={(story) => { this.setState({ story }) }} placeholderTextColor="black" />
        <TouchableOpacity style={styles.submit}
          onPress={this.submitStory}>
          <Text style={{ fontSize: 16 }}>Submit</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
  submitStory = () => {
    Keyboard.dismiss();
    let { story, author, title } = this.state;
    story = story.trim(); author = author.trim(); title = title.trim();
    db.collection("stories").add({ story, author, title, date: firebase.firestore.Timestamp.now().toDate() })
      .then(({ id }) => {
        this.setState({ story: '', author: '', title: '' });
        ToastAndroid.show(`Story has been successfully submitted. (ID ${id}).`, ToastAndroid.LONG)
      }
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    width: '80%',
    flex: 0.7,
    padding: 10,
    fontSize: 16,
    textAlignVertical: 'top',
    margin: 4
  },
  sinput: {
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: '80%',
    fontSize: 16,
    margin: 4,
    maxHeight: 40,
    // flex: 0.13
  },
  submit: {
    backgroundColor: 'lightgreen',
    padding: 12,
    margin: 20,
    borderRadius: 20,
    borderWidth: 2
  }
});
