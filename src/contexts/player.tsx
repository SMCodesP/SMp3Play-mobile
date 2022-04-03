import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import TrackPlayer, {
  useTrackPlayerEvents,
  Event,
  Track,
  RepeatMode,
  ProgressState,
  State,
  usePlaybackState,
} from "react-native-track-player";

import AsyncStorage from "@react-native-async-storage/async-storage";
import RNFS from "react-native-fs";
import Sugar from "sugar";

import ytdl from "react-native-ytdl";
import ytch from "yt-channel-info";
import RNBackgroundDownloader from "react-native-background-downloader";
import { shuffle } from "../utils/shuffle";
import axios from "axios";
import { ToastAndroid } from "react-native";

type PlayerType = {
  toggleRepeat(): Promise<void>;
  toggleShuffle(): Promise<void>;
  addSongLocal(song: TMinimalInfo): Promise<void>;
  refreshQueue(): Promise<void>;
  refreshVideos(): Promise<void>;
  handlePlaySong(song: TMinimalInfo): Promise<void>;
  findCreator(id: string): Promise<TCreator | null>;
  videos: TMinimalInfo[];
  queue: Track[];
  track: Track | null;
  repeating: boolean;
  isShuffle: boolean;
  creators: TCreator[];
  setIsShuffle: React.Dispatch<React.SetStateAction<boolean>>;
};

const PlayerContext = createContext<PlayerType>({} as PlayerType);

