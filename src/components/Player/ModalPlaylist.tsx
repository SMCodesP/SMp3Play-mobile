import React, {useContext, useRef} from 'react';
import {
  Animated,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';

import Swipeable from 'react-native-gesture-handler/Swipeable';

import {Modalize} from 'react-native-modalize';
import {ThemeContext} from 'styled-components/native';

import TrackPlayer from 'react-native-track-player';

import PlayerFull from '../PlayerFull';

import {
  TrackItem,
  SongName,
  TrackStatus,
  ContainerRemoveSong,
  DeleteText,
  TitleLoadingQueue,
} from './styles';
import {usePlayer} from '../../contexts/player';

interface RightActionsProps extends TouchableOpacityProps {
  dragX: any;
}

const RightActions: React.FC<RightActionsProps> = ({dragX, ...props}) => {
  const scale = dragX.interpolate({
    inputRange: [-100, 0],
    outputRange: [1, -50],
    extrapolate: 'clamp',
  });
  return (
    <TouchableOpacity activeOpacity={0.5} {...props}>
      <ContainerRemoveSong style={{transform: [{translateX: scale}]}}>
        <DeleteText>Remover</DeleteText>
      </ContainerRemoveSong>
    </TouchableOpacity>
  );
};

const Modal = ({modalizeRef}: {modalizeRef: React.MutableRefObject<null>}) => {
  const {track, playingPlaylist, queue, skipTo, updateQueue} = usePlayer();
  const theme = useContext(ThemeContext);

  const modalStyles: any = {
    modalStyle: {
      backgroundColor: theme.background,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      marginHorizontal: 10,
      display: 'flex',
      flexDirection: 'column',
    },
    handleStyle: {
      width: 75,
      height: 6,
      borderRadius: 6,
      marginBottom: 50,
      backgroundColor: theme.comment,
      display: 'flex',
      flexDirection: 'column',
    },
    childrenStyle: {
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
    },
  };

  const scrollY = useRef(new Animated.Value(0)).current;

  return playingPlaylist?.videos.length === queue.length ? (
    <Modalize
      ref={modalizeRef}
      snapPoint={530}
      HeaderComponent={<PlayerFull />}
      flatListProps={{
        data: playingPlaylist.videos,
        renderItem: ({item}) =>
          track?.id === item.uuid ? (
            <TrackItem active={true}>
              <SongName>{item.title}</SongName>
              <TrackStatus>tocando</TrackStatus>
            </TrackItem>
          ) : (
            <Swipeable
              renderRightActions={(_, dragX) => (
                <RightActions
                  onPress={async () => {
                    (modalizeRef.current as any).close();
                    await TrackPlayer.remove(item.uuid);
                    updateQueue();
                  }}
                  dragX={dragX}
                />
              )}>
              <TrackItem onPress={() => skipTo(item.uuid)} active={false}>
                <View accessible>
                  <SongName>{item.title}</SongName>
                </View>
              </TrackItem>
            </Swipeable>
          ),
        style: {
          backgroundColor: theme.background,
        },
        keyExtractor: (item) => item.uuid,
        showsVerticalScrollIndicator: false,
        onScroll: Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {
            useNativeDriver: true,
          },
        ),
        scrollEventThrottle: 5,
      }}
      {...modalStyles}
    />
  ) : (
    <Modalize ref={modalizeRef} snapPoint={530} {...modalStyles}>
      <PlayerFull />
      <TitleLoadingQueue>Carregando...</TitleLoadingQueue>
    </Modalize>
  );
};

export default Modal;
