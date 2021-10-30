import React, { useEffect } from "react";
import { SafeAreaView, View, StatusBar, LogBox } from "react-native";
// import {
//   useFonts,
//   Jost_400Regular,
//   Jost_600SemiBold,
//   Jost_700Bold,
//   Jost_900Black,
// } from "@expo-google-fonts/jost";
// import AppLoading from "expo-app-loading";
import TrackPlayer, { Capability } from "react-native-track-player";
import SystemNavigationBar from 'react-native-system-navigation-bar';
import BackgroundColor from 'react-native-background-color'

import { Routes } from "./src/routes";
import colors from "./src/styles/colors";
import { PlayerProvider } from "./src/contexts/player";
import { PlaylistProvider } from "./src/contexts/playlist";
import { DownloadsProvider } from "./src/contexts/downloads";
import { GestureHandlerRootView } from "react-native-gesture-handler";

SystemNavigationBar.setNavigationColor(colors.background, true)
BackgroundColor.setColor(colors.background)

TrackPlayer.setupPlayer({ waitForBuffer: true }).then(async () => {
  console.log("player setup!");

  await TrackPlayer.updateOptions({
    notificationCapabilities: [
      Capability.Play,
      Capability.Pause,
      Capability.SkipToNext,
      Capability.SkipToPrevious,
      Capability.Stop,
    ],
    capabilities: [
      Capability.Play,
      Capability.Pause,
      Capability.SkipToNext,
      Capability.SkipToPrevious,
      Capability.Stop,
    ],
    compactCapabilities: [Capability.Play, Capability.Pause, Capability.Stop],
  });
});

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PlayerProvider>
        <PlaylistProvider>
          <DownloadsProvider>
            <View
              style={{
                backgroundColor: colors.background,
                flex: 1,
              }}
            >
              <Routes />
              <StatusBar
                barStyle="light-content"
                backgroundColor={colors.background}
              />
            </View>
          </DownloadsProvider>
        </PlaylistProvider>
      </PlayerProvider>
    </GestureHandlerRootView>
  );
}
