import React, {useContext, useRef} from 'react';
import {Animated, TouchableOpacity} from 'react-native';

import {Modalize} from 'react-native-modalize';
import {ThemeContext} from 'styled-components/native';

import TrackPlayer from 'react-native-track-player';

import PlayerFull from '../PlayerFull';

import {TrackItem, SongName, TrackStatus} from './styles';
import {usePlayer} from '../../contexts/player';

const Modal = ({modalizeRef}: {modalizeRef: React.MutableRefObject<null>}) => {
  const {track, queue} = usePlayer();
  const theme = useContext(ThemeContext);

  const scrollY = useRef(new Animated.Value(0)).current;

  return (
    <Modalize
      ref={modalizeRef}
      snapPoint={530}
      HeaderComponent={<PlayerFull />}
      flatListProps={{
        data: queue,
        renderItem: ({item}) =>
          track?.id === item.id ? (
            <TrackItem active={true}>
              <SongName>{item.title}</SongName>
              <TrackStatus>tocando</TrackStatus>
            </TrackItem>
          ) : (
            <TouchableOpacity onPress={() => TrackPlayer.skip(item.id)}>
              <TrackItem active={false}>
                <SongName>{item.title}</SongName>
              </TrackItem>
            </TouchableOpacity>
          ),
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
