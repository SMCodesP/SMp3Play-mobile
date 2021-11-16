import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import FastImage from "react-native-fast-image";
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";

import { TouchableScalable } from "../Buttons/TouchableScalable";

export const CardCreator: React.FC<{
  item: TCreator;
}> = ({ item }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.containerGeral}>
      <TouchableScalable
        duration={100}
        scaleTo={0.95}
        buttonStyle={styles.button}
        style={styles.container}
        onPress={() => {
          navigation.navigate("Creator", {
            creatorId: item.authorId,
          });
        }}
      >
        <View style={styles.containerImage}>
          <FastImage
            source={{ uri: item.authorThumbnail.url }}
            style={styles.avatar}
            resizeMode="cover"
          />
          {/* <View style={styles.curtain} />
          </FastImage> */}
        </View>
        <Text style={styles.name}>{item.author}</Text>
      </TouchableScalable>
    </View>
  );
};

const styles = StyleSheet.create({
  containerGeral: {
    width: (Dimensions.get("screen").width - 30) / 3,
  },
  button: {
    flex: 1,
    paddingVertical: 10,
  },
  container: {
    flex: 1,
  },
  containerImage: {
    flex: 1,
  },
  avatar: {
    width: (Dimensions.get("screen").width - 60) / 3,
    height: (Dimensions.get("screen").width - 60) / 3,
    borderRadius: (Dimensions.get("screen").width - 60) / 3 / 2,
  },
  curtain: {
    flex: 1,
    backgroundColor: "#00000066",
  },
  name: {
    textAlign: "center",
    fontFamily: fonts.complement,
    color: colors.foreground,
    fontSize: 18,
  },
});
