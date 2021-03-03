import React, {useContext} from 'react';
import VideoType from '../../interfaces/VideoType';

import {TouchableOpacity, ImageBackground, Text, Linking} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ThemeContext} from 'styled-components';
import {
  ContainerImage,
  ContainerHeader,
  Title,
  ContainerAuthor,
  AuthorName,
  YTButton,
  ContainerBody,
} from './styles';
import {usePlayer} from '../../contexts/player';
import GlobalContainer from '../../components/GlobalContainer';

const Details: React.FC<{
  route: {
    params: {
      video: VideoType;
    };
  };
  navigation: any;
}> = ({
  route: {
    params: {video},
  },
  navigation,
}) => {
  const theme = useContext(ThemeContext);
  const {play} = usePlayer();

  return (
    <GlobalContainer>
      <ImageBackground
        source={{uri: video.image}}
        style={{flex: 1, height: 230}}>
        <ContainerImage>
          <ContainerHeader>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <MaterialCommunityIcons
                name="arrow-left"
                size={28}
                color={theme.text}
              />
            </TouchableOpacity>
            <Title>{video.title.substr(0, 26).trim()}...</Title>
          </ContainerHeader>
          <ContainerAuthor>
            <AuthorName>{video.author.name}</AuthorName>
            <TouchableOpacity
              style={{
                top: 28,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => play(video)}>
              {/* <Play> */}
              <MaterialCommunityIcons
                name="play-circle"
                size={56}
                color={theme.primary}
              />
              {/* </Play> */}
            </TouchableOpacity>
          </ContainerAuthor>
        </ContainerImage>
        <ContainerBody>
          <TouchableOpacity
            style={{
              width: '65%',
            }}
            onPress={() => {
              Linking.openURL(`vnd.youtube://video/${video.videoId}`);
            }}>
            <YTButton>
              <Text
                style={{
                  color: '#ffffff',
                  fontWeight: 'bold',
                  fontSize: 16,
                }}>
                Assistir no YouTube
              </Text>
            </YTButton>
          </TouchableOpacity>
        </ContainerBody>
      </ImageBackground>
    </GlobalContainer>
  );
};

export default Details;
