import React, {createContext, useContext, useEffect} from 'react';
import type VideoType from '../interfaces/VideoType';
import ytdl from 'react-native-ytdl';
import TrackPlayer from 'react-native-track-player';

type PlayerType = {
  play: (video: VideoType) => Promise<void>;
};

const PlayerContext = createContext<PlayerType>({} as PlayerType);

const PlayerProvider: React.FC = ({children}) => {
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
        ],
        compactCapabilities: [
          TrackPlayer.CAPABILITY_PLAY,
          TrackPlayer.CAPABILITY_PAUSE,
        ],
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
