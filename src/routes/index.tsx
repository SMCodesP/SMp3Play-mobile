import React from "react";

import { NavigationContainer, DefaultTheme } from '@react-navigation/native';

import { TabRoutes } from "./tab.routes";

import colors from '../styles/colors';

const MyTheme = {
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background,
    primary: colors.background,
  },
};

export const Routes: React.FC = () => (
  <NavigationContainer theme={MyTheme}>
    <TabRoutes />
  </NavigationContainer>
);