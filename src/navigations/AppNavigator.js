import React, {Component} from 'react';
import {createAppContainer, createSwitchNavigator } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {Image, TouchableNativeFeedback, View} from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';

import SplashScreen from '../screens/SplashScreen';
import HomeScreen from '../screens/HomeScreen';
import OneExplain from '../screens/OneExplain';
import TenExplain from '../screens/TenExplain';
import MoreExplain from '../screens/MoreExplain';
import AddQuoteScreen from '../screens/AddQuoteScreen';
import AddTime from '../screens/AddTime';
import Description from '../screens/Description';
import DayTabs from '../screens/DayTabs';
import F8Touchable from '../utils/F8Touchable';

const LeftItem = ({navigation, hide}) => {
  return (
    <F8Touchable
      background={TouchableNativeFeedback.SelectableBackgroundBorderless()}
      onPress={() => {
        navigation.goBack();
      }}>
      <View style={[{marginLeft: 20}, hide && {opacity: 0}]}>
        <Image source={require('../assets/images/left-arrow.png')} />
      </View>
    </F8Touchable>
  );
};
const RightItem = ({navigation, route, hide}) => {
  return (
    <F8Touchable
      background={TouchableNativeFeedback.SelectableBackgroundBorderless()}
      onPress={() => {
        navigation.navigate(route);
      }}>
      <View style={[{marginRight: 20}, hide && {opacity: 0}]}>
        <Image source={require('../assets/images/right-arrow.png')} />
      </View>
    </F8Touchable>
  );
};

const Tabs = createMaterialTopTabNavigator({
  Day:{
    screen: DayTabs
  },
  Week:{
    screen: DayTabs
  },
  Month:{
    screen: DayTabs
  },
  Year:{
    screen: DayTabs
  }
})

const HomeNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: ({navigation}) => ({
        headerTitleStyle: {
          textAlign: 'center',
          flex: 1,
        },
        title: 'Home',
        headerLeft: <LeftItem navigation={navigation} hide={true}/>,
        headerRight: <RightItem navigation={navigation} route={'Explain1'} />,
      }),
    },
    Explain1: {
      screen: OneExplain,
      navigationOptions: ({navigation}) => ({
        headerTitleStyle: {
          textAlign: 'center',
          flex: 1,
        },
        title: '1',
        headerLeft: <LeftItem navigation={navigation} />,
        headerRight: <RightItem navigation={navigation} route={'Explain10'} />,
      }),
    },
    Explain10: {
      screen: TenExplain,
      navigationOptions: ({navigation}) => ({
        headerTitleStyle: {
          textAlign: 'center',
          flex: 1,
        },
        title: '10',
        headerLeft: <LeftItem navigation={navigation} />,
        headerRight: <RightItem navigation={navigation} route={'More'} />,
      }),
    },
    More: {
      screen: MoreExplain,
      navigationOptions: ({navigation}) => ({
        headerTitleStyle: {
          textAlign: 'center',
          flex: 1,
        },
        title: 'More Explain',
        headerLeft: <LeftItem navigation={navigation} />,
        headerRight: <RightItem navigation={navigation} route={'AddQuote'} />,
      }),
    },
    AddQuote: {
      screen: AddQuoteScreen,
      navigationOptions: ({navigation}) => ({
        headerTitleStyle: {
          textAlign: 'center',
          flex: 1,
        },
        title: 'Add Quote',
        headerLeft: <LeftItem navigation={navigation} />,
        headerRight: <RightItem navigation={navigation} route={'Tabs'} />,
      }),
    },
    AddTime: {
      screen: AddTime,
      navigationOptions: ({navigation}) => ({
        headerTitleStyle: {
          textAlign: 'center',
          flex: 1,
        },
        title: '',
        headerLeft: <LeftItem navigation={navigation} />,
        headerRight: <RightItem navigation={navigation} route={'AddTime'} hide={true}/>,
      }),
    },

    Description: {
      screen: Description,
      navigationOptions: ({navigation}) => ({
        headerTitleStyle: {
          textAlign: 'center',
          flex: 1,
        },
        title: 'Answer',
        headerLeft: <LeftItem navigation={navigation} />,
        headerRight: <RightItem navigation={navigation} route={'AddTime'}  hide={true}/>,
      }),
    },

    Tabs: Tabs,

  },
  {
    initialRouteName: 'Home',
  },
);

const MainNavigator = createSwitchNavigator({
  Splash: SplashScreen,
  App: HomeNavigator,
});

const AppNavigator = createAppContainer(MainNavigator);

export default AppNavigator;
