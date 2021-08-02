import React from 'react';
import {View} from 'react-native';
import { usePlayer } from '../../contexts/player';

import colors from '../../styles/colors'

const GlobalContainer: React.FC = ({children}) => {
  const {track} = usePlayer()

  return (
    <View style={{
      flex: 1,
      backgroundColor: colors.background,
      // marginBottom: track ? 110 : 45
    }}>
      {children}
    </View>
  );
};

export default GlobalContainer;