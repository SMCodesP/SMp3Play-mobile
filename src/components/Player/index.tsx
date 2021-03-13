import React, {useRef, useState, memo} from 'react';
import TrackPlayer, {
  usePlaybackState,
  useTrackPlayerProgress,
} from 'react-native-track-player';
import {
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Modalize} from 'react-native-modalize';

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
import PlayerFull from '../PlayerFull';

function ProgressBar() {
  const progress = useTrackPlayerProgress();

  return (
    <ProgessContainer>
      <ProgessSneek style={{flex: progress.position}} />
      <ProgessBackground
        style={{
          flex: progress.duration - progress.position,
        }}
      />
    </ProgessContainer>
  );
}

const {height: initialHeight} = Dimensions.get('window');

const Player: React.FC = () => {
  const playbackState = usePlaybackState();
  const {track} = usePlayer();
  const modalizeRef = useRef(null);
  const [height, setHeight] = useState(initialHeight);

  console.log(initialHeight / 1.63);

  const onOpen = () => {
    modalizeRef.current?.open();
  };

  const handleLayout = ({layout}) => {
    setHeight(layout.height);
  };

  return !!track ? (
    <>
      <ProgressBar />
      <TouchableWithoutFeedback onPress={onOpen}>
        <Container>
          <Artwork
            style={{alignSelf: 'center'}}
            source={{uri: track.artwork}}
          />
          <View style={{flex: 1}}>
            <Title>{track.title.substr(0, 15)}</Title>
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
                  playbackState === TrackPlayer.STATE_PAUSED
                    ? await TrackPlayer.play()
                    : await TrackPlayer.pause();
                }}>
                <FontAwesome5
                  style={{padding: 5}}
                  name={
                    playbackState === TrackPlayer.STATE_PAUSED
                      ? 'play'
                      : 'pause'
                  }
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

      <Modalize
        ref={modalizeRef}
        snapPoint={initialHeight > 530 ? 530 : initialHeight}
        onLayout={handleLayout}>
        <PlayerFull style={{height}} />
      </Modalize>
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

export default memo(Player);
