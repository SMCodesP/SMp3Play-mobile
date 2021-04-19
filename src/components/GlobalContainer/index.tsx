import React from 'react';
import {View} from 'react-native';
import {Host} from 'react-native-portalize';

import Player from '../Player';

import {Container} from './styles';

const GlobalContainer: React.FC = ({children}) => {
  return (
    <Host>
      <Container>
        <View
          style={{
            flex: 1,
          }}>
          {children}
        </View>
        <Player />
      </Container>
    </Host>
  );
};

export default GlobalContainer;
