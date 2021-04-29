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
import Playlist from '../screens/Playlist';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

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
      <Tab.Screen name="Buscar" component={Search} />
    </Tab.Navigator>
  );
}

function BaseStack() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Base" component={Base} />
      <Stack.Screen name="Details" component={Details} />
      <Stack.Screen name="Playlist" component={Playlist} />
    </Stack.Navigator>
  );
}

const Routes: React.FC = () => {
  const theme = useContext(ThemeContext);

  return (
    <NavigationContainer
      theme={{
        dark: true,
        colors: {
          background: theme.comment,
          border: theme.pink,
          text: theme.text,
          card: theme.comment,
          notification: theme.red,
          primary: theme.purple,
        },
      }}>
      <BaseStack />
    </NavigationContainer>
  );
};

export default Routes;
