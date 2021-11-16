import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Clipboard, ToastAndroid } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TrackPlayer, { Track } from "react-native-track-player";
import RNFS from "react-native-fs";
import RNBackgroundDownloader from "react-native-background-downloader";
import DocumentPicker from "react-native-document-picker";
import getPath from "@flyerhq/react-native-android-uri-path";
import { usePlayer } from "./player";
import { shuffle } from "../utils/shuffle";

type PlaylistType = {
  toggleSongInPlaylist(song: TMinimalInfo, playlist: string): Promise<void>;
  createPlaylist(playlist: string): void;
  deletePlaylist(playlist: string): void;
  getPlaylist(playlist: string): TPlaylist | undefined;
  exportPlaylist(playlist: string): Promise<void>;
  importPlaylist(data: string): Promise<void>;
  isSongLiked(song: TMinimalInfo): boolean;
  handlePlayPlaylist(name: string): Promise<void>;
  setContext: (updates: any) => void;
  playlists: TPlaylist[];
};

const getDefaultState = (): {
  playlists: TPlaylist[];
} => {
  return {
    playlists: [
      {
        name: "Favoritos",
        songs: [],
      },
    ],
  };
};

const PlaylistContext = createContext<PlaylistType>({} as PlaylistType);

const PlaylistProvider: React.FC = ({ children }) => {
  const [state, setState] = useState(getDefaultState());
  const { videos, creators, addSongLocal, setIsShuffle } = usePlayer();

  useEffect(() => {
    (async () => {
      setContext({
        playlists: JSON.parse(
          (await AsyncStorage.getItem("@playlists")) || "[]"
        ),
      });
    })();
  }, []);

  useEffect(() => {
    (async () => {
      await AsyncStorage.setItem("@playlists", JSON.stringify(state.playlists));
    })();
  }, [state]);

  const createPlaylist: PlaylistType["createPlaylist"] = async (playlist) => {
    const cloneState = JSON.parse(
      (await AsyncStorage.getItem("@playlists")) || "[]"
    );
    let playlistIndex = cloneState.findIndex(
      (value: any) => value.name === playlist
    );
    if (playlistIndex === -1) {
      cloneState.push({
        name: playlist,
        songs: [],
      });
      setContext({ playlists: cloneState });
    }
  };

  const deletePlaylist: PlaylistType["deletePlaylist"] = (playlist) => {
    console.log(state.playlists.filter((value) => value.name !== playlist));
    setContext({
      playlists: state.playlists.filter((value) => value.name !== playlist),
    });
  };

  const getPlaylist: PlaylistType["getPlaylist"] = (playlist) => {
    return state.playlists.find((value) => value.name === playlist);
  };

  const exportPlaylist: PlaylistType["exportPlaylist"] = async (playlist) => {
    const playlistInfo = getPlaylist(playlist);
    Clipboard.setString(JSON.stringify(playlistInfo));
  };

  const importPlaylist: PlaylistType["importPlaylist"] = async (data) => {
    const parsedData = JSON.parse(data);
    if (
      parsedData.name !== undefined &&
      parsedData.songs !== undefined &&
      typeof parsedData.name === "string" &&
      Array.isArray(parsedData.songs)
    ) {
      const cloneState = JSON.parse(
        (await AsyncStorage.getItem("@playlists")) || "[]"
      );
      let playlistIndex = cloneState.findIndex(
        (value: any) => value.name === parsedData.name
      );
      if (playlistIndex === -1) {
        cloneState.push(parsedData);
        setContext({ playlists: cloneState });
      } else {
        throw new Error(
          `Já existe uma playlist com o nome "${parsedData.name}".`
        );
      }
    } else {
      throw new Error("Não foi possível criar essa playlist.");
    }
  };

  const toggleSongInPlaylist: PlaylistType["toggleSongInPlaylist"] = async (
    song,
    playlist
  ) => {
    const cloneState = state.playlists;
    let playlistIndex = cloneState.findIndex(
      (value) => value.name === playlist
    );
    if (playlistIndex === -1) {
      playlistIndex = cloneState.push({
        name: playlist,
        songs: [song.videoId],
      });
    } else {
      if (
        cloneState[playlistIndex].songs.findIndex(
          (value) => value === song.videoId
        ) !== -1
      ) {
        cloneState[playlistIndex] = {
          name: cloneState[playlistIndex].name,
          songs: cloneState[playlistIndex].songs.filter(
            (value) => value !== song.videoId
          ),
        };
      } else {
        cloneState[playlistIndex] = {
          name: cloneState[playlistIndex].name,
          songs: [...cloneState[playlistIndex].songs, song.videoId],
        };
      }
    }
    await addSongLocal(song);
    setContext({ playlists: cloneState });
  };

  const isSongLiked: PlaylistType["isSongLiked"] = (song) => {
    const index = state.playlists.findIndex(
      (value) => value.name === "Favoritos"
    );
    if (index === -1) return false;
    return state.playlists[index].songs.includes(song.videoId);
  };

  const handlePlayPlaylist: PlaylistType["handlePlayPlaylist"] = async (
    name
  ) => {
    const playlist =
      state.playlists[
        state.playlists.findIndex((value) => value.name === name)
      ];
    if (playlist) {
      const songs: Promise<Track>[] = playlist.songs.map(async (songId) => {
        const song = videos.find(({ videoId }) => videoId === songId);
        const creator = creators.find(
          ({ authorId }) => authorId === song?.authorId
        );
        const fileExists = await RNFS.exists(
          `${RNBackgroundDownloader.directories.documents}/${songId}.mp3`
        );
        return {
          url: fileExists
            ? `${RNBackgroundDownloader.directories.documents}/${songId}.mp3`
            : `https://sm-p3-play-api.vercel.app/api/song/${song!.videoId}`,
          artist: creator?.author,
          title: song!.title,
          artwork: song!.thumbnail,
          description: song!.description,
          date: song!.timestamp,
          extra: song,
          id: `${Math.floor(Math.random() * 100000000000)}`,
        };
      });
      const resolvedSongs = await Promise.all(songs);

      await TrackPlayer.destroy();
      var stateShuffle = null;
      setIsShuffle((state) => {
        stateShuffle = state;
        console.log(`state ${state}`);
        return state;
      });
      console.log(`stateShuffle ${stateShuffle}`);
      await TrackPlayer.add(
        stateShuffle ? shuffle(resolvedSongs) : resolvedSongs
      );
      await TrackPlayer.play();
    }
  };

  const setContext = useCallback(
    (updates) => {
      setState({ ...state, ...updates });
    },
    [state, setState]
  );

  const getContextValue = useCallback(
    () => ({
      ...state,
      setContext,
      isSongLiked,
      handlePlayPlaylist,
      toggleSongInPlaylist,
      createPlaylist,
      deletePlaylist,
      getPlaylist,
      importPlaylist,
      exportPlaylist,
    }),
    [state, setContext]
  );

  return (
    <PlaylistContext.Provider value={getContextValue()}>
      {children}
    </PlaylistContext.Provider>
  );
};

