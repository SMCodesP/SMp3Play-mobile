import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TrackPlayer, { Track } from "react-native-track-player";
import RNFS from 'react-native-fs';
import { usePlayer } from "./player";
import RNBackgroundDownloader from "react-native-background-downloader";

type PlaylistType = {
  toggleSongInPlaylist(song: TMinimalInfo, playlist: string): Promise<void>;
  createPlaylist(playlist: string): void;
  getPlaylist(playlist: string): TPlaylist | undefined;
  isSongLiked(song: TMinimalInfo): boolean;
  handlePlayPlaylist(name: string): Promise<void>;
  setContext: (updates: any) => void;
  playlists: TPlaylist[];
};

const getDefaultState = (): {
  playlists: TPlaylist[];
} => {
  return {
    playlists: [{
      name: "Favoritos",
      songs: []
    }]
  }
}

const PlaylistContext = createContext<PlaylistType>({} as PlaylistType);

const PlaylistProvider: React.FC = ({ children }) => {
  const [state, setState] = useState(getDefaultState())
  const { videos, addSongLocal } = usePlayer();

  useEffect(() => {
    (async () => {
      setContext({
        playlists: JSON.parse(
          (await AsyncStorage.getItem("@playlists")) || '[]'
        )
      });
    })();
  }, []);

  useEffect(() => {
    ;(async () => {
      await AsyncStorage.setItem("@playlists", JSON.stringify(state.playlists));
    })();
  }, [state]);

  const createPlaylist: PlaylistType["createPlaylist"] = (playlist) => {
    const cloneState = state.playlists;
    let playlistIndex = cloneState.findIndex(
      (value) => value.name === playlist
    );
    if (playlistIndex === -1) {
      playlistIndex = cloneState.push({
        name: playlist,
        songs: [],
      })
      setContext({ playlists: cloneState })
    }
  }

  const getPlaylist: PlaylistType["getPlaylist"] = (playlist) => {
    return state.playlists.find((value) => value.name === playlist);
  }

  const toggleSongInPlaylist: PlaylistType["toggleSongInPlaylist"] = async (song, playlist) => {
    const cloneState = state.playlists;
    let playlistIndex = cloneState.findIndex(
      (value) => value.name === playlist
    );
    if (playlistIndex === -1) {
      playlistIndex = cloneState.push({
        name: playlist,
        songs: [song.videoId],
      })
    } else {
      if (cloneState[playlistIndex].songs.findIndex(value => value === song.videoId) !== -1) {
        cloneState[playlistIndex] = {
          name: cloneState[playlistIndex].name,
          songs: cloneState[playlistIndex].songs.filter((value) => value !== song.videoId),
        };
      } else {
        cloneState[playlistIndex] = {
          name: cloneState[playlistIndex].name,
          songs: [...cloneState[playlistIndex].songs, song.videoId],
        };
      }
    }
    await addSongLocal(song)
    setContext({ playlists: cloneState })
  }

  const isSongLiked: PlaylistType["isSongLiked"] = (song) => {
    const index = state.playlists.findIndex((value) => value.name === "Favoritos")
    if (index === -1) return false
    return state.playlists[index].songs.includes(song.videoId);
  };

  const handlePlayPlaylist: PlaylistType["handlePlayPlaylist"] = async (
    name
  ) => {
    const playlist = state.playlists[state.playlists.findIndex(value => value.name === name)];
    if (playlist) {
      const songs: Promise<Track>[] = playlist.songs.map(async (songId) => {
        const song = videos.find(({ videoId }) => videoId === songId)
        const fileExists = await RNFS.exists(`${RNBackgroundDownloader.directories.documents}/${songId}.mp3`);
        return {
          url: fileExists ? `${RNBackgroundDownloader.directories.documents}/${songId}.mp3` : `https://sm-p3-play-api.vercel.app/api/song/${song!.videoId}`,
          artist: song!.creator?.author,
          title: song!.title,
          artwork: song!.thumbnail,
          description: song!.description,
          date: song!.timestamp,
          extra: song,
          id: `${Math.floor(Math.random() * 100000000000)}`,
        }
      });
      const resolvedSongs = await Promise.all(songs);
      await TrackPlayer.destroy();
      await TrackPlayer.add(resolvedSongs);
      await TrackPlayer.play();
    }
  };

  const setContext = useCallback(
    updates => {
      setState({ ...state, ...updates })
    },
    [state, setState],
  )
  
  const getContextValue = useCallback(
    () => ({
      ...state,
      setContext,
      isSongLiked,
      handlePlayPlaylist,
      toggleSongInPlaylist,
      createPlaylist,
      getPlaylist,
    }),
    [state, setContext],
  )

  return (
    <PlaylistContext.Provider
      value={getContextValue()}
    >
      {children}
    </PlaylistContext.Provider>
  );
};

function isOnPlaylist(songId: string, playlistName: string) {
  const { playlists } = usePlaylist();

  return playlists.findIndex(value => value.name === playlistName) !== -1 ? playlists[playlists.findIndex(value => value.name === playlistName)].songs.findIndex((value) => value === songId) === -1 ? false : true : false
}

function usePlaylistInfo(name: string) {
  const { playlists, setContext } = usePlaylist();
  const { videos } = usePlayer();

  const setPlaylist = async (newData: string[]) => {
    var cloneState = playlists;
    const index = cloneState.findIndex((value) => value.name === name);
    cloneState[index] = { name: name, songs: newData }
    setContext({ playlists: cloneState })
    await AsyncStorage.setItem("@playlists", JSON.stringify(cloneState));
  };

  return {
    playlist: {
      ...playlists[playlists.findIndex(value => value.name === name)],
      songs: playlists[playlists.findIndex(value => value.name === name)].songs.map(songId => ({
        ...videos.find(song => song.videoId === songId)
      }))
    } as {
      name: string,
      songs: TMinimalInfo[]
    },
    setPlaylist
  }
}

function usePlaylist(): PlaylistType {
  const context = useContext(PlaylistContext);

  return context;
}

export { usePlaylist, usePlaylistInfo, isOnPlaylist, PlaylistProvider };

export default PlaylistContext;
