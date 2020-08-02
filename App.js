import React from 'react';
import { Image, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
// import { StatusBar } from 'expo-status-bar';
import { Header } from 'react-native-elements';

import Write from './screens/write';
import Read from './screens/read';

export default class App extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header backgroundColor="green"
          leftComponent={
            <Image
              source={require('./assets/iccon.png')}
              style={{ width: 60, height: 60 }} />
          } centerComponent={{
            text: "Story Hub",
            style: {
              color: 'white',
              fontSize: 24
            }
          }} />
        <AppContainer />
      </View>
    );
  }
}


const TabNavigator = createMaterialTopTabNavigator({
  'Write Story': { screen: Write },
  'Read Story': { screen: Read },
}, {
  tabBarOptions: {
    style: {
      backgroundColor: "green"
    },
    inactiveTintColor: "#a0a0a0",
    indicatorStyle: {
      backgroundColor: "red",
      height: 4,
      borderRadius: 3
    },
    labelStyle: {
      fontWeight: "bold"
    }
  },
})

const AppContainer = createAppContainer(TabNavigator);
