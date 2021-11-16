import React, { memo } from "react";
import { View } from "react-native";
import { AboutCreator } from "./about";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();
// <AboutCreator creator={creator} />
const CreatorRoutes: React.FC<{
  creator: TCreator;
}> = ({ creator }) => {
  // console.log(creator)
  return (
    <Tab.Navigator>
      <Tab.Screen name="Description1" component={AboutCreator} />
      <Tab.Screen name="Description2" component={AboutCreator} />
    </Tab.Navigator>
  );
};

export default memo(CreatorRoutes);
