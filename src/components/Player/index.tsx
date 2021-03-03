import React, {useState, useEffect} from 'react';
// import { Container } from 'react-native';
import TrackPlayer from 'react-native-track-player';
import {View, TouchableOpacity} from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {
  Container,
  Artwork,
  Title,
  Authorname,
  ContainerOptions,
} from './styles';

const Player: React.FC = () => {
  const [track, setTrack] = useState<TrackPlayer.Track | null>(null);

  useEffect(() => {
    TrackPlayer.addEventListener('playback-track-changed', async (data) => {
      const gettingTrack = await TrackPlayer.getTrack(data.nextTrack);
      console.log(gettingTrack);
      setTrack(gettingTrack);
    });
  }, []);

  return !!track ? (
    <Container>
      <TouchableOpacity style={{alignSelf: 'center'}}>
        <Artwork source={{uri: track.artwork}} />
      </TouchableOpacity>
      <View style={{flex: 1}}>
        <Title>{track.title.substr(0, 15)}</Title>
        <Authorname>{track.artist}</Authorname>
        <ContainerOptions>
          <FontAwesome5 name="step-backward" color="#fafafa" size={20} />
          <FontAwesome5 name="play" color="#fafafa" size={20} />
          <FontAwesome5 name="step-forward" color="#fafafa" size={20} />
        </ContainerOptions>
      </View>
    </Container>
  ) : (
    <View />
  );
};

export default Player;
