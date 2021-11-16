import React from "react";
import { useNavigation } from "@react-navigation/native";

import { StyleSheet, Text, View } from "react-native";

import FastImage from "react-native-fast-image";

import colors from "../../styles/colors";
import fonts from "../../styles/fonts";
import { usePlaylistInfo } from "../../contexts/playlist";
import { TouchableScalable } from "../Buttons/TouchableScalable";
import { darken } from "polished";

export const CardPlaylist: React.FC<{
  playlist: TPlaylist;
}> = ({ playlist }) => {
  const navigation = useNavigation();
  const {
    playlist: { songs },
  } = usePlaylistInfo(playlist.name);

  return (
    <TouchableScalable
      rectButton={true}
      duration={100}
      scaleTo={0.95}
      delayPressOut={100}
      rippleColor={darken(0.1, colors.comment)}
      buttonStyle={styles.container}
      style={{
        flexDirection: "row",
        width: "100%",
      }}
      onPress={() => {
        navigation.navigate("Playlist", {
          playlist,
        });
      }}
      borderRadius={10}
    >
      <View style={styles.containerThumbnail}>
        <View>
          {songs[0] && (
            <FastImage
              style={[styles.thumbnailItem, { borderTopLeftRadius: 10 }]}
              source={{ uri: songs[0].thumbnail }}
            />
          )}
          {songs[1] && (
            <FastImage
              style={[styles.thumbnailItem, { borderBottomLeftRadius: 10 }]}
              source={{ uri: songs[1].thumbnail }}
            />
          )}
        </View>
        <View>
          {songs[2] && (
            <FastImage
              style={[styles.thumbnailItem, { borderTopRightRadius: 10 }]}
              source={{ uri: songs[2].thumbnail }}
            />
          )}
          {songs[3] && (
            <FastImage
              style={[styles.thumbnailItem, { borderBottomRightRadius: 10 }]}
              source={{ uri: songs[3].thumbnail }}
            />
          )}
        </View>
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            flex: 1,
            backgroundColor: "#00000055",
            borderRadius: 10,
            width: 130,
          }}
        />
      </View>
      <View style={styles.containerInfo}>
        <Text style={styles.title}>{playlist.name}</Text>
        <Text style={styles.from}>YT</Text>
        <View style={styles.hr} />
        <Text style={styles.counter}>{songs.length}</Text>
      </View>
    </TouchableScalable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.comment,
    //TouchableScalableBorderRadiusborderRadius: 10,
    flexDirection: "row",
    marginBottom: 10,
  },
  containerInfo: {
    flex: 1,
    marginHorizontal: 15,
    marginVertical: 5,
  },
  title: {
    color: colors.foreground,
    fontFamily: fonts.heading,
    fontSize: 24,
  },
  from: {
    color: colors.purple,
    fontFamily: fonts.complement,
  },
  hr: {
    backgroundColor: colors.purple,
    width: "100%",
    height: 5,
    borderRadius: 10,
    marginVertical: 12.5,
  },
  counter: {
    color: colors.purple,
    fontFamily: fonts.complement,
    alignSelf: "flex-end",
  },
  containerThumbnail: {
    flexDirection: "row",
    width: 130,
  },
  thumbnailItem: {
    width: 65,
    height: 65,
  },
});
