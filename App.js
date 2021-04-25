import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import SignupLogin from './screens/signUpLoginScreen';
import ExchangeScreen from "./screens/ExchangeScreen";
import HomeScreen from "./screens/HomeScreen";
import {AppTabNavigator} from "./components/AppTabNavigator";
import {createAppContainer,createSwitchNavigator} from "react-navigation";
import { createBottomTabNavigator } from 'react-navigation-tabs';
import SettingScreen from "./screens/SettingsScreen"
import {createDrawerNavigator} from 'react-navigation-drawer';
import {Icon} from "react-native-elements";
import CustomSideBarMenu from "./components/CustomSideBarMenu";

export default class App extends React.Component{
  render(){
  return (
     <AppContainer/>
  );
  }
}



const TabNavigator = createBottomTabNavigator({
  HomeScreen:{screen:HomeScreen},
  ExchangeScreen:{screen:ExchangeScreen}
})


 const AppDrawerNavigator = createDrawerNavigator({
  Home : {
    screen : TabNavigator,
    navigationOptions: {
      drawerIcon: <Icon name = "Home" type="fontawesome5"/>
    }
    },
  Setting : {
    screen : SettingScreen,
    drawerIcon: <Icon name = "settings" type = "font-awesome"/>,
    drawerLabel: "Settings"
  }
},
  {
    contentComponent:CustomSideBarMenu
  },
  {
    initialRouteName : 'Home'
  })

const SwitchNavigator = createSwitchNavigator({
  SignupLogin:{screen:SignupLogin},
  AppTabNavigator:{screen:TabNavigator},
  CustomSideBarMenu:{screen:CustomSideBarMenu},
});

const AppContainer = createAppContainer(SwitchNavigator);
