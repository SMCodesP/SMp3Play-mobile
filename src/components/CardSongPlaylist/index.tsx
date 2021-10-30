import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import FastImage from "react-native-fast-image";

import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

const CardSongPlaylist: React.FC<any> = ({ item }) => {
  return (
    <View style={styles.container}>
      <FastImage style={styles.image} source={{ uri: item.thumbnail }} />
      <View style={styles.containerInfo}>
        <Text style={styles.title}>{item.title}</Text>
      </View>
    </View>
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
  buttonDrag: {
    alignSelf: 'center',
    // backgroundColor: 'red',
    // alignItems: 'center',
    // justifyContent: 'center'
    height: 30,
  }
})

export default CardSongPlaylist
