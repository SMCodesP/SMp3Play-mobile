import React, { useEffect, useState } from "react";

import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  processColor,
  FlatList,
  Modal,
} from "react-native";

import { SpringScrollView } from "react-native-spring-scrollview";
import Animated, { Extrapolate, interpolateColor, useAnimatedStyle, useDerivedValue, useSharedValue, useValue, withTiming } from "react-native-reanimated";
import LinearGradient from "react-native-linear-gradient";
import { RectButton, State, TouchableOpacity } from "react-native-gesture-handler";
import FastImage from "react-native-fast-image";
import { useNavigation } from "@react-navigation/native";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import { darken, rgb } from 'polished'
import DraggableFlatList from 'react-native-draggable-flatlist'

import GlobalContainer from "../components/GlobalContainer";

import colors from "../styles/colors";
import fonts from "../styles/fonts";
import CardSongPlaylist from "../components/CardSongPlaylist";
import { usePlaylist, usePlaylistInfo } from "../contexts/playlist";
import TouchableScalable from "../components/TouchableScalable";
import { useDownloads } from "../contexts/downloads";

const SpringScroll = Animated.createAnimatedComponent(SpringScrollView);

const { width } = Dimensions.get("window");

const IMAGE_HEIGHT = 275

export const Playlist: React.FC<{
  route: {
    params: {
      playlist: TPlaylist
    };
  };
}> = ({
  route: {
    params: {
      playlist: data
    },
  },
}) => {
  const [moving, setMoving] = useState(false);
  const { playlist, setPlaylist } = usePlaylistInfo(data.name)
  const { handlePlayPlaylist } = usePlaylist()
  const { handleDownloadPlaylist } = useDownloads()

  const navigation = useNavigation();
  const scrollY = useValue(0);

  const handleBack = async () => {
    navigation.goBack()
  }

  const handleSearchSong = async () => {
    navigation.navigate("SearchAddPlaylist", {
      playlist: playlist.name
    })
  }

  const handleDownload = async () => {
    handleDownloadPlaylist(playlist.name);
    navigation.navigate("Downloads")
  }

  return (
    <GlobalContainer>
      <Animated.View
        style={{
          ...StyleSheet.absoluteFillObject,
          top: 0,
          height: IMAGE_HEIGHT,
          width: '100%',
          transform: [
            {
              translateY: scrollY.interpolate({
                inputRange: [0, IMAGE_HEIGHT],
                outputRange: [0, -IMAGE_HEIGHT],
                extrapolate: Extrapolate.CLAMP,
              }),
              scale: scrollY.interpolate({
                inputRange: [-IMAGE_HEIGHT * 2, 0],
                outputRange: [5.5, 1],
                extrapolate: Extrapolate.CLAMP,
              }),
            },
          ],
        }}
      >
        <View style={styles.containerThumbnail}>
          <View>
            {playlist?.songs[0] && <FastImage style={styles.thumbnailItem} source={{ uri: playlist?.songs[0].thumbnail }} />}
            {playlist?.songs[1] && <FastImage style={styles.thumbnailItem} source={{ uri: playlist?.songs[1].thumbnail }} />}
          </View>
          <View>
            {playlist?.songs[2] && <FastImage style={styles.thumbnailItem} source={{ uri: playlist?.songs[2].thumbnail }} />}
            {playlist?.songs[3] && <FastImage style={styles.thumbnailItem} source={{ uri: playlist?.songs[3].thumbnail }} />}
          </View>
        </View>
        <LinearGradient 
          style={{
            ...StyleSheet.absoluteFillObject,
            flex: 1,
          }}
          locations={[0, 1, 0]}
          colors={['#00000044', colors.background, '#00000000']}
        >
          <TouchableOpacity
            style={{
              margin: 15,
              width: 40,
              height: 40
            }}
            onPress={handleBack}
          >
            <Feather
              name="chevron-left"
              size={40}
              color={colors.foreground}
            />
          </TouchableOpacity>
        </LinearGradient>
      </Animated.View>
      <SpringScroll
        scrollEnabled={!moving}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
      >
        <View style={styles.containerBody}>
          <Text style={styles.title}>{playlist?.name}</Text>
          <TouchableScalable
            buttonStyle={styles.containerButton}
            rippleColor={colors.pink}
            rectButton={true}
            duration={100}
            scaleTo={0.95}
            onPressOut={() => {
              if (playlist) {
                handlePlayPlaylist(playlist.name)
              }
            }}
            enabled={playlist?.songs.length !== 0}
          >
            <View style={[styles.button, {
              borderColor: darken(0.1, colors.pink)
            }]} accessible>
              <Ionicons name="play" size={26} color={darken(0.1, colors.pink)} />
              <Animated.Text style={[styles.textButton, {
                color: darken(0.1, colors.pink)
              }]}>Tocar</Animated.Text>
            </View>
          </TouchableScalable>
        </View>
        {playlist && playlist?.songs.length !== 0 ? <DraggableFlatList
          data={playlist.songs}
          keyExtractor={(item) => item.videoId}
          renderItem={(props) => <CardSongPlaylist setMoving={setMoving} {...props} />}
          scrollEnabled={false}
          activationDistance={moving ? 1 : 100000000}
          onDragBegin={() => setMoving(true)}
          onDragEnd={({ data: newData }) => {
            setPlaylist(newData.map(song => song.videoId))
            setMoving(false)
          }}
          initialNumToRender={playlist.songs.length}
        /> : (
          <>
            <Text style={styles.emptyPlaylistText}>Nenhuma música na playlist</Text>
            <TouchableScalable
              buttonStyle={[styles.containerButton, {
                backgroundColor: darken(0.1, colors.purple),
              }]}
              rippleColor={colors.purple}
              rectButton={false}
              duration={100}
              scaleTo={0.95}
              onPress={handleSearchSong}
            >
              <View style={[styles.button, {
                borderColor: darken(0.1, colors.purple),
                borderWidth: 0
              }]} accessible>
                <Ionicons name="search" size={26} color={colors.background} />
                <Animated.Text style={[styles.textButton, {
                  color: colors.background
                }]}>Adicionar música</Animated.Text>
              </View>
            </TouchableScalable>
          </>
        )}
      </SpringScroll>
      <RectButton style={styles.sync} onPress={handleDownload}>
        <View style={styles.align} accessible>
          <Ionicons name="ios-download" size={28} color={colors.foreground} />
        </View>
      </RectButton>
    </GlobalContainer>
  );
};

