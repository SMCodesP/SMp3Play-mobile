import React, {createContext, useContext, useEffect, useState} from 'react';
import TrackPlayer, {
  Capability,
  useTrackPlayerEvents,
  Event,
  Track,
  RepeatMode
} from 'react-native-track-player';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback } from 'react';

type PlayerType = {
  refreshHistory(): Promise<void>;
  toggleRepeat(): Promise<void>;
  refreshQueue(): Promise<void>;
  history: TVideo[];
  queue: Track[];
  track: Track | null;
  repeating: boolean;
};

const PlayerContext = createContext<PlayerType>({} as PlayerType);

const PlayerProvider: React.FC = ({children}) => {
  const [history, setHistory] = useState<TVideo[]>([]);
  const [queue, setQueue] = useState<Track[]>([]);
  const [track, setTrack] = useState<Track | null>(null);
  const [repeating, setRepeating] = useState<boolean>(false);

  useEffect(() => {
    ;(async () => {
      setRepeating(RepeatMode.Queue === await TrackPlayer.getRepeatMode());
      await refreshHistory();
    })();
  }, []);

  const refreshHistory = async () => {
    const jsonValue = await AsyncStorage.getItem('@history');
    setHistory(jsonValue != null ? JSON.parse(jsonValue) || [] : []);
    return;
  }

  const refreshQueue = async () => {
    setQueue(await TrackPlayer.getQueue());
    return;
  }
  
  const toggleRepeat = useCallback(async () => {
    await TrackPlayer.setRepeatMode(!repeating ? RepeatMode.Queue : RepeatMode.Off)
    setRepeating(!repeating)
    return;
  }, [repeating])

  useTrackPlayerEvents(
    [Event.PlaybackTrackChanged, Event.PlaybackQueueEnded],
    async (data) => {
      if (data.type === Event.PlaybackTrackChanged && (data.nextTrack !== undefined && data.nextTrack !== null)) {
        const nextTrack = await TrackPlayer.getTrack(data.nextTrack);
        setTrack(nextTrack || null);
        const currentTrack = await TrackPlayer.getCurrentTrack();
      }
      if (data.type === Event.PlaybackQueueEnded) {
        setTrack(null);
      }
      await refreshHistory()
      await refreshQueue()
    }
  )

  return (
    <PlayerContext.Provider
      value={{
        refreshHistory,
        toggleRepeat,
        refreshQueue,
        history,
        track,
        repeating,
        queue,
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
