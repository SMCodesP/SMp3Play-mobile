import {useNavigation} from '@react-navigation/native';
import React, {useContext, useEffect} from 'react';
import {usePlayer} from '../../contexts/player';
import LinearGradient from 'react-native-linear-gradient';
import TrackPlayer, {usePlaybackState, State} from 'react-native-track-player';

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
import {TouchableOpacity} from 'react-native';

const PlayerFull: React.FunctionComponent = () => {
  const theme = useContext(ThemeContext);
  const playbackState = usePlaybackState();
  const {track, position, duration, nextSong, previousSong} = usePlayer();
  const navigation = useNavigation();

  useEffect(() => {
    if (!track) {
      navigation.goBack();
    }
  }, [track, navigation]);

  return (
    <Container>
      <LinearGradient
        colors={[theme.currentLine, theme.background]}
        style={{flex: 1, borderTopLeftRadius: 20, borderTopRightRadius: 20}}>
        <Artwork
          source={{uri: String(track?.artwork || '') || ''}}
          resizeMode="contain"
        />
        <ContainerAuthor>
          <Authorname>{track?.artist}</Authorname>
          <Title>{track?.title}</Title>
        </ContainerAuthor>
        <TrackStatus
          positionDisplay={position}
          duration={duration}
          position={position}
          setPositionDisplay={(int: number) => TrackPlayer.seekTo(int)}
        />
        <Controller>
          <TouchableOpacity
            onPressOut={() => TrackPlayer.seekTo(position - 10)}>
            <MaterialIcons name="replay-10" color="#fafafa" size={30} />
          </TouchableOpacity>
          <TouchableOpacity onPressOut={previousSong}>
            <FontAwesome5 name="step-backward" color="#fafafa" size={36} />
          </TouchableOpacity>
          <TouchableOpacity
            onPressOut={
              playbackState === State.Paused
                ? TrackPlayer.play
                : TrackPlayer.pause
            }>
            <FontAwesome5
              name={
                playbackState === State.Paused ? 'play-circle' : 'pause-circle'
              }
              color="#fafafa"
              size={50}
            />
          </TouchableOpacity>
          <TouchableOpacity onPressOut={nextSong}>
            <FontAwesome5 name="step-forward" color="#fafafa" size={36} />
          </TouchableOpacity>
          <TouchableOpacity
            onPressOut={() => TrackPlayer.seekTo(position + 10)}>
            <MaterialIcons name="forward-10" color="#fafafa" size={30} />
          </TouchableOpacity>
        </Controller>
      </LinearGradient>
    </Container>
  );
};

export default PlayerFull;
