import React from 'react'
import { Text, View } from 'react-native';
import firebase from 'firebase';
import { Button } from 'react-native';

export default class Setting extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {}
    }
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          user: user.providerData[0]
        });
        console.log(user)
      }
    })
  }
  render() {
    return (
      <View>
        <Text>Name: {this.state.user.displayName}</Text>
        <Text>User ID: {this.state.user.uid}</Text>
        <Text>Email-ID: {this.state.user.email}</Text>
        <Button title="SIGN OUT!" onPress={async () => {
          await firebase.auth().signOut();
          this.props.navigation.navigate('LoginScreen')
        }} />
      </View>
    )
  }
}
