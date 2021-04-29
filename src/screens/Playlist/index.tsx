import React, {useContext} from 'react';

import {
  View,
  TouchableOpacity,
  TouchableOpacityProps,
  FlatList,
} from 'react-native';

import {ThemeContext} from 'styled-components';
import {usePlayer} from '../../contexts/player';

import GlobalContainer from '../../components/GlobalContainer';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import TrackPlayer from 'react-native-track-player';

import {PlaylistItemImage, ListPlaylist, ShadowPlaylist} from '../Home/styles';
import {ContainerHeader, Title} from '../Details/styles';
import {
  ContainerPlaylist,
  ContainerBody,
  ContainerRemoveSong,
  DeleteText,
  SongName,
  TrackItem,
} from './styles';

import DefaultButton from '../../components/DefaultButton';
import {Swipeable} from 'react-native-gesture-handler';

interface RightActionsProps extends TouchableOpacityProps {
  dragX: any;
}

const RightActions: React.FC<RightActionsProps> = ({dragX, ...props}) => {
  const scale = dragX.interpolate({
    inputRange: [-100, 0],
    outputRange: [1, -50],
    extrapolate: 'clamp',
  });
  return (
    <TouchableOpacity activeOpacity={0.5} {...props}>
      <ContainerRemoveSong style={{transform: [{translateX: scale}]}}>
        <DeleteText>Remover</DeleteText>
      </ContainerRemoveSong>
    </TouchableOpacity>
  );
};

const Playlist: React.FC<{
  route: {
    params: {
      playlistId: string;
    };
  };
  navigation: any;
}> = ({
  route: {
    params: {playlistId},
  },
  navigation,
}) => {
  const theme = useContext(ThemeContext);
  const {
    play,
    playlists,
    playPlaylist,
    removeSongFromPlaylist,
    removePlaylist,
  } = usePlayer();

  const playlist = playlists.find(
    (playlistFind) => playlistFind.id === playlistId,
  );

  if (!playlist) {
    navigation.goBack();
    return <View />;
  }

  const handlePlay = (video: any) => {
    TrackPlayer.destroy();
    play(video);
  };

  return (
    <GlobalContainer>
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
        <Title>
          {playlist.name.substr(0, 26).trim()}
          {playlist.name.length > 26 && '...'}
        </Title>
      </ContainerHeader>
      <ContainerPlaylist>
        <ListPlaylist
          numColumns={2}
          data={playlist.videos.slice(0, 4)}
          keyExtractor={(itemVideo: any) => itemVideo.videoId}
          renderItem={({item: itemVideo}: any) => (
            <PlaylistItemImage
              source={{
                uri: itemVideo.thumbnail,
              }}
            />
          )}
        />
        <ShadowPlaylist />
      </ContainerPlaylist>
      <ContainerBody>
        <View
          style={{
            marginHorizontal: 15,
          }}>
          <DefaultButton
            icon="play-arrow"
            onPress={() => playPlaylist(playlist)}>
            Tocar agora
          </DefaultButton>
        </View>
        <FlatList
          style={{
            marginTop: 15,
            flex: 1,
          }}
          data={playlist.videos}
          keyExtractor={(itemVideo: any) => itemVideo.uuid}
          renderItem={({item}) => (
            <Swipeable
              containerStyle={{
                borderBottomWidth: 1,
                borderBottomColor: theme.comment,
              }}
              renderRightActions={(_, dragX) => (
                <RightActions
                  onPress={() =>
                    removeSongFromPlaylist(playlist.id, item.uuid as any)
                  }
                  dragX={dragX}
                />
              )}>
              <TrackItem onPress={() => handlePlay(item)} active={false}>
                <View accessible>
                  <SongName>{item.title}</SongName>
                </View>
              </TrackItem>
            </Swipeable>
          )}
        />
        <View
          style={{
            marginHorizontal: 15,
          }}>
          <DefaultButton
            IconType={MaterialCommunityIcons}
            icon="trash-can"
            buttonStyle={{
              marginVertical: 7.5,
              marginHorizontal: 10,
            }}
            type="cancel"
            onPress={() => {
              removePlaylist(playlist.id);
            }}>
            Excluir
          </DefaultButton>
        </View>
      </ContainerBody>
    </GlobalContainer>
  );
};

export default Playlist;
