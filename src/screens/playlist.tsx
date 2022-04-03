import React, { useState } from "react";

import { View, StyleSheet, Dimensions, Text, FlatList } from "react-native";

import Animated, { Extrapolate, useValue } from "react-native-reanimated";
import LinearGradient from "react-native-linear-gradient";
import { RectButton, BorderlessButton } from "react-native-gesture-handler";
import FastImage from "react-native-fast-image";
import { useNavigation } from "@react-navigation/native";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import { darken, transparentize } from "polished";
import DraggableFlatList from "react-native-draggable-flatlist";

import GlobalContainer from "../components/GlobalContainer";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

import CardSongPlaylist from "../components/CardSongPlaylist";
import { usePlaylist, usePlaylistInfo } from "../contexts/playlist";
import { TouchableScalable } from "../components/Buttons/TouchableScalable";
import { useDownloads } from "../contexts/downloads";
import { AnimatedMyScrollView } from "../components/MyScrollView";
import ModalOptionsPlaylist from "../components/Modals/ModalOptionsPlaylist";
import DraggableList from "../components/DraggableList";
import { usePlayer } from "../contexts/player";

const { width } = Dimensions.get("window");

const IMAGE_HEIGHT = 275;

export const Playlist: React.FC<{
  route: {
    params: {
      playlist: TPlaylist;
    };
  };
}> = ({
  route: {
    params: { playlist: data },
  },
}) => {
  const [moving, setMoving] = useState(false);
  const [optionsIsOpened, setOptionsIsOpened] = useState(false);
  const { playlist, setPlaylist } = usePlaylistInfo(data.name);
  const { handlePlayPlaylist, deletePlaylist } = usePlaylist();
  const { track } = usePlayer();
  const { handleDownloadPlaylist } = useDownloads();

  const navigation = useNavigation();
  const scrollY = useValue(0);

  const handleBack = async () => {
    navigation.goBack();
  };

  const handleSearchSong = async () => {
    (navigation as any).navigate("SearchAddPlaylist", {
      playlist: playlist.name,
    });
  };

  const handleDownload = async () => {
    handleDownloadPlaylist(playlist.name);
    (navigation as any).navigate("Downloads");
  };

  return (
    <GlobalContainer>
      <Animated.View
        style={{
          ...StyleSheet.absoluteFillObject,
          top: 0,
          height: IMAGE_HEIGHT,
          width: "100%",
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
            {playlist?.songs[0] && (
              <FastImage
                style={styles.thumbnailItem}
                source={{ uri: playlist?.songs[0].thumbnail }}
              />
            )}
            {playlist?.songs[1] && (
              <FastImage
                style={styles.thumbnailItem}
                source={{ uri: playlist?.songs[1].thumbnail }}
              />
            )}
          </View>
          <View>
            {playlist?.songs[2] && (
              <FastImage
                style={styles.thumbnailItem}
                source={{ uri: playlist?.songs[2].thumbnail }}
              />
            )}
            {playlist?.songs[3] && (
              <FastImage
                style={styles.thumbnailItem}
                source={{ uri: playlist?.songs[3].thumbnail }}
              />
            )}
          </View>
        </View>
        <LinearGradient
          style={{
            ...StyleSheet.absoluteFillObject,
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            zIndex: 1,
            padding: 15,
          }}
          locations={[0, 1, 0]}
          colors={["#00000044", colors.background, "#00000000"]}
        >
          <TouchableScalable
            rectButton={true}
            duration={100}
            scaleTo={0.9}
            buttonStyle={{ width: 46, height: 46 }}
            onPress={handleBack}
            rippleColor="transparent"
          >
            <Feather name="chevron-left" size={40} color={colors.foreground} />
          </TouchableScalable>
          <TouchableScalable
            rectButton={true}
            duration={100}
            scaleTo={0.5}
            buttonStyle={{ width: 46, height: 46 }}
            style={{ flex: 1 }}
            rippleColor="transparent"
            onPress={() => setOptionsIsOpened(true)}
          >
            <Feather name="more-vertical" size={32} color={colors.foreground} />
          </TouchableScalable>
        </LinearGradient>
      </Animated.View>
      <AnimatedMyScrollView
        // scrollEnabled={!moving}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        contentStyle={{
          paddingBottom: track ? 110 : 45,
        }}
      >
        <View style={styles.containerBody}>
          <Text style={styles.title}>{playlist?.name}</Text>
          <TouchableScalable
            rippleColor={colors.pink}
            rectButton={true}
            duration={100}
            scaleTo={0.95}
            onPressOut={() => {
              if (playlist) {
                handlePlayPlaylist(playlist.name);
              }
            }}
            enabled={playlist?.songs.length !== 0}
            buttonStyle={styles.containerButton}
            style={[
              styles.button,
              {
                borderColor:
                  playlist?.songs.length !== 0
                    ? darken(0.1, colors.pink)
                    : colors.currentLine,
                backgroundColor:
                  playlist?.songs.length !== 0
                    ? "transparent"
                    : transparentize(0.65, colors.selection),
              },
            ]}
            borderRadius={25}
          >
            <Ionicons
              name="play"
              size={26}
              color={
                playlist?.songs.length !== 0
                  ? darken(0.1, colors.pink)
                  : colors.currentLine
              }
            />
            <Text
              style={[
                styles.textButton,
                {
                  color:
                    playlist?.songs.length !== 0
                      ? darken(0.1, colors.pink)
                      : colors.currentLine,
                },
              ]}
            >
              Tocar
            </Text>
          </TouchableScalable>
        </View>
        {playlist && playlist?.songs.length !== 0 ? (
          <DraggableList songs={playlist.songs} setPlaylist={setPlaylist} />
        ) : (
          <>
            <Text style={styles.emptyPlaylistText}>
              Nenhuma música na playlist
            </Text>
            <TouchableScalable
              buttonStyle={[
                styles.containerButton,
                {
                  backgroundColor: darken(0.1, colors.purple),
                },
              ]}
              rectButton={false}
              duration={100}
              scaleTo={0.95}
              onPress={handleSearchSong}
              borderRadius={25}
            >
              <View
                style={[
                  styles.button,
                  {
                    borderColor: darken(0.1, colors.purple),
                    borderWidth: 0,
                  },
                ]}
                accessible
              >
                <Ionicons name="search" size={26} color={colors.background} />
                <Animated.Text
                  style={[
                    styles.textButton,
                    {
                      color: colors.background,
                    },
                  ]}
                >
                  Adicionar música
                </Animated.Text>
              </View>
            </TouchableScalable>
          </>
        )}
      </AnimatedMyScrollView>
      <TouchableScalable
        buttonStyle={[
          {
            bottom: track ? 125 : 60,
          },
          styles.sync,
        ]}
        style={styles.align}
        duration={100}
        scaleTo={0.95}
        borderRadius={26}
        onPress={handleDownload}
      >
        <Ionicons name="ios-download" size={28} color={colors.foreground} />
      </TouchableScalable>
      <ModalOptionsPlaylist
        handleDelete={() => {
          setOptionsIsOpened(false);
          navigation.goBack();
          deletePlaylist(data.name);
        }}
        handleDownload={handleDownload}
        handleSearchSong={handleSearchSong}
        closeModal={() => setOptionsIsOpened(false)}
        modalIsOpen={optionsIsOpened}
      />
    </GlobalContainer>
  );
};

