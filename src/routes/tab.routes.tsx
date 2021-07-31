import React from "react";
import { createBottomTabNavigator, BottomTabBar } from "@react-navigation/bottom-tabs";

import { MaterialIcons } from "@expo/vector-icons";

import { BlurView } from '@react-native-community/blur'

import { HomeStackRoutes, SearchStackRoutes } from "./stack.routes";

import colors from "../styles/colors";

const AppTab = createBottomTabNavigator();

export const TabRoutes: React.FC = () => {
  return (
    <AppTab.Navigator
      tabBarOptions={{
        activeTintColor: colors.pink,
        inactiveTintColor: colors.comment,
        labelPosition: "below-icon",
        showLabel: false,
        style: {
          height: 45,
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          elevation: 0,
        }
      }}
      tabBar={(props) => {
        return (
        <BlurView
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
          }}
          blurType="dark"
          blurAmount={8}
          blurRadius={20}
          overlayColor="transparent"
        >
          <BottomTabBar {...props} />
        </BlurView>
      )}}
    >
      <AppTab.Screen
        name="Início"
        component={HomeStackRoutes}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons
              name="home"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <AppTab.Screen
        name="Pesquisar"
        component={SearchStackRoutes}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons
              name="search"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </AppTab.Navigator>
  );
};
