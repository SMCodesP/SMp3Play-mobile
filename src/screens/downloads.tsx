import React from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';
import { SpringScrollView } from 'react-native-spring-scrollview';

import { CardSongDownload } from '../components/CardSongDownload';
import GlobalContainer from '../components/GlobalContainer';

import { usePlaylist, usePlaylistInfo } from '../contexts/playlist';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

export const Downloads: React.FC = () => {
  const { playlist } = usePlaylistInfo("Favoritos");

  return (
    <GlobalContainer>
      <SpringScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Downloads</Text>
        <FlatList
          data={playlist.songs || []}
          renderItem={({ item }) => (
            <CardSongDownload song={item} />
          )}
          keyExtractor={({ videoId }) => videoId}
          nestedScrollEnabled
        />
      </SpringScrollView>
    </GlobalContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
    paddingHorizontal: 15
  },
  title: {
    fontFamily: fonts.heading,
    fontSize: 32,
    color: colors.foreground
  }
})