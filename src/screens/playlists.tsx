import React, { useContext, useEffect } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SpringScrollView } from 'react-native-spring-scrollview';
import { CardPlaylist } from '../components/CardPlaylist';
import GlobalContainer from '../components/GlobalContainer';
import PlaylistContext, { usePlaylist } from '../contexts/playlist';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

// import { Container } from './styles';

export const Playlists: React.FC = () => {
  const {playlists} = useContext(PlaylistContext);

  return (
    <GlobalContainer>
      <SpringScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Playlists</Text>
        <FlatList
          data={playlists}
          renderItem={({ item }) => (
            <CardPlaylist
              playlist={item}
            />
          )}
          keyExtractor={({ name }) => name}
          nestedScrollEnabled
        />
      </SpringScrollView>
    </GlobalContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    marginHorizontal: 15
  },
  title: {
    fontFamily: fonts.heading,
    fontSize: 32,
    color: colors.foreground
  }
})
