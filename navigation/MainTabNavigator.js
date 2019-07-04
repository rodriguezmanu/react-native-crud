import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import TabBarIcon from '../components/TabBarIcon/TabBarIcon';
import HomeScreen from '../screens/Home/HomeScreen';
import colors from '../constants/Colors';
import UserScreen from '../screens/Users/UserScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: colors.tintColor,
      },
      headerTintColor: colors.noticeText,
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 20,
      },
    },
  },
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    User: UserScreen,
  },
  config
);

HomeStack.navigationOptions = {
  tabBarOptions: {
    showLabel: false,
    style: {
      backgroundColor: colors.tintColor,
    },
  },
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="person" />,
};

HomeStack.path = '';

const tabNavigator = createBottomTabNavigator({
  HomeStack,
});

tabNavigator.path = '';

export default tabNavigator;
