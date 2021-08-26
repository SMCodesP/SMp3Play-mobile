import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import { DownloadTask } from 'react-native-background-downloader'

import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import TouchableScalable from '../TouchableScalable';

import { darken } from 'polished';

import { useNavigation } from '@react-navigation/native';
import { useSong } from '../../contexts/player';

import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

export const CardSongDownloaded: React.FC<{
  id: string;
}> = ({ id }) => {
  const navigation = useNavigation();
  const song = useSong(id)

  const handleNavigationToSong = () => {
    navigation.navigate("Details", {
      videoId: id
    })
  }

  return (
    <TouchableScalable
      rectButton={true}
      duration={50}
      scaleTo={0.95}
      delayPressOut={100}
      rippleColor={darken(0.1, colors.comment)}
      buttonStyle={styles.container}
      onPress={handleNavigationToSong}
      style={{
        flex: 1,
        flexDirection: 'row',
      }}
    >
      <FastImage source={{ uri: song?.thumbnail }} style={styles.image}>
        <LinearGradient
          style={{
            flex: 1
          }}
          start={{ x: -1, y: 0 }}
          end={{ x: 1, y: 0 }}
          locations={[0, 1, 0]}
          colors={['#00000000',  colors.comment, '#00000000']}
        />
      </FastImage>
      <View style={styles.info}>
        <Text style={styles.title}>{song?.title}</Text>
        <Text style={styles.author}>{song?.author.name}</Text>
      </View>
      <View style={styles.containerButtons}>
        <MaterialCommunityIcons
          size={32}
          color={colors.foreground}
          name="check"
          style={styles.button}
        />
      </View>
    </TouchableScalable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 132,
    marginVertical: 10,
    backgroundColor: colors.comment,
    borderRadius: 10,
    flexDirection: 'row',
  },
  image: {
    width: "30%",
    height: 132,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  info: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  title: {
    color: colors.foreground,
    fontFamily: fonts.text
  },
  author: {
    color: colors.purple,
    fontFamily: fonts.complement
  },
  containerButtons: {
    flexDirection: 'row',
    paddingRight: 10
  },
  button: {
    width: 42,
    height: 42,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  }
})