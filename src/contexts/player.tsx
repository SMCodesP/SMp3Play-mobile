import React, {createContext, useContext, useEffect, useState} from 'react';
import type VideoType from '../interfaces/VideoType';
import ytdl from 'react-native-ytdl';
import TrackPlayer from 'react-native-track-player';

type PlayerType = {
  play: (video: VideoType) => Promise<void>;
  track: TrackPlayer.Track | null;
};

const PlayerContext = createContext<PlayerType>({} as PlayerType);

const PlayerProvider: React.FC = ({children}) => {
  const [track, setTrack] = useState<TrackPlayer.Track | null>(null);

  useEffect(() => {
    async function setup() {
      await TrackPlayer.setupPlayer();
      TrackPlayer.updateOptions({
        stopWithApp: true,
        capabilities: [
          TrackPlayer.CAPABILITY_PLAY,
          TrackPlayer.CAPABILITY_PAUSE,
          TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
          TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
          TrackPlayer.CAPABILITY_STOP,
          TrackPlayer.CAPABILITY_SEEK_TO,
        ],
        compactCapabilities: [
          TrackPlayer.CAPABILITY_PLAY,
          TrackPlayer.CAPABILITY_PAUSE,
          TrackPlayer.CAPABILITY_SEEK_TO,
        ],
      });
      TrackPlayer.addEventListener('playback-track-changed', async (data) => {
        const gettingTrack = await TrackPlayer.getTrack(data.nextTrack);
        console.log(gettingTrack);
        setTrack(gettingTrack);
      });
    }
    setup();
  }, []);

  const play: PlayerType['play'] = async (video) => {
    const urls = await ytdl(video.url, {quality: 'highestaudio'});
    await TrackPlayer.add({
      url: urls[0].url,
      artist: video.author.name,
      title: video.title,
      id: video.videoId,
      artwork: video.image,
      description: video.description,
      date: video.timestamp,
    });
    TrackPlayer.play();
  };

  return (
    <PlayerContext.Provider
      value={{
        play,
        track,
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
