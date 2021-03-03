import React from 'react';
import {View} from 'react-native';
import Player from '../Player';

import {Container} from './styles';

const GlobalContainer: React.FC = ({children}) => {
  return (
    <Container>
      <View
        style={{
          flex: 1,
        }}>
        {children}
      </View>
      <Player />
    </Container>
  );
};

export default GlobalContainer;
