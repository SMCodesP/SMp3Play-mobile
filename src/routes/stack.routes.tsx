import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Details from "../screens/details";
import { Search } from '../screens/search';
import { Home } from '../screens/home';

const Stack = createStackNavigator();

export const SearchStackRoutes = () => (
  <Stack.Navigator headerMode="none" initialRouteName="Main">
    <Stack.Screen name="Main" component={Search} />
    <Stack.Screen name="Details" component={Details} />
  </Stack.Navigator>
);

export const HomeStackRoutes = () => (
  <Stack.Navigator headerMode="none" initialRouteName="Main">
    <Stack.Screen name="Main" component={Home} />
    <Stack.Screen name="Details" component={Details} />
  </Stack.Navigator>
);
