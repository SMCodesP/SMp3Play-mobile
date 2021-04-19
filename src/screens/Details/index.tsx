import React, {useContext} from 'react';
import VideoType from '../../interfaces/VideoType';

import {TouchableOpacity, ImageBackground, Text} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {ThemeContext} from 'styled-components';
import TrackPlayer from 'react-native-track-player';

import {
  ContainerImage,
  ContainerHeader,
  Title,
  ContainerAuthor,
  AuthorName,
  ButtonAdd,
  ContainerBody,
  ContainerButton,
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

  const handlePlay = () => {
    TrackPlayer.destroy();
    play(video);
  };

  return (
    <GlobalContainer>
      <ImageBackground
        source={{uri: video.image}}
        style={{flex: 1, height: 300}}>
        <ContainerImage>
          <ContainerHeader>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <MaterialCommunityIcons
                name="arrow-left"
                size={28}
                color={theme.foreground}
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
              onPress={handlePlay}>
              <MaterialCommunityIcons
                name="play-circle"
                size={56}
                color={theme.pink}
              />
            </TouchableOpacity>
          </ContainerAuthor>
        </ContainerImage>
        <ContainerBody>
          <ButtonAdd onPress={() => play(video)}>
            <ContainerButton accessible>
              <MaterialIcons name="add" size={32} color={theme.foreground} />
              <Text
                style={{
                  color: theme.foreground,
                  fontWeight: 'bold',
                  fontSize: 18,
                  marginLeft: 20,
                }}>
                Adicionar à fila
              </Text>
            </ContainerButton>
          </ButtonAdd>
          <ButtonAdd onPress={() => play(video)}>
            <ContainerButton accessible>
              <MaterialIcons
                name="playlist-add"
                size={32}
                color={theme.foreground}
              />
              <Text
                style={{
                  color: theme.foreground,
                  fontWeight: 'bold',
                  fontSize: 18,
                  marginLeft: 20,
                }}>
                Adicionar à playlist
              </Text>
            </ContainerButton>
          </ButtonAdd>
        </ContainerBody>
      </ImageBackground>
    </GlobalContainer>
  );
};

export default Details;
