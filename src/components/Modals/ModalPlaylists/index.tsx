import React, {useContext, useRef} from 'react';
import {Animated, View} from 'react-native';

import {Modalize} from 'react-native-modalize';
import {ThemeContext} from 'styled-components/native';

import {usePlayer} from '../../../contexts/player';

import {Title} from '../styles';

const Modal = ({modalizeRef}: {modalizeRef: React.MutableRefObject<null>}) => {
  const {queue} = usePlayer();
  const theme = useContext(ThemeContext);

  const scrollY = useRef(new Animated.Value(0)).current;

  return (
    <Modalize
      ref={modalizeRef}
      snapPoint={530}
      HeaderComponent={() => <Title>Suas playlists</Title>}
      flatListProps={{
        data: queue,
        renderItem: () => <View />,
        style: {
          backgroundColor: theme.background,
        },
        keyExtractor: (item) => item.id,
        showsVerticalScrollIndicator: false,
        onScroll: Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {
            useNativeDriver: true,
          },
        ),
        scrollEventThrottle: 5,
      }}
    />
  );
};

export default Modal;
