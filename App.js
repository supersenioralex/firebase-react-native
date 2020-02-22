import React, {Component} from 'react';

import AppNavigator from './src/navigations/AppNavigator';
import {mapping, light as lightTheme} from '@eva-design/eva';
import {ApplicationProvider} from 'react-native-ui-kitten';

export default class App extends Component {
  render() {
    console.disableYellowBox = true;
    return (
      <ApplicationProvider mapping={mapping} theme={lightTheme}>
        <AppNavigator />
      </ApplicationProvider>
    );
  }
}
