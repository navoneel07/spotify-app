/* eslint-disable prettier/prettier */
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { Component } from 'react';

import { Provider } from 'react-redux';
import theme from './constants';
import { store } from './src/redux/store/store';

import EntryScreen from './src/screens/Entry/entryScreen';

console.ignoredYellowBox = ['Setting a timer'];

class App extends Component {
  render() {
    console.log('App')
    return (
      <NavigationContainer theme={theme}>
        <Provider store={store}>
          <EntryScreen />
        </Provider>
      </NavigationContainer>
    );
  }
}
export default App;
