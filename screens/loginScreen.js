import React from 'react';
import { StyleSheet, View, KeyboardAvoidingView, ScrollView, Alert, ToastAndroid } from 'react-native';
import { Button, ThemeProvider, Input } from "react-native-elements";
import db from '../config';
import firebase from 'firebase'

export default class LoginScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      screen: "Login",
      loginEmail: '',
      loginPassword: '',
      rName: '',
      rEmail: '',
      rUName: '',
      rPass: '',
      rCPass: ''
    }
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        ToastAndroid.show("Logged in.", ToastAndroid.SHORT)
        this.props.navigation.navigate("TabNavigator");
      }
    })
  }
  login = () => {
    let { loginEmail, loginPassword } = this.state;
    firebase.auth().signInWithEmailAndPassword(loginEmail, loginPassword).then((response) => {
      console.log(response);
    }).catch((err) => {
      Alert.alert("Error!", err.message);
      this.setState({ loginEmail: '', loginPassword: '' })
    })
  }
  register = () => {
    let { rName, rEmail, rPass, rCPass, rUName } = this.state;
    if (rPass !== rCPass) {
      Alert.alert("Error", "Please check your password.");
      return;
    }
    firebase.auth().createUserWithEmailAndPassword(rEmail, rPass).then((response) => {
      response.user.updateProfile({
        displayName: rName,
        uid: rUName
      })
    }).catch((err) => {
      Alert.alert("Error!", err.message);
      this.setState({ rName: '', rEmail: '', rPass: '', rCPass: '', rUName: '' })
    })
  }
  render() {
    return (
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.box}>
          <ThemeProvider theme={{ colors: { primary: "green" } }}>
            <View style={[{ margin: 20 }]}>
              <View style={{ flexDirection: "row", marginBottom: 30 }}>
                <Button title="LOGIN" onPress={() => { this.setState({ screen: "Login" }) }}
                  containerStyle={{ flex: 1 }} type={this.state.screen == "Login" ? "solid" : "outline"} />
                <Button title="REGISTER" onPress={() => { this.setState({ screen: "Register" }) }} containerStyle={{ flex: 1 }} type={this.state.screen == "Register" ? "solid" : "outline"} />
              </View>
              {
                this.state.screen == "Login" ? <View >
                  <Input
                    label="Email Address"
                    placeholder='abc@example.com'
                    keyboardType="email-address"
                    leftIcon={{ type: 'font-awesome', name: 'envelope', color: '#555555', size: 18 }}
                    value={this.state.loginEmail}
                    onChangeText={(loginEmail) => { this.setState({ loginEmail }) }}
                  />
                  <Input
                    label="Password"
                    placeholder='Password'
                    secureTextEntry
                    leftIcon={{ type: 'font-awesome-5', name: 'key', color: '#555555', size: 18 }}
                    value={this.state.loginPassword}
                    onChangeText={(loginPassword) => { this.setState({ loginPassword }) }}
                  /><Button onPress={this.login} title="Login" />
                </View> : <ScrollView style={{ height: "75%" }}>
                    <Input
                      label="Name"
                      placeholder='Name'
                      leftIcon={{ type: 'font-awesome', name: 'user', color: '#555555', size: 18 }}
                      value={this.state.rName}
                      onChangeText={(rName) => { this.setState({ rName }) }}
                    />
                    <Input
                      label="Email Address"
                      placeholder='abc@example.com'
                      keyboardType="email-address"
                      leftIcon={{ type: 'font-awesome', name: 'envelope', color: '#555555', size: 18 }}
                      value={this.state.rEmail}
                      onChangeText={(rEmail) => { this.setState({ rEmail }) }}
                    />
                    <Input
                      label="Username"
                      placeholder='Username'
                      leftIcon={{ type: 'font-awesome', name: 'user', color: '#555555', size: 18 }}
                      value={this.state.rUName}
                      onChangeText={(rUName) => { this.setState({ rUName }) }}
                    />
                    <Input
                      label="Password"
                      placeholder='Password'
                      secureTextEntry
                      leftIcon={{ type: 'font-awesome-5', name: 'key', color: '#555555', size: 18 }}
                      value={this.state.rPass}
                      onChangeText={(rPass) => { this.setState({ rPass }) }}
                    /><Input
                      label="Confirm Password"
                      placeholder='Password'
                      secureTextEntry
                      leftIcon={{ type: 'font-awesome-5', name: 'key', color: '#555555', size: 18 }}
                      value={this.state.rCPass}
                      onChangeText={(rCPass) => { this.setState({ rCPass }) }}
                    /><Button onPress={this.register} title="Register" />
                  </ScrollView>
              }
            </View>
          </ThemeProvider>
        </View>
      </KeyboardAvoidingView >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: '#bdbdbd',
    // alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    backgroundColor: '#fff',
    width: '90%',
    height: '85%',
    alignSelf: "center",
    borderRadius: 20,
    borderWidth: 4
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
