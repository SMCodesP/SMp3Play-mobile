import React from "react";
import { createBottomTabNavigator, BottomTabBar } from "@react-navigation/bottom-tabs";

import { MaterialIcons } from "@expo/vector-icons";

import { BlurView } from 'expo-blur'

import {Home} from '../screens/home'
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
          height: 50,
          backgroundColor: 'transparent',          
          borderTopWidth: 0,
        },
      }}
      tabBar={(props) => (
        <BlurView
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
          }}
          tint="dark"
          intensity={80}
        >
          <BottomTabBar {...props} />
        </BlurView>
      )}
    >
      <AppTab.Screen
        name="Início"
        component={Home}
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
        component={Home}
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
