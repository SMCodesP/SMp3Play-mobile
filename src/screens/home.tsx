import React, { useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import { View, StyleSheet, Text, FlatList } from "react-native";

import GlobalContainer from "../components/GlobalContainer";
import SecundaryCardVideo from "../components/SecundaryCardVideo";

import { usePlayer } from "../contexts/player";
import colors from "../styles/colors";
import fonts from "../styles/fonts";
import { CardCreator } from "../components/CardCreator";
import MyScrollView from "../components/MyScrollView";

export const Home: React.FC<{
  navigation: any;
}> = ({ navigation }) => {
  const { videos, creators, refreshVideos } = usePlayer();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (refreshVideos && isFocused) {
      refreshVideos();
    }
  }, [isFocused]);

  return (
    <GlobalContainer>
      <MyScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Seja bem-vindo (a)!</Text>
        <Text style={styles.subTitle}>Histórico</Text>
        <View style={styles.listHistory}>
          <FlatList
            data={videos.filter(song => song.updated_at !== undefined).sort((a: any, b: any) => b.updated_at - a.updated_at)}
            renderItem={({ item }) => (
              <SecundaryCardVideo item={item} navigation={navigation} />
            )}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.videoId}
            ListEmptyComponent={() => (
              <Text style={styles.empty}>Nenhuma música tocada</Text>
            )}
          />
        </View>
        <Text style={styles.subTitle}>Artístas</Text>
        <View style={{ paddingHorizontal: 15 }}>
          <FlatList
            data={creators}
            renderItem={({ item }) => (
              <CardCreator item={item} />
            )}
            numColumns={3}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.authorId}
            ListEmptyComponent={() => (
              <Text style={styles.empty}>Nenhum artísta encontrado</Text>
            )}
          />
        </View>
      </MyScrollView>
    </GlobalContainer>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    height: 240,
  },
  title: {
    color: colors.foreground,
    fontSize: 32,
    paddingHorizontal: 15,
    fontFamily: fonts.heading,
  },
  subTitle: {
    color: colors.foreground,
    fontFamily: fonts.complement,
    fontSize: 32,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  listHistory: {
    height: 168,
  },
  empty: {
    color: colors.pink,
    fontFamily: fonts.complement,
    fontSize: 16,
    marginHorizontal: 25,
    marginVertical: 5
  },
});
