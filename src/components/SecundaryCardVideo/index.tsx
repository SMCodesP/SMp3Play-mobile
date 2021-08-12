import React, { memo } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  Text,
  TouchableOpacity,
} from "react-native";
import FastImage from "react-native-fast-image";

import colors from "../../styles/colors";
import fonts from "../../styles/fonts";
import TouchableScalable from "../TouchableScalable";

interface CardVideoProps {
  navigation?: any;
  item: TVideo;
}

const SecundaryCardVideo: React.FC<CardVideoProps> = ({ navigation, item: video }) => {
  const handleNavigation = () => {
    console.log(video)
    navigation.navigate("Details", {
      video,
      videoURL: video.url
    });
  };

  return (
    <TouchableScalable
      duration={100}
      scaleTo={0.95}
      style={styles.containerGeral}
      onPress={handleNavigation}
    >
      <FastImage
        style={styles.thumbnail}
        // imageStyle={{ borderRadius: 12 }}
        source={{ uri: video.thumbnail }}
      >
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

export default memo(SecundaryCardVideo);

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
    borderRadius: 12,
  },
  title: {
    fontSize: 12,
    color: colors.foreground,
    fontFamily: fonts.complement,
    padding: 8,
  },
});
