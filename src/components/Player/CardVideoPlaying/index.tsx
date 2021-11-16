import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import FastImage from "react-native-fast-image";
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import TrackPlayer, { Track } from "react-native-track-player";
import { usePlayer } from "../../../contexts/player";

import colors from "../../../styles/colors";
import fonts from "../../../styles/fonts";
import { TouchableScalable } from "../../Buttons/TouchableScalable";

interface CardVideoProps {
  item: Track;
  index: number;
}

export const CardVideoPlaying: React.FC<CardVideoProps> = ({
  index,
  item: track,
}) => {
  const { track: currentTrack } = usePlayer();

  const handleSkip = () => {
    if (currentTrack?.id === track.id) return;
    TrackPlayer.skip(index);
    return;
  };

  return (
    <TouchableScalable
      duration={25}
      scaleTo={0.95}
      buttonStyle={styles.containerGeral}
      onPress={handleSkip}
    >
      {track.extra ? (
        <FastImage
          style={styles.thumbnail}
          source={{ uri: String(track.artwork) }}
        >
          <View style={styles.container}>
            {currentTrack?.id === track.id && (
              <Text style={styles.playing}>Tocando</Text>
            )}
            <View style={styles.containerTitle}>
              <Text style={styles.title}>
                {String(track.title).substring(0, 50).trim() +
                  (String(track.title).length > 50 ? "..." : "")}
              </Text>
            </View>
          </View>
        </FastImage>
      ) : (
        <View
          style={[
            styles.container,
            {
              justifyContent: "center",
              alignItems: "center",
            },
          ]}
        >
          <Text style={styles.hidden}>Supresa!</Text>
        </View>
      )}
    </TouchableScalable>
  );
};

const styles = StyleSheet.create({
  containerGeral: {
    width: 175,
    height: 175,
    marginHorizontal: 2.5,
  },
  thumbnail: {
    flex: 1,
    borderRadius: 12,
  },
  container: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, .6)",
    justifyContent: "space-between",
    borderRadius: 12,
  },
  playing: {
    fontSize: 12,
    color: colors.purple,
    fontFamily: fonts.complement,
    padding: 8,
    textAlign: "right",
  },
  containerTitle: {
    flex: 1,
    justifyContent: "flex-end",
  },
  title: {
    fontSize: 12,
    color: colors.foreground,
    fontFamily: fonts.complement,
    padding: 8,
  },
  hidden: {
    color: colors.foreground,
    fontSize: 14,
    textAlign: "center",
    fontFamily: fonts.complement,
  },
});
