import { useIsFocused } from "@react-navigation/native";
import React, { useEffect } from "react";
import { View, StyleSheet, Text, FlatList, ScrollView } from "react-native";
import { SpringScrollView } from "react-native-spring-scrollview";
import GlobalContainer from "../components/GlobalContainer";
import SecundaryCardVideo from "../components/SecundaryCardVideo";
import { usePlayer } from "../contexts/player";
import colors from "../styles/colors";
import fonts from "../styles/fonts";

// import { Container } from './styles';

export const Home: React.FC<{
  navigation: any;
}> = ({ navigation }) => {
  const { history, refreshHistory } = usePlayer();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (refreshHistory && isFocused) {
      refreshHistory();
    }
  }, [isFocused]);

  return (
    <GlobalContainer>
      <ScrollView>
        <Text style={styles.title}>Seja bem-vindo (a)!</Text>
        <Text style={styles.subTitle}>Histórico</Text>
        <View style={styles.listHistory}>
          <FlatList
            data={history}
            renderItem={({ item }) => (
              <SecundaryCardVideo item={item} navigation={navigation} />
            )}
            horizontal={true}
            bounces={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.videoId}
            ListEmptyComponent={() => (
              <Text style={styles.empty}>Nenhuma música tocada</Text>
            )}
          />
        </View>
      </ScrollView>
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
    fontFamily: fonts.heading,
    paddingHorizontal: 15,
    paddingVertical: 5,
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
  }
});
