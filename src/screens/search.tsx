import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  FlatList,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  StyleSheet,
  Text,
  Image,
} from "react-native";
import { WaterfallList } from "react-native-largelist-v3";
import { Jiro } from "react-native-textinput-effects";
import { MaterialIcons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import axios from "axios";

import CardVideo from "../components/CardVideo";

import colors from "../styles/colors";
import fonts from "../styles/fonts";
import GlobalContainer from "../components/GlobalContainer";

export const Search: React.FC = ({ navigation }: any) => {
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [videos, setVideos] = useState([]);

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
      console.log(error);
      setLoading(false);
    }
  };

  const renderTeste = (video: any) => (
    <CardVideo {...video} navigation={navigation} />
  );

  return (
    <GlobalContainer>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.inner}>
          <Text style={styles.title}>Pesquise por músicas!</Text>
          <View style={styles.containerInput}>
            <Jiro
              label={"Pesquise sua música"}
              borderColor={colors.comment}
              inputPadding={15}
              inputStyle={{ color: colors.foreground }}
              returnKeyType="search"
              onChangeText={setQuery}
              onSubmitEditing={handleQuery}
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
          <WaterfallList
            data={videos}
            heightForItem={() => 140}
            renderItem={renderTeste}
            showsVerticalScrollIndicator={false}
            numColumns={2}
          />
        </View>
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
    fontSize: 26,
    fontFamily: fonts.heading,
    paddingHorizontal: 15,
    paddingVertical: 5,
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
