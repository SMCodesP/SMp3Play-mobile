import React, { memo, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {
  RenderItemParams,
} from "react-native-draggable-flatlist";

import FastImage from "react-native-fast-image";
import Animated, { useAnimatedStyle, useDerivedValue, withTiming, useSharedValue, interpolateColor } from 'react-native-reanimated';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

interface CardSongPlaylistProps extends RenderItemParams<TMinimalInfo> {
  setMoving: React.Dispatch<React.SetStateAction<boolean>>;
}

const CardSongPlaylist: React.FC<CardSongPlaylistProps> = ({ item, setMoving, drag, isActive }) => {
  const value = useSharedValue(0)

  useEffect(() => {
    if (isActive) {
      value.value = 1;
    } else {
      value.value = 0;
    }
  }, [isActive])

  const progress = useDerivedValue(() =>
    value.value
      ? withTiming(1, { duration: 500 })
      : withTiming(0, { duration: 500 })
  );

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(progress.value, [0, 1], ["transparent", colors.comment + "55"]),
    borderColor: interpolateColor(progress.value, [0, 1], ["transparent", colors.comment]),
  }));

  return (
    <Animated.View style={[styles.container, {
      borderWidth: 1,
    }, animatedStyle]}>
      <FastImage style={styles.image} source={{ uri: item.thumbnail }} />
      <View style={styles.containerInfo}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.author}>{item.author.name}</Text>
      </View>
        <View style={styles.buttonDrag}>
          <TouchableOpacity style={{ flex: 1 }} delayLongPress={100} onPressOut={() => setMoving(false)} onLongPress={drag}>
            <MaterialIcons name="drag-handle" size={30} color={colors.foreground} />
          </TouchableOpacity>
        </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: "100%",
    paddingLeft: 10,
    paddingRight: 15,
    paddingVertical: 15,
  },
  image: {
    width: 144,
    height: 86,
    borderRadius: 10
  },
  containerInfo: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    color: colors.foreground,
    fontFamily: fonts.text,
    fontSize: 14,
  },
  author: {
    color: colors.comment,
    fontFamily: fonts.complement
  },
  buttonDrag: {
    alignSelf: 'center',
    height: 30,
  }
})

export default memo(CardSongPlaylist)