function isOnPlaylist(songId: string, playlistName: string) {
  const { playlists } = usePlaylist();

  return playlists.findIndex((value) => value.name === playlistName) !== -1
    ? playlists[
        playlists.findIndex((value) => value.name === playlistName)
      ].songs.findIndex((value) => value === songId) === -1
      ? false
      : true
    : false;
}

function usePlaylistInfo(name: string) {
  const { playlists, setContext } = usePlaylist();
  const { videos } = usePlayer();

  const setPlaylist = async (newData: string[]) => {
    var cloneState = playlists;
    const index = cloneState.findIndex((value) => value.name === name);
    cloneState[index] = { name: name, songs: newData };
    setContext({ playlists: cloneState });
    await AsyncStorage.setItem("@playlists", JSON.stringify(cloneState));
  };

  return {
    playlist: playlists[playlists.findIndex((value) => value.name === name)]
      ? {
          ...playlists[playlists.findIndex((value) => value.name === name)],
          songs: playlists[
            playlists.findIndex((value) => value.name === name)
          ].songs.map((songId) => ({
            ...videos.find((song) => song.videoId === songId),
          })),
        }
      : ({
          name: "",
          songs: [],
        } as {
          name: string;
          songs: TMinimalInfo[];
        }),
    setPlaylist,
  };
}

function usePlaylist(): PlaylistType {
  const context = useContext(PlaylistContext);

  return context;
}

export { usePlaylist, usePlaylistInfo, isOnPlaylist, PlaylistProvider };

export default PlaylistContext;
