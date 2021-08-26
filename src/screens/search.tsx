import React, { useCallback, useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  View,
  Platform,
  StyleSheet,
  Text,
  FlatList
} from "react-native";
import { Jiro } from "react-native-textinput-effects";
import LottieView from "lottie-react-native";
import axios from "axios";

import CardVideo from "../components/CardVideo";

import colors from "../styles/colors";
import fonts from "../styles/fonts";
import GlobalContainer from "../components/GlobalContainer";
import { SpringScrollView } from "react-native-spring-scrollview";

export const Search: React.FC = ({
  navigation,
  route,
}: any) => {
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [queried, setQueried] = useState("");
  const [videos, setVideos] = useState<TVideo[]>([]);

  const handleQuery = async ({ initialQuery = "" }) => {
    setVideos([]);
    if (query.length === 0 && initialQuery.length === 0) {
      setQueried("")
      return;
    }

    setLoading(true);

    try {
      const { data } = await axios.get(
        `https://sm-p3-play-api.vercel.app/api/videos/search?q=${initialQuery || query}&limit=12`
      );
      setVideos(data);
      setLoading(false);
      setQueried(initialQuery || query)
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (route.params.initialQuery) {
      setQuery(String(route.params.initialQuery || ""))
      handleQuery({ initialQuery: String(route.params.initialQuery || "")})
    }
  }, [route.params.initialQuery])

  return (
    <GlobalContainer>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <SpringScrollView showsVerticalScrollIndicator={false} style={styles.inner}>
          <Text style={styles.title}>{queried ? `Pesquise mais músicas` : 'Pesquise por músicas!'}</Text>
          <View style={styles.containerInput}>
            <Jiro
              label={"Pesquise sua música"}
              borderColor={colors.comment}
              inputPadding={15}
              inputStyle={{ color: colors.foreground }}
              returnKeyType="search"
              onChangeText={setQuery}
              onSubmitEditing={() => handleQuery({})}
              value={query}
            />
          </View>
          {loading ? (
            <LottieView
              source={require("../../assets/lf30_editor_kplkuq1a.json")}
              duration={1930}
              autoPlay
              loop
            />
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
            renderItem={({ item: video}) => <CardVideo {...video} navigation={navigation} />}
            keyExtractor={(video) => video.videoId}
            numColumns={2}
            nestedScrollEnabled
          />
        </SpringScrollView>
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
});
