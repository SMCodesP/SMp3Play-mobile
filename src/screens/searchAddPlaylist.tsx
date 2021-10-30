import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  View,
  Platform,
  StyleSheet,
  Text,
  FlatList,
} from "react-native";
import { Jiro } from "react-native-textinput-effects";
import LottieView from "lottie-react-native";
import axios from "axios";

import colors from "../styles/colors";
import fonts from "../styles/fonts";
import GlobalContainer from "../components/GlobalContainer";
import CardAddSong from "../components/CardAddSong";
import MyScrollView from "../components/MyScrollView";

export const SearchAddPlaylist: React.FC = ({ navigation, route: { params: { playlist } } }: any) => {
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [videos, setVideos] = useState<TVideo[]>([]);

  const handleQuery = async () => {
    setVideos([]);
    if (query.length === 0) {
      return;
    }

    setLoading(true);

    try {
      const { data } = await axios.get(
        `https://sm-p3-play-api.vercel.app/api/videos/search?q=${query}&limit=12`
      );
      setVideos(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <GlobalContainer>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <MyScrollView showsVerticalScrollIndicator={false} style={styles.inner}>
          {/* <TouchableWithoutFeedback style={styles.inner} touchSoundDisabled={true} onPress={Keyboard.dismiss}> */}
            <View style={styles.containerInput}>
              <Jiro
                label={"Adicione uma música"}
                borderColor={colors.comment}
                inputStyle={{
                  color: colors.foreground,
                  fontSize: 22
                }}
                labelStyle={{
                  fontSize: 22
                }}
                returnKeyType="search"
                onChangeText={setQuery}
                onSubmitEditing={handleQuery}
                value={query}
              />
            </View>
            {loading ? (
              <View style={{
                width: "100%",
                height: 400
              }}>
                <LottieView
                  source={require("../../assets/lf30_editor_kplkuq1a.json")}
                  duration={1930}
                  autoPlay
                  loop
                />
              </View>
            ) : (
              videos.length === 0 && (
                <View style={styles.containerSongEmpty}>
                  <Text style={styles.songEmpty}>
                    Nenhuma música encontrada/pesquisada
                  </Text>
                </View>
              )
            )}
            <FlatList
              data={videos}
              renderItem={({ item }) => <CardAddSong playlistName={playlist} item={item} navigation={navigation} />}
              keyExtractor={(video) => video.videoId}
              contentContainerStyle={styles.containerListSongs}
              nestedScrollEnabled
            />
          {/* </TouchableWithoutFeedbacsk> */}
        </MyScrollView>
      </KeyboardAvoidingView>
    </GlobalContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
  inner: {
    backgroundColor: colors.background,
    flex: 1,
  },
  title: {
    color: colors.foreground,
    fontSize: 32,
    fontFamily: fonts.heading,
    paddingHorizontal: 15,
    paddingBottom: 5
  },
  containerInput: {
    paddingHorizontal: 25,
    paddingBottom: 20,
  },
  containerSongEmpty: {
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  songEmpty: {
    color: colors.foreground,
    fontSize: 22,
    fontFamily: fonts.complement,
    textAlign: "center",
  },
  containerListSongs: {
    backgroundColor: colors.comment,
    borderRadius: 15,
    marginHorizontal: 15,
  }
});
