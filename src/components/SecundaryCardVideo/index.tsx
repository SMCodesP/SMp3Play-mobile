import React, { memo } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  Text,
  TouchableOpacity,
} from "react-native";

import colors from "../../styles/colors";
import fonts from "../../styles/fonts";

interface CardVideoProps {
  navigation?: any;
  item: TVideo;
}

const CardVideo: React.FC<CardVideoProps> = ({ navigation, item: video }) => {
  return (
    <TouchableOpacity
      style={styles.containerGeral}
      onPress={() => {
        navigation.navigate("Details", {
          video,
        });
      }}
    >
      <ImageBackground
        style={styles.thumbnail}
        imageStyle={{ borderRadius: 12 }}
        source={{ uri: video.thumbnail }}
      >
        <View style={styles.container}>
          <Text style={styles.title}>
            {video.title.substring(0, 50).trim() +
              (video.title.length > 50 ? "..." : "")}
          </Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default memo(CardVideo);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, .5)",
    justifyContent: "flex-end",
    borderRadius: 12,
  },
  containerGeral: {
    width: 300,
    height: 168,
    marginHorizontal: 2.5,
  },
  thumbnail: {
    flex: 1,
  },
  title: {
    fontSize: 12,
    color: colors.foreground,
    fontFamily: fonts.complement,
    padding: 8,
  },
});
