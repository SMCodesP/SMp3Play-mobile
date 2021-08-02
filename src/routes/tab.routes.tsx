import React from "react";
import { createBottomTabNavigator, BottomTabBar } from "@react-navigation/bottom-tabs";

import { MaterialIcons } from "@expo/vector-icons";

import { BlurView } from '@react-native-community/blur'

import { HomeStackRoutes, SearchStackRoutes } from "./stack.routes";

import colors from "../styles/colors";
import BottomTab from "../components/BottomTab";
import { usePlayer } from "../contexts/player";

const AppTab = createBottomTabNavigator();

export const TabRoutes: React.FC = () => {
  const { track } = usePlayer();

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
      tabBar={(props) => <BottomTab bottomTabBarProps={props} />}
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
