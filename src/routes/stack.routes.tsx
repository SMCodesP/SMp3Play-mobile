import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Details from "../screens/details";
import { Search } from "../screens/search";
import { Home } from "../screens/home";
import { Downloads } from "../screens/downloads";
import { Playlists } from "../screens/playlists";
import { Settings } from "../screens/settings";
import { Playlist } from "../screens/playlist";
import { SearchAddPlaylist } from "../screens/searchAddPlaylist";
import Creator from "../screens/creator";

const Stack = createStackNavigator();

export const SearchStackRoutes = () => (
  <Stack.Navigator headerMode="none" initialRouteName="MainSearch">
    <Stack.Screen name="MainSearch" component={Search} initialParams={{ initialQuery: "" }} />
    <Stack.Screen name="Details" component={Details} />
    <Stack.Screen name="Playlist" component={Playlist} />
  </Stack.Navigator>
);

export const HomeStackRoutes = () => (
  <Stack.Navigator headerMode="none" initialRouteName="MainHome">
    <Stack.Screen name="MainHome" component={Home} />
    <Stack.Screen name="Details" component={Details} />
    <Stack.Screen name="Creator" component={Creator} />
    <Stack.Screen name="Playlist" component={Playlist} />
  </Stack.Navigator>
);

export const DownloadsStackRoutes = () => (
  <Stack.Navigator headerMode="none" initialRouteName="MainDownloads">
    <Stack.Screen name="MainDownloads" component={Downloads} />
    <Stack.Screen name="Details" component={Details} />
    <Stack.Screen name="Playlist" component={Playlist} />
  </Stack.Navigator>
);

export const PlaylistsStackRoutes = () => (
  <Stack.Navigator headerMode="none" initialRouteName="MainPlaylists">
    <Stack.Screen name="MainPlaylists" component={Playlists} />
    <Stack.Screen name="Details" component={Details} />
    <Stack.Screen name="Playlist" component={Playlist} />
    <Stack.Screen name="SearchAddPlaylist" component={SearchAddPlaylist} />
  </Stack.Navigator>
);

export const SettingsStackRoutes = () => (
  <Stack.Navigator headerMode="none" initialRouteName="MainSettings">
    <Stack.Screen name="MainSettings" component={Settings} />
    <Stack.Screen name="Details" component={Details} />
    <Stack.Screen name="Playlist" component={Playlist} />
  </Stack.Navigator>
);
