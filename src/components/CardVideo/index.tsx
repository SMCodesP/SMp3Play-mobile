import React, { memo } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import FastImage from "react-native-fast-image";

import colors from "../../styles/colors";
import fonts from "../../styles/fonts";
import TouchableScalable from "../TouchableScalable";

interface CardVideoProps extends TVideo {
  navigation: any;
}

const CardVideo: React.FC<CardVideoProps> = ({ navigation, ...video }) => {
  const handleNavigation = () => {
    navigation.navigate("Details", {
      video,
    });
  };

  return (
    <TouchableScalable
      duration={25}
      scaleTo={0.95}
      style={{ flex: 1 }}
      buttonStyle={{ flex: 1 }}
      onPress={handleNavigation}
    >
      <FastImage style={styles.thumbnail} source={{ uri: video.thumbnail }}>
        <View style={styles.container}>
          <Text style={styles.title}>
            {video.title.substring(0, 50).trim() +
              (video.title.length > 50 ? "..." : "")}
          </Text>
        </View>
      </FastImage>
    </TouchableScalable>
  );
};

export default memo(CardVideo);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, .5)",
    justifyContent: "flex-end",
    borderRadius: 10,
  },
  thumbnail: {
    flex: 1,
    borderRadius: 10,
    marginHorizontal: 2,
    marginVertical: 3,
  },
  title: {
    fontSize: 12,
    color: colors.foreground,
    fontFamily: fonts.complement,
    padding: 8,
  },
});
