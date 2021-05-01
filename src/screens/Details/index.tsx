import React, {useContext, useRef} from 'react';
import VideoType from '../../interfaces/VideoType';

import {TouchableOpacity, ImageBackground} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {ThemeContext} from 'styled-components';
import {Portal} from 'react-native-portalize';

import {
  ContainerImage,
  ContainerHeader,
  Title,
  ContainerAuthor,
  AuthorName,
  ContainerBody,
} from './styles';
import {usePlayer} from '../../contexts/player';

import ModalPlaylists from '../../components/Modals/ModalPlaylists';
import GlobalContainer from '../../components/GlobalContainer';
import DefaultButton from '../../components/DefaultButton';

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
    play(video, true);
  };

  const modalizeRef = useRef(null);

  const open = () => {
    (modalizeRef.current as any).open();
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
          <DefaultButton
            buttonStyle={{marginVertical: 7.5, marginHorizontal: 15}}
            icon="add"
            onPress={() => play(video)}>
            Adicionar à fila
          </DefaultButton>
          <DefaultButton
            buttonStyle={{marginVertical: 7.5, marginHorizontal: 15}}
            icon="playlist-add"
            onPress={open}>
            Adicionar à playlist
          </DefaultButton>
        </ContainerBody>
      </ImageBackground>
      <Portal>
        <ModalPlaylists song={video} modalizeRef={modalizeRef} />
      </Portal>
    </GlobalContainer>
  );
};

export default Details;
