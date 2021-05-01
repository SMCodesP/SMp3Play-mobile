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
  const {track, queue, updateQueue} = usePlayer();
  const theme = useContext(ThemeContext);

  const scrollY = useRef(new Animated.Value(0)).current;

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

  return (
    <Modalize
      ref={modalizeRef}
      snapPoint={530}
      HeaderComponent={<PlayerFull />}
      {...modalStyles}
      flatListProps={{
        data: queue,
        renderItem: ({item}) =>
          track?.id === item.id ? (
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
                    await TrackPlayer.remove(item.id);
                    updateQueue();
                  }}
                  dragX={dragX}
                />
              )}>
              <TrackItem
                onPress={() => TrackPlayer.skip(item.id)}
                active={false}>
                <View accessible>
                  <SongName>{item.title}</SongName>
                </View>
              </TrackItem>
            </Swipeable>
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
