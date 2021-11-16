import React from "react";
import { FlatList, StyleSheet, Text } from "react-native";

import { CardSongDownload } from "../components/CardSongDownload";
import { CardSongDownloaded } from "../components/CardSongDownloaded";
import GlobalContainer from "../components/GlobalContainer";
import MyScrollView from "../components/MyScrollView";
import { useDownloads } from "../contexts/downloads";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

export const Downloads: React.FC = () => {
  const { downloads, downloadsCompleted } = useDownloads();

  return (
    <GlobalContainer>
      <MyScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Downloads</Text>
        <FlatList
          data={downloads}
          renderItem={({ item }) => <CardSongDownload downloadItem={item} />}
          keyExtractor={({ id }) => id}
          ListHeaderComponent={() => (
            <Text style={styles.titleHeader}>Baixando:</Text>
          )}
          ListEmptyComponent={() => (
            <Text style={styles.empty}>Nenhuma música baixando</Text>
          )}
          nestedScrollEnabled
        />
        <FlatList
          data={downloadsCompleted}
          renderItem={({ item }) => <CardSongDownloaded id={item.id} />}
          keyExtractor={({ id }) => id}
          ListHeaderComponent={() => (
            <Text style={styles.titleHeader}>Baixadas:</Text>
          )}
          ListEmptyComponent={() => (
            <Text style={styles.empty}>Nenhuma música baixada</Text>
          )}
          nestedScrollEnabled
        />
      </MyScrollView>
    </GlobalContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  title: {
    fontFamily: fonts.heading,
    fontSize: 32,
    color: colors.foreground,
  },
  titleHeader: {
    fontFamily: fonts.complement,
    fontSize: 22,
    color: colors.foreground,
  },
  empty: {
    color: colors.pink,
    fontFamily: fonts.complement,
    fontSize: 16,
    marginHorizontal: 25,
    marginVertical: 5,
  },
});
