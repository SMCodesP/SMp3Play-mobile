import React, {createContext, useContext, useEffect, useState} from 'react';
import type VideoType from '../interfaces/VideoType';
import ytdl from 'react-native-ytdl';
import TrackPlayer, {
  useProgress,
  Track,
  Capability,
  Event,
} from 'react-native-track-player';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import Playlist from '../interfaces/Playlist';

type PlayerType = {
  play: (video: VideoType) => Promise<void>;
  createPlaylist: (name: string, initialVideos?: VideoType[]) => Promise<void>;
  track: Track | null;
  position: number;
  duration: number;
  queue: Track[];
  history: VideoType[];
  playlists: Playlist[];
};

const PlayerContext = createContext<PlayerType>({} as PlayerType);

const PlayerProvider: React.FC = ({children}) => {
  const [track, setTrack] = useState<Track | null>(null);
  const {position, duration} = useProgress(500);
  const [queue, setQueue] = useState<Track[]>([]);
  const [history, setHistory] = useState<VideoType[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  useEffect(() => {
    async function setup() {
      await TrackPlayer.setupPlayer();
      TrackPlayer.updateOptions({
        stopWithApp: true,
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
          Capability.Stop,
          Capability.SeekTo,
        ],
        compactCapabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SeekTo,
        ],
      });
      TrackPlayer.addEventListener(Event.PlaybackQueueEnded, () => {
        setTrack(() => {
          setQueue((oldQueue) => {
            if (oldQueue.length > 0) {
              TrackPlayer.destroy();
            }
            return [];
          });
          return null;
        });
      });
      TrackPlayer.addEventListener(Event.PlaybackTrackChanged, async (data) => {
        const gettingTrack = await TrackPlayer.getTrack(data.nextTrack);
        setTrack(gettingTrack);
        setQueue(await TrackPlayer.getQueue());
      });
      setQueue(await TrackPlayer.getQueue());
      const jsonValue = await AsyncStorage.getItem('@history');
      setHistory(jsonValue != null ? JSON.parse(jsonValue) || [] : []);
      const playlistJsonValue = await AsyncStorage.getItem('@playlists');
      setPlaylists(
        playlistJsonValue != null ? JSON.parse(playlistJsonValue) || [] : [],
      );
    }
    setup();
    return () => {
      setQueue([]);
    };
  }, []);

  const createPlaylist: PlayerType['createPlaylist'] = async (
    name,
    initialVideos = [],
  ) => {
    setPlaylists((oldPlaylists) => {
      AsyncStorage.setItem(
        '@playlists',
        JSON.stringify([
          {
            id: uuidv4(),
            name,
            videos: initialVideos,
          },
          ...oldPlaylists,
        ]),
      );
      return [
        {
          id: uuidv4(),
          name,
          videos: initialVideos,
        },
        ...oldPlaylists,
      ];
    });
    return;
  };

  const play: PlayerType['play'] = async (video) => {
    setHistory((oldHistory) => {
      const newHistory = [
        ...new Map(
          [
            {
              ...video,
              videoId: video.videoId,
            },
            ...oldHistory,
          ].map((item) => [item.videoId, item]),
        ).values(),
      ];
      return newHistory;
    });
    await AsyncStorage.setItem('@history', JSON.stringify(history));
    const urls = await ytdl(video.url, {quality: 'highestaudio'});
    await TrackPlayer.add({
      url: urls[0].url,
      artist: video.author.name,
      title: video.title,
      id: uuidv4(),
      artwork: video.image,
      description: video.description,
      date: video.timestamp,
    });
    setQueue(await TrackPlayer.getQueue());
    TrackPlayer.play();
  };

  return (
    <PlayerContext.Provider
      value={{
        play,
        track,
        position,
        duration,
        queue,
        history,
        createPlaylist,
        playlists,
      }}>
      {children}
    </PlayerContext.Provider>
  );
};
function usePlayer(): PlayerType {
  const context = useContext(PlayerContext);

  return context;
}

export {usePlayer, PlayerProvider};

export default PlayerContext;
