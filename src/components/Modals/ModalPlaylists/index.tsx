import React, {useContext, useRef, useState} from 'react';
import {Animated} from 'react-native';

import {Modalize} from 'react-native-modalize';
import {ThemeContext} from 'styled-components/native';

import DefaultButton from '../../DefaultButton';

import {usePlayer} from '../../../contexts/player';

import {Title} from '../styles';
import {
  Button,
  Container,
  PlaylistName,
  ContainerName,
  ContainsText,
} from './styles';

import RadioForm, {
  RadioButton,
  RadioButtonInput,
} from 'react-native-simple-radio-button';
import Playlist from '../../../interfaces/Playlist';
import VideoType from '../../../interfaces/VideoType';

const Radio = ({isSelected, item}: any) => {
  const theme = useContext(ThemeContext);

  return (
    <RadioForm
      style={{
        alignSelf: 'flex-end',
      }}
      formHorizontal={true}
      animation={true}
      initial={0}
      onPress={() => {}}>
      <RadioButton>
        <RadioButtonInput
          obj={item}
          index={1}
          isSelected={isSelected}
          onPress={() => {}}
          buttonInnerColor={theme.purple}
          buttonOuterColor={theme.purple}
          buttonSize={10}
          buttonOuterSize={20}
          buttonStyle={{}}
          buttonWrapStyle={{marginLeft: 10}}
        />
      </RadioButton>
    </RadioForm>
  );
};

const ModalPlaylists = ({
  modalizeRef,
  song,
}: {
  modalizeRef: React.MutableRefObject<null>;
  song: VideoType;
}) => {
  const {playlists, addSongIntoPlaylist} = usePlayer();
  const [playlistsSelected, setPlaylistsSelected] = useState<string[]>([]);
  const theme = useContext(ThemeContext);

  const scrollY = useRef(new Animated.Value(0)).current;

  const handlePlaylist = (playlist: Playlist) => {
    setPlaylistsSelected((oldState) => {
      return oldState.includes(playlist.id)
        ? oldState.filter((filtered) => filtered !== playlist.id)
        : [...oldState, playlist.id];
    });
  };

  return (
    <Modalize
      ref={modalizeRef}
      snapPoint={530}
      modalStyle={{
        backgroundColor: theme.background,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginHorizontal: 20,
        display: 'flex',
        flexDirection: 'column',
      }}
      handleStyle={{
        width: 35,
        backgroundColor: theme.currentLine,
        display: 'flex',
        flexDirection: 'column',
      }}
      childrenStyle={{
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
      flatListProps={{
        data: playlists,
        renderItem: ({item}: {item: Playlist}) => (
          <Button onPress={() => handlePlaylist(item)}>
            <Container accessible>
              <ContainerName>
                <PlaylistName>{item.name}</PlaylistName>
                {item.videos.some(
                  (search) => search.videoId === song.videoId,
                ) && (
                  <ContainsText>
                    {
                      item.videos.filter(
                        (search) => search.videoId === song.videoId,
                      ).length
                    }
                  </ContainsText>
                )}
              </ContainerName>
              <Radio
                item={item}
                isSelected={playlistsSelected.includes(item.id)}
              />
            </Container>
          </Button>
        ),
        style: {
          backgroundColor: theme.background,
        },
        ListHeaderComponent: () => <Title>Suas playlists</Title>,
        ListFooterComponent: () => (
          <>
            <DefaultButton
              textStyle={{fontSize: 18}}
              buttonStyle={{paddingVertical: 10, marginVertical: 7.5}}
              icon="add"
              onPress={() => {
                playlistsSelected.forEach((playlist) => {
                  addSongIntoPlaylist(playlist, song);
                });
                setPlaylistsSelected([]);
                (modalizeRef.current as any)?.close();
              }}>
              Adicionar
            </DefaultButton>
            <DefaultButton
              textStyle={{fontSize: 18}}
              buttonStyle={{paddingVertical: 10, marginVertical: 7.5}}
              type="cancel"
              onPress={() => {
                setPlaylistsSelected([]);
                (modalizeRef.current as any)?.close();
              }}>
              Cancelar
            </DefaultButton>
          </>
        ),
        ListFooterComponentStyle: {
          marginHorizontal: 50,
          marginVertical: 10,
        },
        keyExtractor: (item) => item.id,
        showsVerticalScrollIndicator: false,
        onScroll: Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {
            useNativeDriver: true,
          },
        ),
        scrollEventThrottle: 5,
      }}
    />
  );
};

export default ModalPlaylists;
