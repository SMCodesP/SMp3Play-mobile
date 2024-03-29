import React, { useCallback, useEffect, useState } from "react";

import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  ActivityIndicator,
  Modal,
  FlatList,
} from "react-native";

import TrackPlayer, { State, usePlaybackState } from "react-native-track-player";
import ytdl from "react-native-ytdl";

import { SpringScrollView } from "react-native-spring-scrollview";
import Animated, { Extrapolate, useValue } from "react-native-reanimated";
import LinearGradient from "react-native-linear-gradient";
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import { darken, lighten, transparentize } from "polished";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

import { useCreator, usePlayer, useSong } from "../contexts/player";

import GlobalContainer from "../components/GlobalContainer";

import { formatNumber } from "../utils/formatNumber";
import { getRandomInt } from "../utils/randomNumber";

import 'sugar/locales/pt'
import Sugar from 'sugar'
import FastImage from "react-native-fast-image";
import { RectButton, TouchableOpacity } from "react-native-gesture-handler";
import { isOnPlaylist, usePlaylist } from "../contexts/playlist";
import { BlurView } from "@react-native-community/blur";

import { Radio } from "../components/Radio";
import { CardPlaylistSelection } from "../components/CardPlaylistSelection";
import TouchableScalable from "../components/TouchableScalable";
import { msToHMS } from "../utils/msToMHS";

const SpringScroll = Animated.createAnimatedComponent(SpringScrollView);
const AnimatedImageBackground = Animated.createAnimatedComponent(FastImage as any) as any;

const IMAGE_HEIGHT = 275

