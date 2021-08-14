import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Details from "../screens/details";
import { Search } from "../screens/search";
import { Home } from "../screens/home";
import { Downloads } from "../screens/downloads";
import { Playlists } from "../screens/playlists";
import { Settings } from "../screens/settings";
import { Playlist } from "../screens/playlist";

const Stack = createStackNavigator();

export const SearchStackRoutes = () => (
  <Stack.Navigator headerMode="none" initialRouteName="Main">
    <Stack.Screen name="Main" component={Search} />
    <Stack.Screen name="Details" component={Details} />
    <Stack.Screen name="Playlist" component={Playlist} />
  </Stack.Navigator>
);

export const HomeStackRoutes = () => (
  <Stack.Navigator headerMode="none" initialRouteName="Main">
    <Stack.Screen name="Main" component={Home} />
    <Stack.Screen name="Details" component={Details} />
    <Stack.Screen name="Playlist" component={Playlist} />
  </Stack.Navigator>
);

export const DownloadsStackRoutes = () => (
  <Stack.Navigator headerMode="none" initialRouteName="Main">
    <Stack.Screen name="Main" component={Downloads} />
    <Stack.Screen name="Details" component={Details} />
    <Stack.Screen name="Playlist" component={Playlist} />
  </Stack.Navigator>
);

export const PlaylistsStackRoutes = () => (
  <Stack.Navigator headerMode="none" initialRouteName="Main">
    <Stack.Screen name="Main" component={Playlists} />
    <Stack.Screen name="Details" component={Details} />
    <Stack.Screen name="Playlist" component={Playlist} />
  </Stack.Navigator>
);

export const SettingsStackRoutes = () => (
  <Stack.Navigator headerMode="none" initialRouteName="Main">
    <Stack.Screen name="Main" component={Settings} />
    <Stack.Screen name="Details" component={Details} />
    <Stack.Screen name="Playlist" component={Playlist} />
  </Stack.Navigator>
);
