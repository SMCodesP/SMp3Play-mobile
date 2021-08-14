import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TrackPlayer, { Track } from "react-native-track-player";

type PlaylistType = {
  toggleLikeSong(song: TMinimalInfo): void;
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

  useEffect(() => {
    (async () => {
      setContext({
        playlists: JSON.parse(
          (await AsyncStorage.getItem("@playlists")) || '[{"name":"Favoritos","songs":[]}]'
        )
      });
    })();
  }, []);

  useEffect(() => {
    ;(async () => {
      await AsyncStorage.setItem("@playlists", JSON.stringify(state.playlists));
    })();
  }, [state]);

  const toggleLikeSong: PlaylistType["toggleLikeSong"] = (song) => {
    const cloneState = state.playlists;
    const favoritesIndex = cloneState.findIndex(
      (value) => value.name === "Favoritos"
    );
    if (cloneState[favoritesIndex].songs.findIndex(value => value.videoId === song.videoId) !== -1) {
      cloneState[favoritesIndex] = {
        name: cloneState[favoritesIndex].name,
        songs: cloneState[favoritesIndex].songs.filter((value) => value.videoId !== song.videoId),
      };
    } else {
      cloneState[favoritesIndex] = {
        name: cloneState[favoritesIndex].name,
        songs: [...cloneState[favoritesIndex].songs, song],
      };
    }
    setContext({ playlists: cloneState })
  }

  const isSongLiked: PlaylistType["isSongLiked"] = (song) => {
    const index = state.playlists.findIndex((value) => value.name === "Favoritos")
    return state.playlists[index].songs.includes(song);
  };

  const handlePlayPlaylist: PlaylistType["handlePlayPlaylist"] = async (
    name
  ) => {
    const playlist = state.playlists[state.playlists.findIndex(value => value.name === name)];
    if (playlist) {
      const songs: Track[] = playlist.songs.map((song) => ({
        url: `https://sm-p3-play-api.vercel.app/api/song/${song.videoId}`,
        artist: song.author.name,
        title: song.title,
        artwork: song.thumbnail,
        description: song.description,
        date: song.timestamp,
        extra: song,
        id: `${Math.floor(Math.random() * 100000000000)}`,
      }));
      await TrackPlayer.destroy();
      await TrackPlayer.add(songs);
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
      toggleLikeSong,
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

function isFavorite(songId: string) {
  const { playlists } = usePlaylist();

  return playlists[playlists.findIndex(value => value.name === "Favoritos")].songs.findIndex((value) => value.videoId === songId) === -1 ? false : true
}

function usePlaylistInfo(name: string) {
  const { playlists, setContext } = usePlaylist();

  const setPlaylist = async (newData: TMinimalInfo[]) => {
    var cloneState = playlists;
    const index = cloneState.findIndex((value) => value.name === name);
    cloneState[index] = { name: name, songs: newData }
    setContext({ playlists: cloneState })
    await AsyncStorage.setItem("@playlists", JSON.stringify(cloneState));
  };

  return { playlist: playlists[playlists.findIndex(value => value.name === name)], setPlaylist }
}

function usePlaylist(): PlaylistType {
  const context = useContext(PlaylistContext);

  return context;
}

export { usePlaylist, usePlaylistInfo, isFavorite, PlaylistProvider };

export default PlaylistContext;
