import 'react-native-gesture-handler';

import React, {useContext} from 'react';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {ThemeContext} from 'styled-components';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import Home from '../screens/Home';
import Search from '../screens/Search';
import Details from '../screens/Details';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function SearchStack() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Buscar" component={Search} />
      <Stack.Screen name="Details" component={Details} />
    </Stack.Navigator>
  );
}

function Base() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName = 'home';

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Buscar') {
            iconName = 'magnify';
          }

          return (
            <MaterialCommunityIcons name={iconName} size={size} color={color} />
          );
        },
      })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Buscar" component={SearchStack} />
    </Tab.Navigator>
  );
}

const Routes: React.FC = () => {
  const {fifthText, text, secundaryBackground} = useContext(ThemeContext);

  return (
    <NavigationContainer
      theme={{
        dark: true,
        colors: {
          background: secundaryBackground,
          border: fifthText,
          text: text,
          card: secundaryBackground,
          notification: fifthText,
          primary: fifthText,
        },
      }}>
      <Base />
    </NavigationContainer>
  );
};

export default Routes;
