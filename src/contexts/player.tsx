import React, {createContext, useContext, useEffect, useState} from 'react';
import type VideoType from '../interfaces/VideoType';
import ytdl from 'react-native-ytdl';
import TrackPlayer, {
  useProgress,
  useTrackPlayerEvents,
  Track,
  Capability,
  Event,
} from 'react-native-track-player';

import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';

type PlayerType = {
  play: (video: VideoType) => Promise<void>;
  track: Track | null;
  position: number;
  duration: number;
  queue: Track[];
};

const PlayerContext = createContext<PlayerType>({} as PlayerType);

const PlayerProvider: React.FC = ({children}) => {
  const [track, setTrack] = useState<Track | null>(null);
  const {position, duration} = useProgress(500);
  const [queue, setQueue] = useState<Track[]>([]);

  useTrackPlayerEvents(
    [Event.PlaybackTrackChanged, Event.PlaybackQueueEnded, Event.PlaybackState],
    async (handler) => {
      if (handler.type === Event.PlaybackTrackChanged) {
        if (handler.nextTrack) {
          const gettingTrack = await TrackPlayer.getTrack(handler.nextTrack);
          setTrack(gettingTrack);
        }
      }
      if (handler.type === Event.PlaybackQueueEnded) {
        setTrack(null);
      }
      setQueue(await TrackPlayer.getQueue());
    },
  );

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
    }
    setup();
    return () => {
      setQueue([]);
    };
  }, []);

  const play: PlayerType['play'] = async (video) => {
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
