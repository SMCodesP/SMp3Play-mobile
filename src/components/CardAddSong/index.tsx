import React, { memo, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
} from "react-native";
import Sugar from 'sugar'
import FastImage from "react-native-fast-image";
import ytdl from "react-native-ytdl";

import colors from "../../styles/colors";
import fonts from "../../styles/fonts";
import TouchableScalable from "../TouchableScalable";
import Ionicons from "react-native-vector-icons/Ionicons";
import { isOnPlaylist, usePlaylist } from "../../contexts/playlist";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface CardAddSongProps {
  navigation?: any;
  item: TVideo;
  playlistName: string;
}

const CardAddSong: React.FC<CardAddSongProps> = ({ item: video, playlistName }) => {
  const [loading, setLoading] = useState(false);
  const [videoInfo, setVideoInfo] = useState<TMinimalInfo | null>(null);
  const { toggleSongInPlaylist } = usePlaylist()
  const isInPlaylist = isOnPlaylist(video.videoId, playlistName)

  const handleAddSongInPlaylist = async () => {
    setLoading(true)
    if (!videoInfo) {
      const videoData: TInfo = await ytdl.getBasicInfo(video.videoId);
      const newVideoInfo = {
        ago: Sugar.Date.relative(
          new Date(videoData.videoDetails.uploadDate),
          'pt'
        ),
        authorId: videoData.videoDetails.author.id,
        description: videoData.videoDetails.description,
        thumbnail: videoData.videoDetails.thumbnails[videoData.videoDetails.thumbnails.length-1].url,
        timestamp: videoData.videoDetails.lengthSeconds,
        title: videoData.videoDetails.title,
        url: videoData.videoDetails.video_url,
        videoId: videoData.videoDetails.videoId,
        views: Number(videoData.videoDetails.viewCount),
        is_liked: false,
      }
      await toggleSongInPlaylist(newVideoInfo, playlistName);
      setVideoInfo(newVideoInfo)
    } else {
      await toggleSongInPlaylist(videoInfo, playlistName);
    }
    setLoading(false)
  }

  return (
    <View
      style={styles.containerGeral}
    >
      <FastImage
        style={styles.thumbnail}
        source={{ uri: video.thumbnail }}
      />
      <View style={styles.containerInfo}>
        <Text style={styles.title}>
          {video.title.substring(0, 50).trim() +
            (video.title.length > 50 ? "..." : "")}
        </Text>
        <Text style={styles.author}>{video.author.name}</Text>
      </View>
      <TouchableScalable
        buttonStyle={styles.buttonAdd}
        rippleColor={colors.purple}
        rectButton={false}
        duration={50}
        scaleTo={0.9}
        activeOpacity={0.5}
        onPress={handleAddSongInPlaylist}
      >
        {loading ? (
          <ActivityIndicator color={colors.purple} size="large" />
        ) : isInPlaylist
          ? <Ionicons name="remove-circle-outline" size={32} color={colors.purple} />
          : <Ionicons name="add-circle-outline" size={32} color={colors.purple} />
        }
      </TouchableScalable>
    </View>
  );
};

export default memo(CardAddSong);

const styles = StyleSheet.create({
  containerInfo: {
    flex: 1,
    borderRadius: 12,
    paddingHorizontal: 8,
  },
  containerGeral: {
    flex: 1,
    flexDirection: "row",
    padding: 10
  },
  thumbnail: {
    width: 92,
    height: 92,
    borderRadius: 5
  },
  title: {
    fontSize: 14,
    color: colors.foreground,
    fontFamily: fonts.heading,
  },
  author: {
    color: colors.purple,
    fontSize: 12,
    fontFamily: fonts.complement,
  },
  buttonAdd: {
    alignSelf: "center",
    marginHorizontal: 5,
    width: 32,
    height: 32
  }
});
