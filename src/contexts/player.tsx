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
import ytch from 'yt-channel-info'
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
  creators: TCreator[];
};

const PlayerContext = createContext<PlayerType>({} as PlayerType);

const PlayerProvider: React.FC = ({ children }) => {
  const [track, setTrack] = useState<Track | null>(null);
  const [queue, setQueue] = useState<Track[]>([]);
  const [repeating, setRepeating] = useState<boolean>(false);
  const [videos, setVideos] = useState<TMinimalInfo[]>([]);
  const [creators, setCreators] = useState<TCreator[]>([]);

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
              creator: undefined
            },
            ...videos,
          ].map((item) => [item.videoId, item]),
        ).values(),
      ];
      setVideos(newVideos)
      await AsyncStorage.setItem('@videos', JSON.stringify(newVideos));
    }
    const creator = await ytch.getChannelInfo(song.authorId);
    const newCreators = [
      ...new Map(
        [
          {
            authorId: creator.authorId,
            author: creator.author,
            authorUrl: creator.authorUrl,
            authorBanner: creator.authorBanners[creator.authorBanners.length - 1],
            authorThumbnail: creator.authorThumbnails[creator.authorThumbnails.length - 1],
            subscriberCount: creator.subscriberCount,
            description: creator.description,
            isVerified: creator.isVerified,
          },
          ...creators,
        ].map((item) => [item.authorId, item]),
      ).values(),
    ];
    setCreators(newCreators)
    await AsyncStorage.setItem('@creators', JSON.stringify(newCreators));
  }

  const refreshVideos = async () => {
    const jsonValue = await AsyncStorage.getItem("@videos");
    setVideos(jsonValue !== null ? JSON.parse(jsonValue) || [] : []);
    const jsonValueCreators = await AsyncStorage.getItem("@creators");
    setCreators(jsonValueCreators !== null ? JSON.parse(jsonValueCreators) || [] : []);
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
      artist: song.creator?.author,
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
        creators,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

function useCreator(id: string): TCreator | null {
  const { creators } = usePlayer();
  const [creator, setCreator] = useState(creators.find(({ authorId }) => authorId === id) || null);

  useEffect(() => {
    ;(async () => {
      const creatorData = await ytch.getChannelInfo(id);
      setCreator({
        authorId: creatorData.authorId,
        author: creatorData.author,
        authorUrl: creatorData.authorUrl,
        authorBanner: creatorData.authorBanners[creatorData.authorBanners.length - 1],
        authorThumbnail: creatorData.authorThumbnails[creatorData.authorThumbnails.length - 1],
        subscriberCount: creatorData.subscriberCount,
        description: creatorData.description,
        isVerified: creatorData.isVerified,
      })
    })();
  }, [])

  return creator;
}

function useSong(id: string): TMinimalInfo | undefined {
  const { videos, creators } = usePlayer();
  const [video, setVideo] = useState<TMinimalInfo | undefined>(
    (creators.find(({ authorId }) => authorId === videos.find((video) => video.videoId === id)?.authorId) ? {
      ...videos.find((video) => video.videoId === id),
      creator: creators.find(({ authorId }) => authorId === videos.find((video) => video.videoId === id)?.authorId),
    } : undefined) as TMinimalInfo | undefined);

  useEffect(() => {
    ;(async () => {
      const videoData: TInfo = await ytdl.getBasicInfo(id);
      const creatorData = await ytch.getChannelInfo(videoData.videoDetails.author.id);
      setVideo({
        ago: Sugar.Date.relative(
          new Date(videoData.videoDetails.uploadDate),
          'pt'
        ),
        description: videoData.videoDetails.description,
        thumbnail: videoData.videoDetails.thumbnails[videoData.videoDetails.thumbnails.length-1].url,
        timestamp: videoData.videoDetails.lengthSeconds,
        title: videoData.videoDetails.title,
        url: videoData.videoDetails.video_url,
        videoId: videoData.videoDetails.videoId,
        views: Number(videoData.videoDetails.viewCount),
        is_liked: false,
        authorId: videoData.videoDetails.author.id,
        creator: {
          authorId: creatorData.authorId,
          author: creatorData.author,
          authorUrl: creatorData.authorUrl,
          authorBanner: creatorData.authorBanners[creatorData.authorBanners.length - 1],
          authorThumbnail: creatorData.authorThumbnails[creatorData.authorThumbnails.length - 1],
          subscriberCount: creatorData.subscriberCount,
          description: creatorData.description,
          isVerified: creatorData.isVerified,
        }
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

export { usePlayer, PlayerProvider, useSong, useCreator, useRefresh };

export default PlayerContext;
