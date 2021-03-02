import 'react-native-gesture-handler';

import React, {useContext} from 'react';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {ThemeContext} from 'styled-components';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Home from '../screens/Home';
import {Text, View} from 'react-native';

const Tab = createBottomTabNavigator();

const Search = () => {
  return (
    <View>
      <Text>Testando</Text>
    </View>
  );
};

const Routes: React.FC = () => {
  const {fifthText, secundary, secundaryBackground} = useContext(ThemeContext);

  return (
    <NavigationContainer
      theme={{
        dark: true,
        colors: {
          background: secundaryBackground,
          border: fifthText,
          text: secundary,
          card: secundaryBackground,
          notification: fifthText,
          primary: fifthText,
        },
      }}>
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
              <MaterialCommunityIcons
                name={iconName}
                size={size}
                color={color}
              />
            );
          },
        })}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Buscar" component={Search} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
