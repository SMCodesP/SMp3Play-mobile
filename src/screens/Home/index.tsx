import React, {createRef} from 'react';
import {FlatList, View} from 'react-native';
import {Portal} from 'react-native-portalize';

import GlobalContainer from '../../components/GlobalContainer';
import CreatePlaylist from '../../components/Modals/CreatePlaylist';

import {
  Title,
  EmptyText,
  Button,
  Artwork,
  Container,
  TrackTitle,
  ContainerCreatePlaylist,
  ButtonCreatePlaylist,
  TextCreatePlaylist,
  ContainerPlaylist,
  PlaylistFooterName,
  PlaylistItemImage,
  ListPlaylist,
  ShadowPlaylist,
} from './styles';

import {usePlayer} from '../../contexts/player';

const HistoryEmpty = () => (
  <View>
    <EmptyText>Nenhuma músicado ouvida</EmptyText>
  </View>
);

const PlaylistsCreate = () => {
  const modalRef = createRef();

  return (
    <>
      <ButtonCreatePlaylist onPress={() => (modalRef.current as any).open()}>
        <ContainerCreatePlaylist>
          <TextCreatePlaylist>+</TextCreatePlaylist>
        </ContainerCreatePlaylist>
        <Portal>
          <CreatePlaylist ref={modalRef} />
        </Portal>
      </ButtonCreatePlaylist>
    </>
  );
};

const Home: React.FC = ({navigation}: any) => {
  const {history, playlists} = usePlayer();

  return (
    <GlobalContainer>
      <Title>Histórico</Title>
      <View
        style={{
          height: 168,
        }}>
        <FlatList
          data={history}
          ListEmptyComponent={HistoryEmpty}
          keyExtractor={(item) => String(item.videoId)}
          horizontal={true}
          renderItem={({item}) => (
            <Artwork
              resizeMode="contain"
              imageStyle={{borderRadius: 25}}
              source={{
                uri: String(item.image),
              }}>
              <Button
                onPress={() =>
                  navigation.navigate('Details', {
                    video: item,
                  })
                }>
                <Container>
                  <TrackTitle>{item.title}</TrackTitle>
                </Container>
              </Button>
            </Artwork>
          )}
        />
      </View>
      <Title>Playlists</Title>
      <View
        style={{
          width: '95%',
          alignSelf: 'center',
          flex: 1,
        }}>
        <PlaylistsCreate />
        <FlatList
          style={{
            width: '100%',
            marginTop: 10,
            flex: 1,
          }}
          data={playlists}
          keyExtractor={(item) => item.id}
          horizontal={false}
          renderItem={({item}) => (
            <ContainerPlaylist>
              <ListPlaylist
                numColumns={2}
                data={item.videos.slice(0, 4)}
                keyExtractor={(itemVideo: any) => itemVideo.videoId}
                renderItem={({item: itemVideo}: any) => (
                  <PlaylistItemImage
                    source={{
                      uri: itemVideo.thumbnail,
                    }}
                  />
                )}
              />
              <ShadowPlaylist
                onPress={() =>
                  navigation.navigate('Playlist', {
                    playlistId: item.id,
                  })
                }>
                <PlaylistFooterName>{item.name}</PlaylistFooterName>
              </ShadowPlaylist>
            </ContainerPlaylist>
          )}
        />
      </View>
    </GlobalContainer>
  );
};

export default Home;
