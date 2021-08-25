import React, { createContext, useCallback, useContext, useEffect, useState } from "react";

import TrackPlayer, {
  useTrackPlayerEvents,
  Event,
  Track,
  RepeatMode,
} from "react-native-track-player";

import AsyncStorage from "@react-native-async-storage/async-storage";
import RNFS from 'react-native-fs';
import Sugar from 'sugar'

import ytdl from "react-native-ytdl";
import RNBackgroundDownloader from "react-native-background-downloader";

type PlayerType = {
  toggleRepeat(): Promise<void>;
  refreshQueue(): Promise<void>;
  refreshVideos(): Promise<void>;
  handlePlaySong(song: TMinimalInfo): Promise<void>;
  addSongLocal(song: TMinimalInfo): Promise<void>;
  videos: TMinimalInfo[];
  queue: Track[];
  track: Track | null;
  repeating: boolean;
};

const PlayerContext = createContext<PlayerType>({} as PlayerType);

const PlayerProvider: React.FC = ({ children }) => {
  const [videos, setVideos] = useState<TMinimalInfo[]>([]);
  const [queue, setQueue] = useState<Track[]>([]);
  const [track, setTrack] = useState<Track | null>(null);
  const [repeating, setRepeating] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const repeatingStored = Number(
        (await AsyncStorage.getItem("@repeating")) || "0"
      );
      setRepeating(repeatingStored ? true : false);
      await TrackPlayer.setRepeatMode(
        repeatingStored ? RepeatMode.Queue : RepeatMode.Off
      );
    })();
  }, []);

  const addSongLocal = async (song: TMinimalInfo) => {
    if (videos.findIndex(({ videoId }) => videoId === song.videoId) === -1) {
      const newVideos = [
        ...new Map(
          [
            {
              ...song,
              videoId: song.videoId,
            },
            ...videos,
          ].map((item) => [item.videoId, item]),
        ).values(),
      ];
      setVideos(newVideos)
      await AsyncStorage.setItem('@videos', JSON.stringify(newVideos));
    }
  }

  const refreshVideos = async () => {
    const jsonValue = await AsyncStorage.getItem("@videos");
    setVideos(jsonValue != null ? JSON.parse(jsonValue) || [] : []);
    return;
  };
  
  const refreshQueue = async () => {
    setQueue(await TrackPlayer.getQueue());
    return;
  };

  const handlePlaySong = async (song: TMinimalInfo) => {
    const fileExists = await RNFS.exists(`${RNBackgroundDownloader.directories.documents}/${song.videoId}.mp3`);
    const track = {
      url: fileExists ? `${RNBackgroundDownloader.directories.documents}/${song.videoId}.mp3` : (await ytdl(song.url, { quality: "highestaudio" }))[0].url,
      artist: song.author.name,
      title: song.title,
      artwork: song.thumbnail,
      description: song.description,
      date: song.timestamp,
      extra: song,
      id: `${Math.floor(Math.random() * 100000000000)}`,
    };
    await TrackPlayer.add(track);
    await TrackPlayer.play();
  }

  const toggleRepeat = useCallback(async () => {
    await AsyncStorage.setItem("@repeating", String(Number(!repeating)));
    await TrackPlayer.setRepeatMode(
      !repeating ? RepeatMode.Queue : RepeatMode.Off
    );
    setRepeating(!repeating);
    return;
  }, [repeating]);

  useTrackPlayerEvents(
    [Event.PlaybackTrackChanged, Event.PlaybackQueueEnded],
    async (data) => {
      if (
        data.type === Event.PlaybackTrackChanged &&
        data.nextTrack !== undefined &&
        data.nextTrack !== null
      ) {
        const nextTrack = await TrackPlayer.getTrack(data.nextTrack);
        setTrack(nextTrack || null);
      }
      if (data.type === Event.PlaybackQueueEnded) {
        setTrack(null);
      }
      await refreshQueue();
      await TrackPlayer.setRepeatMode(
        repeating ? RepeatMode.Queue : RepeatMode.Off
      );
    }
  );

  return (
    <PlayerContext.Provider
      value={{
        toggleRepeat,
        refreshQueue,
        track,
        repeating,
        queue,
        videos,
        refreshVideos,
        handlePlaySong,
        addSongLocal,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

function useSong(id: string): TMinimalInfo | undefined {
  const { videos } = usePlayer();
  const [video, setVideo] = useState(videos.find((video) => video.videoId === id));

  useEffect(() => {
    ;(async () => {
      const videoData: TInfo = await ytdl.getBasicInfo(id);
      setVideo({
        ago: Sugar.Date.relative(
          new Date(videoData.videoDetails.uploadDate),
          'pt'
        ),
        author: {
          name: videoData.videoDetails.author.name,
          avatar: videoData.videoDetails.author.thumbnails[videoData.videoDetails.author.thumbnails.length-1].url,
        },
        description: videoData.videoDetails.description,
        thumbnail: videoData.videoDetails.thumbnails[videoData.videoDetails.thumbnails.length-1].url,
        timestamp: videoData.videoDetails.lengthSeconds,
        title: videoData.videoDetails.title,
        url: videoData.videoDetails.video_url,
        videoId: videoData.videoDetails.videoId,
        views: Number(videoData.videoDetails.viewCount),
        is_liked: false,
      })
    })();
  }, [])

  return video;
}

async function useRefresh() {
  const { refreshVideos } = usePlayer()

  return await refreshVideos();
}

function usePlayer(): PlayerType {
  const context = useContext(PlayerContext);

  return context;
}

export { usePlayer, PlayerProvider, useSong, useRefresh };

export default PlayerContext;
