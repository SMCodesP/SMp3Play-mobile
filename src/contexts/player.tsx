import React, {createContext, useContext, useEffect, useState} from 'react';
import TrackPlayer, {
  CAPABILITY_PLAY,
  CAPABILITY_PAUSE,
  CAPABILITY_SKIP_TO_NEXT,
  CAPABILITY_SKIP_TO_PREVIOUS,
  CAPABILITY_STOP,
  CAPABILITY_SEEK_TO,
  useTrackPlayerEvents,
  TrackPlayerEvents
} from 'react-native-track-player';
import AsyncStorage from '@react-native-async-storage/async-storage';

type PlayerType = {
  history: TVideo[];
  refreshHistory(): Promise<void>;
  track: TrackPlayer.Track | null;
};

const PlayerContext = createContext<PlayerType>({} as PlayerType);

const PlayerProvider: React.FC = ({children}) => {
  const [history, setHistory] = useState<TVideo[]>([]);
  const [track, setTrack] = useState<TrackPlayer.Track | null>(null);

  useEffect(() => {
    async function setup() {
      await TrackPlayer.setupPlayer({})
      TrackPlayer.updateOptions({
        capabilities: [
          CAPABILITY_PLAY,
          CAPABILITY_PAUSE,
          CAPABILITY_SKIP_TO_NEXT,
          CAPABILITY_SKIP_TO_PREVIOUS,
          CAPABILITY_STOP,
          CAPABILITY_SEEK_TO,
        ],
        compactCapabilities: [
          CAPABILITY_PLAY,
          CAPABILITY_PAUSE,
          CAPABILITY_STOP,
        ],
      })
      await refreshHistory();
    }
    setup();
  }, []);

  const refreshHistory = async () => {
    const jsonValue = await AsyncStorage.getItem('@history');
    setHistory(jsonValue != null ? JSON.parse(jsonValue) || [] : []);
  }

  useTrackPlayerEvents(
    [TrackPlayerEvents.PLAYBACK_TRACK_CHANGED, TrackPlayerEvents.PLAYBACK_QUEUE_ENDED],
    async (data) => {
      if (data.type === TrackPlayerEvents.PLAYBACK_TRACK_CHANGED) {
        const nextTrack = await TrackPlayer.getTrack(data.nextTrack);
        setTrack(nextTrack || null);
      }
      if (data.type === TrackPlayerEvents.PLAYBACK_QUEUE_ENDED) {
        setTrack(null);
      }
    }
  )

  return (
    <PlayerContext.Provider
      value={{
        history,
        refreshHistory,
        track
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
