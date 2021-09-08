import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import {name as appName} from './app.json';
import TrackPlayer from 'react-native-track-player';

import App from './App';

TrackPlayer.registerPlaybackService(() => require('./service'));
AppRegistry.registerComponent(appName, () => App);
