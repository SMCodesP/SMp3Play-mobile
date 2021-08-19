import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import { DownloadTask } from 'react-native-background-downloader'
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { transparentize } from 'polished'

export const CardSongDownload: React.FC<{
  song: TMinimalInfo;
}> = ({ song }) => {
  return (
    <View style={styles.container}>
      <FastImage source={{ uri: song.thumbnail }} style={styles.image}>
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
        <Text style={styles.title}>{song.title}</Text>
        <Text style={styles.author}>{song.author.name}</Text>
      </View>
      <View style={styles.containerButtons}>
        <TouchableOpacity style={styles.button}>
          <AnimatedCircularProgress
            size={42}
            width={2}
            fill={5}
            rotation={0}
            tintColor={colors.purple}
            backgroundColor={transparentize(0.75, colors.purple)}
            children={() => (
              <MaterialCommunityIcons
                size={32}
                color={colors.foreground}
                name="pause"
              />
            )}
          />
        </TouchableOpacity> 
      </View>
    </View>
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
    // height: 42,
    // padding: 0,
    // borderRadius: 64,
    // borderWidth: 1,
    // borderColor: colors.foreground,
  }
})