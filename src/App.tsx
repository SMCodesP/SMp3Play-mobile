import React from 'react';
import {StatusBar} from 'react-native';

import {ThemeProvider} from 'styled-components';

import Routes from './routes';

import themes from './themes';

const App = () => {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#1a1c24" />
      <ThemeProvider theme={themes['dark']}>
        <Routes />
      </ThemeProvider>
    </>
  );
};

export default App;
