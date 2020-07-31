import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard } from 'react-native';

export default class Write extends React.Component {
  render() {
    return (
      <View style={styles.container} onPress={() => { Keyboard.dismiss() }}>
        <TextInput style={styles.input} multiline numberOfLines={10} placeholder="Write your story here..." />
        <TouchableOpacity style={styles.submit} onPress={() => { Keyboard.dismiss() }}>
          <Text style={{ fontSize: 16 }}>Submit</Text>
        </TouchableOpacity>
      </View>
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
    width: '90%',
    flex: 0.7,
    padding: 10,
    fontSize: 16,
    textAlignVertical: 'top'
  },
  submit: {
    backgroundColor: 'lightgreen',
    padding: 12,
    margin: 20,
    borderRadius: 20,
    borderWidth: 2
  }
});
