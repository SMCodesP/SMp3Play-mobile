import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  ScrollView,
} from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import TrackPlayer from "react-native-track-player";
import ytdl from "react-native-ytdl";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

import DefaultButton from "../components/DefaultButton";
import GlobalContainer from "../components/GlobalContainer";
import { formatNumber } from "../utils/formatNumber";
import { usePlayer } from "../contexts/player";

const Details: React.FC<{
  route: {
    params: {
      video: any;
    };
  };
  navigation: any;
}> = ({
  route: {
    params: { video },
  },
  navigation,
}) => {
  const { refreshQueue } = usePlayer();

  const handlePlay = async () => {
    TrackPlayer.destroy();
    await handleAddQueue();
  };

  const handleAddQueue = async () => {
    const urls = await ytdl(video.url, { quality: "highestaudio" });
    const track = {
      url: urls[0].url,
      artist: video.author.name,
      title: video.title,
      artwork: video.image,
      description: video.description,
      date: video.timestamp,
      extra: video,
      id: `${Math.floor(Math.random() * 100000000000)}`,
    };
    await TrackPlayer.add(track);
    await TrackPlayer.play();
    await refreshQueue();
  };

  return (
    <GlobalContainer>
      <ScrollView style={{ flex: 1 }}>
        <ImageBackground source={{ uri: video.image }} style={{ height: 250 }}>
          <View style={styles.containerImage}>
            <View style={styles.containerHeader}>
              <TouchableOpacity onPress={navigation.goBack}>
                <MaterialCommunityIcons
                  name="arrow-left"
                  size={28}
                  color={colors.foreground}
                />
              </TouchableOpacity>
              <Text style={styles.title}>
                {video.title.substr(0, 26).trim()}...
              </Text>
            </View>
            <View style={styles.containerAuthor}>
              <Text style={styles.authorName}>{video.author.name}</Text>
              <TouchableOpacity
                style={{
                  top: 28,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={handlePlay}
              >
                <MaterialCommunityIcons
                  name="play-circle"
                  size={56}
                  color={colors.pink}
                />
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
        <View style={styles.containerBody}>
          <DefaultButton
            buttonStyle={{ marginVertical: 7.5, marginHorizontal: 15 }}
            icon="add"
            onPress={handleAddQueue}
          >
            Adicionar à fila
          </DefaultButton>
          <DefaultButton
            buttonStyle={{ marginVertical: 7.5, marginHorizontal: 15 }}
            icon="playlist-add"
          >
            Adicionar à playlist
          </DefaultButton>
          <Text style={styles.description}>{video.description}</Text>
          <Text style={styles.info}>
            <Text style={styles.span}>Views:</Text> {formatNumber(video.views)}
          </Text>
          <Text style={styles.info}>
            <Text style={styles.span}>Duração:</Text> {video.timestamp}
          </Text>
          <Text style={styles.info}>
            <Text style={styles.span}>Postado:</Text> {video.ago}
          </Text>
        </View>
      </ScrollView>
    </GlobalContainer>
  );
};

const styles = StyleSheet.create({
  containerImage: {
    height: 250,
    backgroundColor: "#000000aa",
  },
  containerHeader: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.background,
    borderBottomWidth: 2,
    borderBottomColor: colors.comment,
    paddingVertical: 10,
    paddingHorizontal: 5,
    opacity: 0.95,
  },
  title: {
    color: colors.foreground,
    fontFamily: fonts.heading,
    fontSize: 20,
    marginLeft: 5,
  },
  containerAuthor: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingRight: 45,
    paddingLeft: 25,
  },
  authorName: {
    fontSize: 24,
    fontFamily: fonts.complement,
    color: colors.foreground,
    fontWeight: "bold",
  },
  containerBody: {
    marginVertical: 50,
    marginHorizontal: 10,
  },
  description: {
    fontSize: 16,
    fontFamily: fonts.text,
    color: colors.foreground,
    padding: 20,
  },
  info: {
    fontSize: 15,
    color: colors.pink,
    paddingHorizontal: 20,
  },
  span: {
    fontSize: 16,
    color: colors.foreground,
    fontFamily: fonts.complement,
  },
});

export default Details;