const PlayerProvider: React.FC = ({ children }) => {
  const [track, setTrack] = useState<Track | null>(null);
  const [queue, setQueue] = useState<Track[]>([]);
  const [repeating, setRepeating] = useState<boolean>(false);
  const [isShuffle, setIsShuffle] = useState<boolean>(false);
  const [videos, setVideos] = useState<TMinimalInfo[]>([]);
  const [creators, setCreators] = useState<TCreator[]>([]);
  const playbackState = usePlaybackState();

  useEffect(() => {
    (async () => {
      const repeatingStored = Number(
        (await AsyncStorage.getItem("@repeating")) || "0"
      );
      setRepeating(repeatingStored ? true : false);
      await TrackPlayer.setRepeatMode(
        repeatingStored ? RepeatMode.Queue : RepeatMode.Off
      );
      const isShuffleStored = Number(
        (await AsyncStorage.getItem("@isshuffle")) || "0"
      );
      setIsShuffle(isShuffleStored ? true : false);
    })();
  }, []);

  useEffect(() => {
    if (playbackState === State.Stopped || playbackState === State.None) {
      setTrack(null);
      setQueue([]);
    }
  }, [playbackState]);

  const addSongLocal = async (song: TMinimalInfo) => {
    const storagedVideos = JSON.parse(
      (await AsyncStorage.getItem("@videos")) || "[]"
    );
    if (
      storagedVideos.findIndex(
        ({ videoId }: any) => videoId === song.videoId
      ) === -1
    ) {
      const newVideos = [
        ...new Map(
          [
            {
              ...song,
              creator: undefined,
            },
            ...storagedVideos,
          ].map((item) => [item.videoId, item])
        ).values(),
      ];
      setVideos(newVideos);
      await AsyncStorage.setItem("@videos", JSON.stringify(newVideos));
    }
    const storagedCreators = JSON.parse(
      (await AsyncStorage.getItem("@creators")) || "[]"
    );

    const newCreators = [
      ...new Map(
        [song.creator, ...storagedCreators].map((item) => [item.authorId, item])
      ).values(),
    ];
    setCreators(newCreators);
    await AsyncStorage.setItem("@creators", JSON.stringify(newCreators));
  };

  const refreshVideos = async () => {
    const jsonValue = await AsyncStorage.getItem("@videos");
    setVideos(jsonValue !== null ? JSON.parse(jsonValue) || [] : []);
    const jsonValueCreators = await AsyncStorage.getItem("@creators");
    setCreators(
      jsonValueCreators !== null ? JSON.parse(jsonValueCreators) || [] : []
    );
    return;
  };

  const refreshQueue = async () => {
    setQueue(await TrackPlayer.getQueue());
    return;
  };

  const handlePlaySong = async (song: TMinimalInfo) => {
    const fileExists = await RNFS.exists(
      `${RNBackgroundDownloader.directories.documents}/${song.videoId}.mp3`
    );
    const track = {
      url: fileExists
        ? `${RNBackgroundDownloader.directories.documents}/${song.videoId}.mp3`
        : (await ytdl(song.url, { quality: "highestaudio" }))[0].url,
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
  };

  const toggleRepeat = useCallback(async () => {
    setRepeating(!repeating);
    await TrackPlayer.setRepeatMode(
      !repeating ? RepeatMode.Queue : RepeatMode.Off
    );
    await AsyncStorage.setItem("@repeating", String(Number(!repeating)));
    return;
  }, [repeating]);

  const toggleShuffle = useCallback(async () => {
    try {
      setIsShuffle(!isShuffle);
      if (!isShuffle) {
        await TrackPlayer.removeUpcomingTracks();
        await TrackPlayer.add(shuffle(queue.slice(1)));
        await refreshQueue();
      }
      await AsyncStorage.setItem("@isshuffle", String(Number(!isShuffle)));
    } catch (error) {
      console.log(error);
    }
    return;
  }, [isShuffle, queue]);

  const findCreator: PlayerType["findCreator"] = async (id: string) => {
    let creator = creators.find(({ authorId }) => authorId === id) || null;

    if (creator === null) {
      try {
        const { data } = await axios.get(
          `https://sm-p3-play-api.vercel.app/api/creator/${id}`
        );
        return data;
      } catch (error) {
        return null;
      }
    }
    return creator;
  };

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
        toggleShuffle,
        setIsShuffle,
        refreshQueue,
        track,
        repeating,
        isShuffle,
        queue,
        videos,
        refreshVideos,
        handlePlaySong,
        addSongLocal,
        creators,
        findCreator,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

function useCreator(id: string): TCreator | null {
  const { creators } = usePlayer();
  let creator = creators.find(({ authorId }) => authorId === id) || null;

  useEffect(() => {
    if (creator === null) {
      (async () => {
        const creatorData = await ytch.getChannelInfo(id);
        creator = {
          authorId: creatorData.authorId,
          author: creatorData.author,
          authorUrl: creatorData.authorUrl,
          authorBanner:
            creatorData.authorBanners[creatorData.authorBanners.length - 1],
          authorThumbnail:
            creatorData.authorThumbnails[
              creatorData.authorThumbnails.length - 1
            ],
          subscriberCount: creatorData.subscriberCount,
          description: creatorData.description,
          isVerified: creatorData.isVerified,
        };
      })();
    }
  }, []);

  return creator;
}

function useSong(id: string, callbackError?: any): TMinimalInfo | undefined {
  const { videos, creators } = usePlayer();
  const [video, setVideo] = useState<TMinimalInfo | undefined>(
    (creators.find(
      ({ authorId }) =>
        authorId === videos.find((video) => video.videoId === id)?.authorId
    )
      ? {
          ...videos.find((video) => video.videoId === id),
          creator: creators.find(
            ({ authorId }) =>
              authorId ===
              videos.find((video) => video.videoId === id)?.authorId
          ),
        }
      : undefined) as TMinimalInfo | undefined
  );

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `https://sm-p3-play-api.vercel.app/api/songInfo/${id}`
        );
        setVideo(data);
      } catch (error) {
        ToastAndroid.show(
          "Houve um erro ao adicionar a música, ela pode ser privada ou contém restrição de idade.",
          ToastAndroid.LONG
        );
        if (callbackError) callbackError();
      }
    })();
  }, []);

  return video;
}

async function useRefresh() {
  const { refreshVideos } = usePlayer();

  return await refreshVideos();
}

function usePlayer(): PlayerType {
  const context = useContext(PlayerContext);

  return context;
}

export { usePlayer, PlayerProvider, useSong, useCreator, useRefresh };

export default PlayerContext;
