import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet } from 'react-native';

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import {
  HomeStackRoutes,
  SearchStackRoutes,
  DownloadsStackRoutes,
  PlaylistsStackRoutes,
  SettingsStackRoutes,
} from "./stack.routes";

import colors from "../styles/colors";
import BottomTab from "../components/BottomTab";
import { usePlayer } from "../contexts/player";
import IconAnimated from "../components/IconAnimated";

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
        tabStyle: {
          height: 45,
          backgroundColor: 'transparent',
        },
        style: {
          height: 45,
          backgroundColor: "transparent",
          borderTopWidth: 0,
          elevation: 0,
        },
      }}
      tabBar={(props) => <BottomTab bottomTabBarProps={props} />}
      initialRouteName="Home"
    >
      <AppTab.Screen
        name="Downloads"
        component={DownloadsStackRoutes}
        options={{
          tabBarIcon: ({ size }) => (
            <IconAnimated
              IconProvider={Ionicons}
              iconName="ios-download"
              alternativeIconName="ios-download-outline"
              size={size}
            />
          ),
        }}
      />
      <AppTab.Screen
        name="Playlists"
        component={PlaylistsStackRoutes}
        options={{
          tabBarIcon: ({ size }) => (
            <IconAnimated
              IconProvider={MaterialCommunityIcons}
              iconName="folder-music"
              alternativeIconName="folder-music-outline"
              size={size}
            />
          ),
        }}
      />
      <AppTab.Screen
        name="Home"
        component={HomeStackRoutes}
        options={{
          tabBarIcon: ({ size }) => (
            <IconAnimated
              IconProvider={Ionicons}
              iconName="ios-home"
              alternativeIconName="ios-home-outline"
              size={size}
            />
          ),
        }}
      />
      <AppTab.Screen
        name="Search"
        component={SearchStackRoutes}
        options={{
          tabBarIcon: ({ size }) => (
            <IconAnimated
              IconProvider={MaterialIcons}
              iconName="search"
              size={size}
            />
          ),
        }}
      />
      <AppTab.Screen
        name="Settings"
        component={SettingsStackRoutes}
        options={{
          tabBarIcon: ({ size }) => (
            <IconAnimated
              IconProvider={Ionicons}
              iconName="ios-settings"
              alternativeIconName="ios-settings-outline"
              size={size}
            />
          ),
        }}
      />
    </AppTab.Navigator>
  );
};