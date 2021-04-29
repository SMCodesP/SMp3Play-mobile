import axios from 'axios';
import React, {forwardRef, useContext, useState} from 'react';

import {Modalize} from 'react-native-modalize';
import {ThemeContext} from 'styled-components';
import {FlatList} from 'react-native';
import {useDebouncedCallback} from 'use-debounce';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
} from 'react-native-simple-radio-button';
import {rgba, lighten} from 'polished';
import {RectButton} from 'react-native-gesture-handler';
import {v4 as uuidv4} from 'uuid';

import {Jiro} from 'react-native-textinput-effects';

import {
  Container,
  Title,
  SubTitle,
  ContainerVideos,
  ContainerButton,
  ButtonConfirm,
  ButtonText,
  VideoContainer,
  Artwork,
  Button,
  TrackTitle,
} from './styles';

import type VideoType from '../../../interfaces/VideoType';
import {usePlayer} from '../../../contexts/player';

const Radio = ({playlist, item}: any) => {
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
          isSelected={
            playlist.get(item.videoId) !== null &&
            playlist.get(item.videoId) !== undefined
          }
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

const Modal = forwardRef((_, ref: any) => {
  const theme = useContext(ThemeContext);
  const {createPlaylist} = usePlayer();

  const [name, setName] = useState('');
  const [query, setQuery] = useState('');
  const [videos, setVideos] = useState<VideoType[]>([]);
  const [playlist, setPlaylist] = useState<Map<string, VideoType>>(new Map());

  const handleQuery = useDebouncedCallback(
    async (querySearch) => {
      if (querySearch.length === 0) {
        return;
      }

      setVideos([]);

      try {
        const {
          data,
        }: {
          data: VideoType[];
        } = await axios.get(
          `https://sm-p3-play-api.vercel.app/api/videos/search?q=${querySearch}&limit=2`,
        );
        setVideos(data);
      } catch (error) {
        console.error(error);
      }
    },
    1200,
    {
      maxWait: 1200,
    },
  );

  const handlePlaylist = (video: VideoType) => {
    const map = new Map(playlist);
    const add = () => {
      return map.set(video.videoId, {
        ...video,
        uuid: uuidv4(),
      } as any);
    };
    const rm = () => {
      map.delete(video.videoId);
      return map;
    };
    setPlaylist(map.has(video.videoId) ? rm() : add());
  };

  const reset = () => {
    setName('');
    setQuery('');
    setVideos([]);
    setPlaylist(new Map());
  };

  const confirmCreate = () => {
    if (name.length === 0) {
      return;
    }
    reset();
    ref.current.close();
    createPlaylist(name, Array.from(playlist.values()));
  };

  const handleCancel = () => {
    reset();
    ref.current.close();
  };

  return (
    <Modalize
      ref={ref}
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
      }}>
      <Container>
        <Title>Dê um nome à playlist</Title>
        <Jiro
          label={'Nome da playlist'}
          borderColor={theme.comment}
          inputPadding={16}
          onChangeText={setName}
          value={name}
          inputStyle={{color: theme.foreground}}
        />
      </Container>
      <Container>
        <SubTitle>Adicione novas músicas</SubTitle>
        <Jiro
          label={'Procure por novas músicas'}
          borderColor={theme.comment}
          inputPadding={10}
          onSubmitEditing={handleQuery}
          onChangeText={(e) => {
            setQuery(e);
            handleQuery(e);
          }}
          value={query}
          inputStyle={{color: theme.foreground}}
        />
      </Container>
      <ContainerVideos>
        <FlatList
          data={videos}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.videoId}
          renderItem={({item}) => (
            <Artwork
              resizeMode="contain"
              imageStyle={{borderRadius: 25}}
              source={{
                uri: String(item.image),
              }}>
              <Button onPress={() => handlePlaylist(item)}>
                <VideoContainer>
                  <Radio item={item} playlist={playlist} />
                  <TrackTitle>{item.title}</TrackTitle>
                </VideoContainer>
              </Button>
            </Artwork>
          )}
        />
        <ContainerButton>
          <ButtonConfirm
            style={{
              backgroundColor:
                name.length !== 0 ? theme.comment : rgba(theme.comment, 0.5),
              opacity: name.length !== 0 ? 1 : 0.75,
            }}
            enabled={name.length !== 0}
            rippleColor={lighten(0.5, theme.comment)}
            onPress={confirmCreate}>
            <ButtonText>Criar</ButtonText>
          </ButtonConfirm>
        </ContainerButton>
        <ContainerButton>
          <RectButton
            style={{
              paddingHorizontal: 10,
              paddingVertical: 10,
              borderRadius: 10,
            }}
            rippleColor={rgba(theme.red, 0.1)}
            onPress={handleCancel}>
            <ButtonText
              style={{
                color: theme.red,
                alignSelf: 'center',
              }}>
              Cancelar
            </ButtonText>
          </RectButton>
        </ContainerButton>
      </ContainerVideos>
    </Modalize>
  );
});

export default Modal;
