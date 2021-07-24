import React from "react";

import { NavigationContainer } from "@react-navigation/native";

import { TabRoutes } from "./tab.routes";

export const Routes: React.FC = () => (
  <NavigationContainer>
    <TabRoutes />
  </NavigationContainer>
);