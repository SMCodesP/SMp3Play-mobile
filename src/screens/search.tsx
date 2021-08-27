import React, { useCallback, useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  View,
  Platform,
  StyleSheet,
  Text,
  FlatList,
  Keyboard,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather"
import { Jiro } from "react-native-textinput-effects";
import LottieView from "lottie-react-native";
import axios from "axios";
import extract from "extract-json-from-string";

import CardVideo from "../components/CardVideo";

import colors from "../styles/colors";
import fonts from "../styles/fonts";
import GlobalContainer from "../components/GlobalContainer";
import { SpringScrollView } from "react-native-spring-scrollview";
import { api } from "../services/api";
import { RectButton } from "react-native-gesture-handler";
import { lighten } from "polished";
import Suggestion from "../components/Suggestion";
import { genres } from "../utils/genres";
import CardGenre from "../components/CardGenre";

export const Search: React.FC = ({
  navigation,
  route,
}: any) => {
  const [loading, setLoading] = useState(false);
  const [queried, setQueried] = useState("");
  const [videos, setVideos] = useState<TVideo[]>([]);
  const [query, setQuery] = useState("");
  
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleQuery = async ({ initialQuery = "" }) => {
    Keyboard.dismiss();
    setSuggestions([])
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

  const handlerTextChange = async (text: string) => {
    if (text.length === 0) {
      setQuery("")
      setSuggestions([]);
      return;
    }
    setQuery(text)
    const { data } = await api.get<[string, string[]]>(`/complete/search?client=firefox&ds=yt&gs_id=q&hl=pt&gl=br&q=${text}`)
    setSuggestions(data[1].splice(0, 3))
  }

  useEffect(() => {
    if (route.params.initialQuery) {
      setQuery(String(route.params.initialQuery || ""))
      handleQuery({ initialQuery: String(route.params.initialQuery || "")})
    }
  }, [route.params.initialQuery])

  return (
    <GlobalContainer>
      <SpringScrollView showsVerticalScrollIndicator={false} style={styles.inner}>
        <Text style={styles.title}>{queried ? `Pesquise mais músicas` : 'Pesquise por músicas!'}</Text>
        <View style={styles.containerInput}>
          <Jiro
            label={"Pesquise sua música"}
            borderColor={colors.comment}
            style={{
              marginTop: 15
            }}
            inputPadding={0}
            inputStyle={{
              color: colors.foreground,
              fontFamily: fonts.text,
              fontWeight: "normal",
              paddingLeft: 10,
              paddingRight: 10,
            }}
            returnKeyType="search"
            onChangeText={handlerTextChange}
            onFocus={() => handlerTextChange(query)}
            onSubmitEditing={() => handleQuery({})}
            value={query}
          />
          {query.length > 0 && suggestions.length > 0 && !loading && <FlatList
            data={suggestions}
            keyboardShouldPersistTaps="always"
            keyboardDismissMode="none"
            renderItem={({ item, index }) => (
              <Suggestion
                query={query}
                item={item}
                handleQuery={handleQuery}
                handlerTextChange={handlerTextChange}
                setQuery={setQuery}
              />
            )}
            keyExtractor={(name) => name}
            style={{
              width: "100%",
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
              backgroundColor: colors.comment,
            }}
            scrollEnabled={false}
            removeClippedSubviews={true}
          />}
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
            <View>
              <Text style={styles.subTitle}>Explore novos universos</Text>
              <FlatList
                data={genres}
                renderItem={({ item }) => (
                  <CardGenre
                    item={item}
                    onPress={() => {
                      setQuery(item.query)
                      handleQuery({ initialQuery: item.query })
                    }}
                  />
                )}
                numColumns={2}
                horizontal={false}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.name}
              />
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
    </GlobalContainer>
  );
};

const styles = StyleSheet.create({
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
    // position: "relative"
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
  subTitle: {
    color: colors.foreground,
    fontFamily: fonts.complement,
    fontSize: 32,
    paddingHorizontal: 15,
    paddingVertical: 5,
  }
});