const styles = StyleSheet.create({
  containerThumbnail: {
    flexDirection: 'row',
    flex: 1,
    top: -1,
    height: IMAGE_HEIGHT,
    backgroundColor: colors.comment,
  },
  thumbnailItem: {
    width: width / 2,
    height: IMAGE_HEIGHT / 2,
  },
  containerBody: {
    paddingTop: IMAGE_HEIGHT,
    marginBottom: 10
  },
  title: {
    fontFamily: fonts.heading,
    color: colors.foreground,
    fontSize: 32,
    paddingHorizontal: 10,
    textAlign: "center",
    marginBottom: 10
  },
  containerButton: {
    borderRadius: 100,
    height: 50,
    width: "65%",
    alignSelf: "center",
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    height: 50,
    width: "100%",
    borderWidth: 1,
    borderColor: darken(0.1, colors.pink),
  },
  textButton: {
    color: darken(0.1, colors.pink),
    marginLeft: 15,
    fontFamily: fonts.complement,
    fontSize: 18
  },
  sync: {
    position: "absolute",
    bottom: 10,
    right: 20,
    borderRadius: 32,
    width: 52,
    height: 52,
    backgroundColor: colors.comment,
    alignItems: "center",
    justifyContent: "center"
  },
  align: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  emptyPlaylistText: {
    fontFamily: fonts.heading,
    color: colors.foreground,
    fontSize: 24,
    paddingHorizontal: 10,
    marginTop: 20,
    textAlign: "center",
    marginBottom: 10
  }
});
