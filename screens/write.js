import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Write extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>This is Write Screen</Text>
        <Text>Swipe Right to Read Screen</Text>
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
});
