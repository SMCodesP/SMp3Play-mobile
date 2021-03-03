import React from 'react';
import {TouchableOpacity} from 'react-native';

import VideoType from '../../interfaces/VideoType';

import {Container, VideoImage, Title} from './styles';

const Video: React.FC<{
  video: VideoType;
  navigation: any;
}> = ({video, navigation}) => {
  return (
    <TouchableOpacity
      style={{flex: 1}}
      onPress={() => {
        navigation.navigate('Details', {
          video,
        });
      }}>
      <Container>
        <VideoImage source={{uri: video.thumbnail}} />
        <Title>{video.title}</Title>
      </Container>
    </TouchableOpacity>
  );
};

export default Video;
