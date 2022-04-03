import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import TrackPlayer, { Capability, Event } from 'react-native-track-player';

import App from './App';

AppRegistry.registerComponent(appName, () => App);

TrackPlayer.setupPlayer().then(async () => {
  TrackPlayer.registerPlaybackService(() => require('./service'));
  await TrackPlayer.updateOptions({
    stopWithApp: true,
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
