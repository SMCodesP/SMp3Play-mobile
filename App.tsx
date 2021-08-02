import React from 'react';
import { View, StatusBar } from 'react-native'
import {
  useFonts,
  Jost_400Regular,
  Jost_600SemiBold,
  Jost_700Bold,
  Jost_900Black,

} from "@expo-google-fonts/jost";
import AppLoading from "expo-app-loading";
import TrackPlayer, {
  Capability,
  useTrackPlayerEvents,
  Event,
  Track
} from 'react-native-track-player';

import { Routes } from './src/routes';
import colors from './src/styles/colors';
import { PlayerProvider } from './src/contexts/player';

TrackPlayer.setupPlayer({ waitForBuffer: true }).then(async () => {
  console.log('player setup!');

  await TrackPlayer.updateOptions({
    stopWithApp: false,
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
    compactCapabilities: [
      Capability.Play,
      Capability.Pause,
      Capability.Stop,
    ],
  })
})

export default function App() {
  const [fontIsLoading] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold,
    Jost_700Bold,
    Jost_900Black,
  });

  if (!fontIsLoading) return <AppLoading />;

  return (
    <PlayerProvider>
      <View style={{
        backgroundColor: colors.background,
        flex: 1
      }}>
        <Routes />
        <StatusBar barStyle="light-content" backgroundColor={colors.background} />
      </View>
    </PlayerProvider>
  );
}
