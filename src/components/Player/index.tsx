import React, {useRef} from 'react';
import TrackPlayer, {usePlaybackState, State} from 'react-native-track-player';
import {View, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Portal} from 'react-native-portalize';

import {
  Container,
  Artwork,
  Title,
  Authorname,
  ContainerOptions,
  ProgessContainer,
  ProgessBackground,
  ProgessSneek,
} from './styles';
import {usePlayer} from '../../contexts/player';

import Modal from './Modal';
import ModalPlaylist from './ModalPlaylist';

function ProgressBar() {
  const {position, duration} = usePlayer();

  return (
    <ProgessContainer>
      <ProgessSneek style={{flex: position}} />
      <ProgessBackground
        style={{
          flex: duration - position,
        }}
      />
    </ProgessContainer>
  );
}

const Player: React.FC = () => {
  const playbackState = usePlaybackState();
  const {track, playingPlaylist, previousSong, nextSong} = usePlayer();

  const modalizeRef = useRef(null);

  const onOpen = () => {
    (modalizeRef.current as any).open();
  };

  return track ? (
    <>
      <ProgressBar />
      <TouchableWithoutFeedback onPress={onOpen}>
        <Container>
          <Artwork
            style={{alignSelf: 'center'}}
            source={{uri: String(track.artwork || '')}}
          />
          <View style={{flex: 1}}>
            <Title>{track.title?.substr(0, 20) || ''}</Title>
            <Authorname>{track.artist}</Authorname>
            <ContainerOptions>
              <TouchableOpacity onPressOut={previousSong}>
                <FontAwesome5 name="step-backward" color="#fafafa" size={20} />
              </TouchableOpacity>
              <TouchableOpacity
                onPressOut={
                  playbackState === State.Paused
                    ? TrackPlayer.play
                    : TrackPlayer.pause
                }>
                <FontAwesome5
                  name={playbackState === State.Paused ? 'play' : 'pause'}
                  color="#fafafa"
                  size={20}
                />
              </TouchableOpacity>
              <TouchableOpacity onPressOut={nextSong}>
                <FontAwesome5 name="step-forward" color="#fafafa" size={20} />
              </TouchableOpacity>
            </ContainerOptions>
          </View>
        </Container>
      </TouchableWithoutFeedback>

      <Portal>
        {playingPlaylist ? (
          <ModalPlaylist modalizeRef={modalizeRef} />
        ) : (
          <Modal modalizeRef={modalizeRef} />
        )}
      </Portal>
    </>
  ) : (
    <View />
  );
};

export default Player;