const styles = StyleSheet.create({
  containerThumbnail: {
    flexDirection: "row",
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
    marginBottom: 10,
  },
  title: {
    fontFamily: fonts.heading,
    color: colors.foreground,
    fontSize: 32,
    paddingHorizontal: 10,
    textAlign: "center",
    marginBottom: 10,
  },
  containerButton: {
    //TouchableScalableBorderRadiusborderRadius: 50,
    height: 50,
    width: "65%",
    alignSelf: "center",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    //TouchableScalableBorderRadiusborderRadius: 50,
    height: 50,
    width: "100%",
    borderWidth: 1,
    borderColor: darken(0.1, colors.pink),
  },
  textButton: {
    color: darken(0.1, colors.pink),
    marginLeft: 15,
    fontFamily: fonts.complement,
    fontSize: 18,
  },
  sync: {
    position: "absolute",
    right: 20,
    //TouchableScalableBorderRadiusborderRadius: 32,
    width: 52,
    height: 52,
    backgroundColor: colors.comment,
    alignItems: "center",
    justifyContent: "center",
  },
  align: {
    flex: 1,
    width: 52,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyPlaylistText: {
    fontFamily: fonts.heading,
    color: colors.foreground,
    fontSize: 24,
    paddingHorizontal: 10,
    marginTop: 20,
    textAlign: "center",
    marginBottom: 10,
  },
});
