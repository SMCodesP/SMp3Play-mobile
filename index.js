import React from 'react';
import 'react-native-gesture-handler';
import TrackPlayer from 'react-native-track-player';

import App from './App';
import { AppRegistry } from 'react-native';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately

TrackPlayer.registerPlaybackService(() => require('./service'));
AppRegistry.registerComponent('main',() => App);
