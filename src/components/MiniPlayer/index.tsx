import React from 'react';
import { View, StyleSheet, Image, Text, Dimensions, TouchableOpacity } from 'react-native';
import TrackPlayer, { usePlaybackState, useTrackPlayerProgress, STATE_PAUSED } from 'react-native-track-player';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import TextTicker from 'react-native-text-ticker'

import { usePlayer } from '../../contexts/player';
import colors from '../../styles/colors';

function ProgressBar() {
  const { position, duration } = useTrackPlayerProgress();

  return (
    <View style={styles.progressContainer}>
      <View style={{flex: position, ...styles.progressSneek}} />
      <View
        style={{
          flex: duration - position,
          ...styles.progressBackground
        }}
      />
    </View>
  );
}

export const MiniPlayer: React.FC = () => {
  const { track } = usePlayer()
  const playbackState = usePlaybackState();

  const play = async () => {
    await TrackPlayer.pause();
  }

  const pause = async () => {
    await TrackPlayer.play();
  }

  return track && (
    <View style={styles.container}>
      <ProgressBar />
      <View style={styles.containerMiniPlayer}>
        <Image
          style={styles.artwork}
          source={{uri: String(track?.artwork || '')}}
        />
        <View>
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
          <Text style={styles.author}>{track?.artist}</Text>
        </View>
        {playbackState === STATE_PAUSED ? (
          <TouchableOpacity style={{ alignSelf: 'center' }} onPress={pause}>
            <MaterialCommunityIcons
              size={42}
              color={colors.foreground}
              style={styles.control}
              name="play"
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={{ alignSelf: 'center' }} onPress={play}>
            <MaterialCommunityIcons
              size={42}
              color={colors.foreground}
              style={styles.control}
              name="pause"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 65,
    backgroundColor: colors.background,
    // borderBottomWidth: 2,
    // borderBottomColor: colors.comment,
    position: 'absolute',
    bottom: 45,
  },
  progressContainer: {
    height: 1,
    width: '100%',
    flexDirection: 'row',
  },
  progressBackground: {
    backgroundColor: colors.currentLine,
  },
  progressSneek: {
    backgroundColor: colors.pink,
  },
  containerMiniPlayer: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
  artwork: {
    width: 50,
    height: 50,
    alignSelf: 'center',
    borderRadius: 10,
    opacity: 0.75,
    marginRight: 10,
  },
  title: {
    width: Dimensions.get("window").width - 130,
    color: colors.foreground,
    fontSize: 15,
    fontWeight: 'bold',
    paddingTop: 5
  },
  author: {
    color: colors.purple,
    fontWeight: 'bold',
    fontSize: 12,
  },
  control: {
    alignSelf: 'center',
  }
})
