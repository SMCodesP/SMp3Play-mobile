import 'react-native-get-random-values';
import React, {createContext, useContext, useEffect, useState} from 'react';
import type VideoType from '../interfaces/VideoType';
import ytdl from 'react-native-ytdl';
import TrackPlayer, {
  useProgress,
  Track,
  Capability,
  Event,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {v4 as uuidv4} from 'uuid';
import {useDebouncedCallback} from 'use-debounce';
import Playlist from '../interfaces/Playlist';

type PlayerType = {
  play: (video: VideoType, insertBeforeId?: string) => Promise<void>;
  createPlaylist: (name: string, initialVideos?: VideoType[]) => Promise<void>;
  track: Track | null;
  position: number;
  duration: number;
  queue: Track[];
  history: VideoType[];
  playlists: Playlist[];
  playingPlaylist: Playlist | null;
  updateQueue: () => Promise<void>;
  playPlaylist: (playlist: Playlist) => Promise<void>;
  nextSong: () => Promise<void>;
  previousSong: () => Promise<void>;
  removeSongFromPlaylist: (playlistId: string, songId: string) => void;
  addSongIntoPlaylist: (playlistId: string, song: VideoType) => void;
  removePlaylist: (playlistId: string) => void;
};

const PlayerContext = createContext<PlayerType>({} as PlayerType);

const PlayerProvider: React.FC = ({children}) => {
  const [track, setTrack] = useState<Track | null>(null);
  const {position, duration} = useProgress(500);
  const [queue, setQueue] = useState<Track[]>([]);
  const [history, setHistory] = useState<VideoType[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [playingPlaylist, setPlayingPlaylist] = useState<Playlist | null>(null);

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

  useEffect(() => {
    if (playlists.length > 0) {
      AsyncStorage.setItem('@playlists', JSON.stringify(playlists));
    }
  }, [playlists]);

  const handleEvent = useDebouncedCallback(
    async (data) => {
      if (data.type === Event.PlaybackTrackChanged) {
        setTrack(queue.find(({id}) => data.nextTrack === id) || null);
      }
      if (data.type === Event.PlaybackQueueEnded) {
        setTrack(() => {
          setQueue((oldQueue) => {
            if (oldQueue.length > 0) {
              TrackPlayer.destroy();
            }
            return [];
          });
          return null;
        });
        setPlayingPlaylist(null);
      }
    },
    1000,
    {maxWait: 1000},
  );

  useTrackPlayerEvents(
    [Event.PlaybackTrackChanged, Event.PlaybackQueueEnded],
    handleEvent,
  );

  const updateQueue = async () => {
    const newQueue = await TrackPlayer.getQueue();
    setQueue(newQueue);
  };

  const playPlaylist: PlayerType['playPlaylist'] = async (playlist) => {
    TrackPlayer.destroy();
    setTrack({
      artist: playlist.videos[0].author.name,
      title: playlist.videos[0].title,
      id: playlist.videos[0].uuid,
      artwork: playlist.videos[0].image,
      description: playlist.videos[0].description,
      date: playlist.videos[0].timestamp,
    } as any);
    await TrackPlayer.play();
    for (const video of playlist.videos) {
      const urls = await ytdl(video.url, {quality: 'highestaudio'});
      await TrackPlayer.add({
        url: urls[0].url,
        artist: video.author.name,
        title: video.title,
        id: video.uuid,
        artwork: video.image,
        description: video.description,
        date: video.timestamp,
      } as any);
      setQueue((oldState) => [
        ...oldState,
        {
          url: urls[0].url,
          artist: video.author.name,
          title: video.title,
          id: video.uuid,
          artwork: video.image,
          description: video.description,
          date: video.timestamp,
        } as any,
      ]);
    }
  };

  const removeSongFromPlaylist: PlayerType['removeSongFromPlaylist'] = (
    playlistId,
    songId,
  ) => {
    setPlaylists((oldState) => {
      return oldState.map((playlist) =>
        playlist.id === playlistId
          ? {
              ...playlist,
              videos: playlist.videos.filter((song) => song.uuid !== songId),
            }
          : playlist,
      );
    });
  };

  const nextSong = async () => {
    const next =
      queue[queue.findIndex((search) => search.id === track?.id) + 1];
    if (next) {
      setTrack(next);
    }
    await TrackPlayer.skipToNext();
  };

  const previousSong = async () => {
    const previous =
      queue[queue.findIndex((search) => search.id === track?.id) - 1];
    if (previous) {
      setTrack(previous);
    }
    await TrackPlayer.skipToPrevious();
  };

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

  const removePlaylist: PlayerType['removePlaylist'] = (playlistId) => {
    setPlaylists((oldState) =>
      oldState.filter((filtered) => filtered.id !== playlistId),
    );
    return;
  };

  const addSongIntoPlaylist: PlayerType['addSongIntoPlaylist'] = (
    playlist,
    song,
  ) => {
    setPlaylists((oldState) =>
      oldState.map((element) =>
        element.id === playlist
          ? {
              ...element,
              videos: [
                ...element.videos,
                {
                  ...song,
                  uuid: uuidv4(),
                },
              ],
            }
          : element,
      ),
    );
  };

  const play: PlayerType['play'] = async (video, insertBeforeId) => {
    const urls = await ytdl(video.url, {quality: 'highestaudio'});
    if (insertBeforeId) {
      await TrackPlayer.add(
        {
          url: urls[0].url,
          artist: video.author.name,
          title: video.title,
          id: video.uuid || uuidv4(),
          artwork: video.image,
          description: video.description,
          date: video.timestamp,
        },
        insertBeforeId,
      );
    } else {
      await TrackPlayer.add({
        url: urls[0].url,
        artist: video.author.name,
        title: video.title,
        id: video.uuid || uuidv4(),
        artwork: video.image,
        description: video.description,
        date: video.timestamp,
      });
    }
    setTrack((oldTrack) => {
      if (!oldTrack) {
        return {
          url: urls[0].url,
          artist: video.author.name,
          title: video.title,
          id: uuidv4(),
          artwork: video.image,
          description: video.description,
          date: video.timestamp,
        };
      }
      return oldTrack;
    });
    setQueue(await TrackPlayer.getQueue());
    await TrackPlayer.play();
    return;
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
        updateQueue,
        playPlaylist,
        playingPlaylist,
        nextSong,
        previousSong,
        removeSongFromPlaylist,
        addSongIntoPlaylist,
        removePlaylist,
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
