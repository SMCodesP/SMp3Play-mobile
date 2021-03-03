import React from 'react';
import {StatusBar} from 'react-native';
import TrackPlayer from 'react-native-track-player';
import {ThemeProvider} from 'styled-components';
import {PlayerProvider} from './contexts/player';

import Routes from './routes';

import themes from './themes';

const App = () => {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#1a1c24" />
      <ThemeProvider theme={themes['dark']}>
        <PlayerProvider>
          <Routes />
        </PlayerProvider>
      </ThemeProvider>
    </>
  );
};

export default App;

TrackPlayer.registerPlaybackService(() => require('./services/player.js'));
