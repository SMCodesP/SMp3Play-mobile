import {useNavigation} from '@react-navigation/native';
import React, {useContext, useEffect, useState} from 'react';
import {usePlayer} from '../../contexts/player';
import LinearGradient from 'react-native-linear-gradient';
import TrackPlayer, {
  usePlaybackState,
  useTrackPlayerProgress,
} from 'react-native-track-player';

import {ThemeContext} from 'styled-components';

import {
  Container,
  Artwork,
  Controller,
  ContainerAuthor,
  Authorname,
  Title,
} from './styles';
import TrackStatus from '../TrackStatus';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {StyleProp, TouchableOpacity, ViewStyle} from 'react-native';

const PlayerFull: React.FC<{
  style: StyleProp<ViewStyle>;
}> = ({style}) => {
  const theme = useContext(ThemeContext);
  const playbackState = usePlaybackState();
  const {track} = usePlayer();
  const navigation = useNavigation();

  const {position, duration} = useTrackPlayerProgress();
  const [positionDisplay, setPositionDisplay] = useState(position);

  useEffect(() => {
    setPositionDisplay(position);
  }, [position]);

  useEffect(() => {
    if (!track) {
      navigation.goBack();
    }
  }, [track, navigation]);

  return (
    <Container style={style}>
      <LinearGradient
        colors={[theme.secundary, theme.background]}
        style={{flex: 1}}>
        <Artwork
          style={{
            shadowOpacity: 0.75,
            shadowRadius: 5,
            shadowColor: 'red',
            shadowOffset: {height: 0, width: 0},
          }}
          source={{uri: track?.artwork}}
          resizeMode="contain"
        />
        <ContainerAuthor>
          <Authorname>{track?.artist}</Authorname>
          <Title>{track?.title}</Title>
        </ContainerAuthor>
        <TrackStatus
          positionDisplay={positionDisplay}
          duration={duration}
          position={position}
          setPositionDisplay={setPositionDisplay}
        />
        <Controller>
          <TouchableOpacity
            onPress={async () => {
              setPositionDisplay(position - 10);
              await TrackPlayer.seekTo(position - 10);
            }}>
            <MaterialIcons name="replay-10" color="#fafafa" size={30} />
          </TouchableOpacity>
          <TouchableOpacity onPress={skipToPrevious}>
            <FontAwesome5 name="step-backward" color="#fafafa" size={36} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={async () => {
              playbackState === TrackPlayer.STATE_PAUSED
                ? await TrackPlayer.play()
                : await TrackPlayer.pause();
            }}>
            <FontAwesome5
              name={
                playbackState === TrackPlayer.STATE_PAUSED
                  ? 'play-circle'
                  : 'pause-circle'
              }
              color="#fafafa"
              size={50}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={skipToNext}>
            <FontAwesome5 name="step-forward" color="#fafafa" size={36} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={async () => {
              setPositionDisplay(position + 10);
              await TrackPlayer.seekTo(position + 10);
            }}>
            <MaterialIcons name="forward-10" color="#fafafa" size={30} />
          </TouchableOpacity>
        </Controller>
      </LinearGradient>
    </Container>
  );
};

async function skipToNext() {
  try {
    await TrackPlayer.skipToNext();
  } catch (_) {}
}

async function skipToPrevious() {
  try {
    await TrackPlayer.skipToPrevious();
  } catch (_) {}
}

export default PlayerFull;
