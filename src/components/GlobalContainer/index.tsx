import React from 'react';
import {View} from 'react-native';
import { usePlayer } from '../../contexts/player';

import colors from '../../styles/colors'
import { MiniPlayer } from '../MiniPlayer';

const GlobalContainer: React.FC = ({children}) => {
  const {track} = usePlayer()

  return (
    <View style={{
      flex: 1,
      backgroundColor: colors.background,
      paddingBottom: track ? 65 : 0,
    }}>
      {children}
      <MiniPlayer />
    </View>
  );
};

export default GlobalContainer;