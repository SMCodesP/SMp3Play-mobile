import React, { memo, useCallback, useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { AntDesign, Feather as Icon } from "@expo/vector-icons";
import FastImage from "react-native-fast-image";

import colors from "../../styles/colors";
import { transparentize } from "polished";
import TextTicker from "react-native-text-ticker";
import { usePlayer } from "../../contexts/player";
import fonts from "../../styles/fonts";
import TrackPlayer, {
  State,
  usePlaybackState,
  useProgress,
} from "react-native-track-player";
import Seek from './Seek'
import { CardVideoPlaying } from "./CardVideoPlaying";
import TouchableScalable from "../TouchableScalable";
import { msToHMS } from "../../utils/msToMHS";

const { width } = Dimensions.get("window");

interface PlayerProps {
  onPress: () => void;
}

const Player = ({ onPress }: PlayerProps) => {
  const { track, repeating, queue, toggleRepeat } = usePlayer();
  const { duration, position } = useProgress(250);
  const playbackState = usePlaybackState();
  
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
        <FastImage source={{ uri: String(track?.artwork || '') }} style={styles.cover} />
        <View style={styles.metadata}>
          <View>
            <Text style={styles.song}>
              {String(track?.title).substring(0, 14).trim() +
                (String(track?.title).trim().length > 14 ? "..." : "")}
            </Text>
            <Text style={styles.artist}>{track?.artist}</Text>
          </View>
          <AntDesign name="hearto" size={24} color={colors.pink} />
        </View>
        <Seek
          value={position}
          duration={duration}
        />
        <View style={styles.containerTime}>
          <Text style={styles.time}>{msToHMS(position)}</Text>
          <Text style={styles.time}>{msToHMS(duration)}</Text>
        </View>
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
              size={46}
            />
          </TouchableOpacity>
          <TouchableScalable
            duration={50}
            scaleTo={0.925}
            onPress={playbackState === State.Paused ? pause : play}
            activeOpacity={0.5}
          >
            <AntDesign
              name={playbackState === State.Paused ? "play" : "pausecircle"}
              color={colors.foreground}
              size={60}
            />
          </TouchableScalable>
          <TouchableOpacity>
            <AntDesign name="stepforward" color={colors.foreground} size={46} />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleRepeat}>
            <Icon
              name="repeat"
              color={repeating ? colors.foreground : transparentize(0.5, colors.foreground)}
              size={24}
              style={{
                alignSelf: 'center'
              }}
            />
            {repeating && (
              <View style={styles.ball} />
            )}
          </TouchableOpacity>
        </View>
        <FlatList
          data={queue}
          renderItem={({ index, item }) => (
            <CardVideoPlaying index={index} item={item} />
          )}
          keyExtractor={(item) => item.id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={styles.listQueue}
        />
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
  ball: {
    width: 5,
    height: 5,
    borderRadius: 5,
    marginTop: 8,
    alignSelf: 'center',
    backgroundColor: colors.foreground,
  },
  listQueue: {
    marginTop: 25
  },
  containerTime: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  time: {
    fontFamily: fonts.text,
    color: colors.foreground,
  }
});

export default memo(Player);
