import React, { memo, useCallback, useEffect, useState } from "react";
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { AntDesign, Feather as Icon } from "@expo/vector-icons";
import FastImage from "react-native-fast-image";
import { debounce } from "lodash";

import colors from "../../styles/colors";
import { transparentize, darken } from "polished";
import TextTicker from "react-native-text-ticker";
import { usePlayer } from "../../contexts/player";
import fonts from "../../styles/fonts";
import TrackPlayer, {
  STATE_PAUSED,
  usePlaybackState,
  useTrackPlayerProgress,
} from "react-native-track-player";
import Seek from './Seek'

const { width } = Dimensions.get("window");

interface PlayerProps {
  onPress: () => void;
}

const Player = ({ onPress }: PlayerProps) => {
  const [sliderValue, setSliderValue] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);

  const { track } = usePlayer();
  const { duration, position } = useTrackPlayerProgress(250);
  const playbackState = usePlaybackState();

  useEffect(() => {
    if (!isSeeking && position) {
      setSliderValue(position);
    }
  }, [position]);

  const play = async () => {
    await TrackPlayer.pause();
  };

  const pause = async () => {
    await TrackPlayer.play();
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>
        <View style={styles.header}>
          <RectButton
            style={styles.button}
            rippleColor={transparentize(0.7, colors.pink)}
            onEnded={onPress}
            hitSlop={5}
          >
            <View accessible>
              <Icon name="chevron-down" color={colors.foreground} size={24} />
            </View>
          </RectButton>
          <TextTicker
            style={styles.title}
            duration={3000}
            bounce={false}
            shouldAnimateTreshold={0}
            animationType="scroll"
            repeatSpacer={50}
            marqueeDelay={0}
          >
            {track?.title}
          </TextTicker>
          {/* <Text style={styles.title}>The Bay</Text> */}
          <RectButton
            style={styles.button}
            rippleColor={transparentize(0.7, colors.pink)}
          >
            <View accessible>
              <Icon name="more-horizontal" color={colors.foreground} size={24} />
            </View>
          </RectButton>
        </View>
        <FastImage source={{ uri: track?.artwork }} style={styles.cover} />
        <View style={styles.metadata}>
          <View>
            <Text style={styles.song}>
              {track?.title.substring(0, 14).trim() +
                (track!.title.trim().length > 14 ? "..." : "")}
            </Text>
            <Text style={styles.artist}>{track?.artist}</Text>
          </View>
          <AntDesign name="hearto" size={24} color={colors.pink} />
        </View>
        <Seek
          value={sliderValue}
          duration={duration}
          setIsSeeking={setIsSeeking}
          setSliderValue={setSliderValue}
        />
        <View style={styles.controls}>
          <TouchableOpacity>
            <Icon
              name="shuffle"
              color={transparentize(0.5, colors.foreground)}
              size={24}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <AntDesign
              name="stepbackward"
              color={colors.foreground}
              size={32}
            />
          </TouchableOpacity>
          <TouchableOpacity onPressOut={playbackState === STATE_PAUSED ? pause : play}>
            <AntDesign
              name={playbackState === STATE_PAUSED ? "play" : "pausecircle"}
              color={colors.foreground}
              size={48}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <AntDesign name="stepforward" color={colors.foreground} size={32} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon
              name="repeat"
              color={transparentize(0.5, colors.foreground)}
              size={24}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    left: 0,
    top: 0,
    right: 0,
  },
  container: {
    margin: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    padding: 16,
    borderRadius: 10,
  },
  title: {
    width: Dimensions.get("window").width - 160,
    color: colors.foreground,
    padding: 16,
  },
  cover: {
    marginVertical: 16,
    width: width - 32,
    height: width - 32,
    borderRadius: 25,
  },
  metadata: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  song: {
    fontSize: 32,
    fontWeight: "bold",
    color: colors.foreground,
  },
  artist: {
    color: colors.comment,
    fontSize: 16,
    fontFamily: fonts.complement,
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  slider: {
    // backgroundColor: transparentize(0.5, colors.foreground),
    width: width - 32,
    borderRadius: 2,
    height: 4,
    marginVertical: 16,
  },
});

export default memo(Player);
