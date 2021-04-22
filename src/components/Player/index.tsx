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
  const {track} = usePlayer();

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
              <TouchableOpacity onPress={skipToPrevious}>
                <FontAwesome5
                  style={{padding: 5}}
                  name="step-backward"
                  color="#fafafa"
                  size={20}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={async () => {
                  playbackState === State.Paused
                    ? await TrackPlayer.play()
                    : await TrackPlayer.pause();
                }}>
                <FontAwesome5
                  style={{padding: 5}}
                  name={playbackState === State.Paused ? 'play' : 'pause'}
                  color="#fafafa"
                  size={20}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={skipToNext}>
                <FontAwesome5
                  style={{padding: 5}}
                  name="step-forward"
                  color="#fafafa"
                  size={20}
                />
              </TouchableOpacity>
            </ContainerOptions>
          </View>
        </Container>
      </TouchableWithoutFeedback>

      <Portal>
        <Modal modalizeRef={modalizeRef} />
      </Portal>
    </>
  ) : (
    <View />
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

export default Player;
