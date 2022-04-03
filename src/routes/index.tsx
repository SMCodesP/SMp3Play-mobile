import React from "react";

import { NavigationContainer, DefaultTheme } from "@react-navigation/native";

import { TabRoutes } from "./tab.routes";

import colors from "../styles/colors";

const MyTheme = {
  dark: true,
  colors: {
    background: "transparent",
    primary: "transparent",
    card: "transparent",
    text: "transparent",
    border: "transparent",
    notification: "transparent",
  },
};

export const Routes: React.FC = () => (
  <NavigationContainer theme={MyTheme}>
    <TabRoutes />
  </NavigationContainer>
);