const Details: React.FC<{
  route: {
    params: {
      video: TMinimalInfo | null;
      videoId: string;
    };
  };
  navigation: any;
}> = ({
  route: {
    params: {
      videoId,
    },
  },
  navigation,
}) => {
  const [loadingTrack, setLoadingTrack] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const { handlePlaySong, track } = usePlayer();
  const { toggleSongInPlaylist, playlists } = usePlaylist();
  const video = useSong(videoId);

  const playbackState = usePlaybackState();
  const scrollY = useValue(0);

  const isLiked = isOnPlaylist(videoId, "Favoritos");

  const handlePlay = async () => {
    if (track) {
      if (track?.extra.videoId === video?.videoId) return await TrackPlayer.play();
    }
    setLoadingTrack(true);
    await TrackPlayer.destroy();
    if (video) {
      await handlePlaySong(video);
    }
    setLoadingTrack(false);
  }

  const handlePause = async () => {
    await TrackPlayer.pause();
  }

  const handleBack = async () => {
    navigation.goBack()
  }

  return (
    <GlobalContainer>
      {video ? (
        <AnimatedImageBackground
          source={{ uri: video!.thumbnail }}
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
          <LinearGradient 
            style={{
              flex: 1,
              top: 1
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
        </AnimatedImageBackground>
      ) : (
        <Animated.View
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: darken(0.15, colors.comment),
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
          <LinearGradient 
            style={{
              flex: 1,
              top: 1,
            }}
            locations={[0, 1, 0]}
            colors={['#00000000', colors.background, '#00000000']}
          />
          <TouchableOpacity
            style={{
              ...StyleSheet.absoluteFillObject,
              top: 15,
              left: 15,
            }}
            onPress={handleBack}
          >
            <Feather
              style={{
                ...StyleSheet.absoluteFillObject,
                top: 15,
                left: 15
              }}
              name="chevron-left"
              size={40}
              color={colors.foreground}
            />
          </TouchableOpacity>
        </Animated.View>
      )}
      <SpringScroll
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
      >
        <View style={styles.containerBody}>
          <View style={styles.containerHeaderInfo}>
            <SkeletonContent
              isLoading={!video}
              containerStyle={{ padding: 0, margin: 0 }}
              boneColor={darken(0.15, colors.comment)}
              highlightColor={darken(0.1, colors.comment)}
              animationType="pulse"
              duration={2500}
              layout={[
                { key: 'description1', width: 152, height: 152, borderRadius: 20, padding: 0, margin: 0 },
              ]}
            >
              <FastImage style={styles.authorAvatar} source={{ uri: String(video?.creator?.authorThumbnail.url || '') }} />
            </SkeletonContent>
            <View style={styles.containerTitle}>
              <SkeletonContent
                isLoading={!video}
                containerStyle={{ padding: 0, margin: 0 }}
                boneColor={darken(0.15, colors.comment)}
                highlightColor={darken(0.1, colors.comment)}
                animationType="pulse"
                duration={2500}
                layout={[
                  { key: 'title', width: `${getRandomInt(45, 100)}%`, height: 16, margin: 15 },
                ]}
              >
                <Text style={styles.title}>{video?.title}</Text>
              </SkeletonContent>
              <View style={styles.containerButtons}>
                <SkeletonContent
                  isLoading={!video}
                  containerStyle={{ ...styles.containerButtons }}
                  boneColor={darken(0.15, colors.comment)}
                  highlightColor={darken(0.1, colors.comment)}
                  animationType="pulse"
                  duration={2500}
                  layout={[
                    { key: 'button1', width: 72, height: 42, marginLeft: 15, borderRadius: 10 },
                    { key: 'button2', width: 72, height: 42, marginLeft: 15, borderRadius: 10 },
                    { key: 'button3', width: 72, height: 42, marginLeft: 15, borderRadius: 10 },
                  ]}
                >
                  <RectButton
                    style={[styles.button, {
                      backgroundColor: colors.cyan
                    }]}
                    onPress={track?.extra.videoId === video?.videoId ? (playbackState === State.Paused ? handlePlay : handlePause) : handlePlay}
                    enabled={!loadingTrack}
                    rippleColor={darken(0.1, colors.cyan)}
                  >
                    <View accessible>
                      {loadingTrack ? (
                        <ActivityIndicator size="small" color={colors.background} />
                      ) : (
                        <Ionicons name={track?.extra.videoId === video?.videoId ? (playbackState === State.Paused ? "play" : "pause") : "play"} size={26} color={colors.background} />
                      )}
                    </View>
                  </RectButton>
                  <RectButton
                    style={[styles.button, {
                      backgroundColor: colors.pink
                    }]}
                    rippleColor={darken(0.1, colors.pink)}
                    onPress={() => video && toggleSongInPlaylist(video, "Favoritos")}
                  >
                    <View accessible>
                      <AntDesign name={isLiked ? "heart" : "hearto"} size={26} color={colors.background} />
                    </View>
                  </RectButton>
                  <RectButton
                    style={[styles.button, {
                      backgroundColor: colors.yellow
                    }]}
                    rippleColor={darken(0.1, colors.yellow)}
                    onPress={() => setModalIsOpen(true)}
                  >
                    <View accessible>
                      <Ionicons name={"add"} size={26} color={colors.background} />
                    </View>
                  </RectButton>
                </SkeletonContent>
              </View>
            </View>
          </View>
          <SkeletonContent
            containerStyle={{ padding: 20 }}
            isLoading={!video}
            boneColor={darken(0.15, colors.comment)}
            highlightColor={darken(0.1, colors.comment)}
            animationType="pulse"
            duration={2500}
            layout={[
              { key: 'description1', width: `${getRandomInt(45, 100)}%`, height: 16, marginBottom: 6 },
              { key: 'description2', width: `${getRandomInt(45, 100)}%`, height: 16, marginBottom: 6 },
              { key: 'description3', width: `${getRandomInt(45, 100)}%`, height: 16, marginBottom: 6 },
              { key: 'description5', width: `${getRandomInt(45, 100)}%`, height: 16, marginBottom: 6 },
              { key: 'description6', width: `${getRandomInt(45, 100)}%`, height: 16, marginBottom: 6 },
              { key: 'description7', width: `${getRandomInt(45, 100)}%`, height: 16, marginBottom: 6 },
              { key: 'description8', width: `${getRandomInt(45, 100)}%`, height: 16, marginBottom: 6 },
              { key: 'channel', width: `${getRandomInt(25, 45)}%`, height: 16, marginTop: 20, marginBottom: 6 },
              { key: 'views', width: `${getRandomInt(25, 45)}%`, height: 16, marginTop: 20, marginBottom: 6 },
              { key: 'duration', width: `${getRandomInt(25, 45)}%`, height: 16, marginBottom: 6 },
              { key: 'published', width: `${getRandomInt(25, 45)}%`, height: 16, marginBottom: 6 },
            ]}
          >
            <Text style={styles.description}>{video?.description}</Text>
            <View style={styles.containerInfo}>
              <Text style={styles.info}>
                <Text style={styles.span}>Autor:</Text> {String(video?.creator?.author)}
              </Text>
              <Text style={styles.info}>
                <Text style={styles.span}>Views:</Text> {formatNumber(Number(video?.views || '1'))}
              </Text>
              <Text style={styles.info}>
                <Text style={styles.span}>Duração:</Text> {msToHMS(Number(video?.timestamp))}
              </Text>
              <Text style={styles.info}>
                <Text style={styles.span}>Postado:</Text> {video?.ago}
              </Text>
            </View>
          </SkeletonContent>
        </View>
      </SpringScroll>
      <Modal animationType="fade" transparent={true} visible={modalIsOpen} statusBarTranslucent={true}>
        <BlurView style={styles.blurModal} blurAmount={2} blurRadius={10} overlayColor={transparentize(0.5, colors.background)} />
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Adicionar às playlists:</Text>
            {video && <FlatList
              data={playlists}
              keyExtractor={({ name }) => name}
              renderItem={({ item }) => <CardPlaylistSelection item={item} video={video} />}
            />}
            <View>
              <TouchableScalable
                buttonStyle={styles.containerButtonModal}
                duration={100}
                scaleTo={0.95}
                style={[styles.modalButton, {
                  backgroundColor: colors.comment
                }]}
                delayPressOut={100}
                onPressOut={() => setModalIsOpen(false)}
              >
                <Ionicons name="ios-save" size={26} color={colors.foreground} />
                <Animated.Text style={styles.textButtonModal}>Salvar</Animated.Text>
              </TouchableScalable>
            </View>
          </View>
        </View>
      </Modal>
    </GlobalContainer>
  );
};

const styles = StyleSheet.create({
  containerImage: {
    flex: 1,
  },
  containerHeader: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.background,
    borderBottomWidth: 2,
    borderBottomColor: colors.comment,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  containerAuthor: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingRight: 45,
    paddingLeft: 25,
  },
  authorName: {
    fontSize: 24,
    fontFamily: fonts.complement,
    color: colors.foreground,
    fontWeight: "bold",
  },
  containerBody: {
    marginHorizontal: 10,
    paddingTop: IMAGE_HEIGHT,
  },
  description: {
    fontSize: 16,
    fontFamily: fonts.text,
    color: colors.foreground,
  },
  containerInfo: {
    paddingVertical: 20,
  },
  info: {
    fontSize: 15,
    color: colors.pink,
  },
  span: {
    fontSize: 16,
    color: colors.foreground,
    fontFamily: fonts.complement,
  },
  authorAvatar: {
    width: 152,
    height: 152,
    borderRadius: 20
  },
  containerHeaderInfo: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    top: -64
  },
  containerTitle: {
    flex: 1,
  },
  title: {
    color: colors.foreground,
    fontFamily: fonts.heading,
    margin: 15
  },
  containerButtons: {
    flexDirection: 'row'
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 72,
    height: 42,
    marginLeft: 15,
    borderRadius: 10
  },
  blurModal: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: "90%",
    flex: 1,
    backgroundColor: lighten(0.1, colors.background),
    borderRadius: 15,
    paddingHorizontal: 25,
    marginTop: 65,
    marginBottom: 45,
    paddingVertical: 15
  },
  modalTitle: {
    color: colors.foreground,
    fontSize: 26,
    fontFamily: fonts.heading,
  },
  containerButtonModal: {
    marginTop: 10,
    borderRadius: 50,
    height: 50,
    width: "75%",
    alignSelf: "center",
  },
  textButtonModal: {
    color: colors.foreground,
    marginLeft: 15,
    fontFamily: fonts.complement,
    fontSize: 18
  },
  modalButton: {
    borderRadius: 50,
    height: 50,
    width: "100%",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Details;
