import React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Navigator from './App/containers/Navigator'
export default class App extends React.Component {
  render() {
    return (
     <Navigator />
    );
  }
}

