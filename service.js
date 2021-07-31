/**
 * This is the code that will run tied to the player.
 *
 * The code here might keep running in the background.
 *
 * You should put everything here that should be tied to the playback but not the UI
 * such as processing media buttons or analytics
 */

import TrackPlayer from 'react-native-track-player';
import AsyncStorage from '@react-native-async-storage/async-storage';

module.exports = async function () {
  TrackPlayer.addEventListener('remote-play', async () => {
    try {
      await TrackPlayer.play();
    } catch (_) {}
  });

  TrackPlayer.addEventListener('remote-pause', async () => {
    try {
      await TrackPlayer.pause();
    } catch (_) {}
  });

  TrackPlayer.addEventListener('remote-next', async () => {
    try {
      await TrackPlayer.skipToNext();
    } catch (_) {}
  });

  TrackPlayer.addEventListener('remote-previous', async () => {
    try {
      await TrackPlayer.skipToPrevious();
    } catch (_) {}
  });

  TrackPlayer.addEventListener('remote-stop', async () => {
    try {
      TrackPlayer.destroy();
    } catch (_) {}
  });

  TrackPlayer.addEventListener('playback-track-changed', async ({ nextTrack }) => {
    if (nextTrack) {
      const track = await TrackPlayer.getTrack(nextTrack);
      const jsonValue = await AsyncStorage.getItem('@history');
      const history = jsonValue != null ? JSON.parse(jsonValue) || [] : [];
      const newHistory = [
        ...new Map(
          [
            {
              ...track.extra,
              videoId: track.extra.videoId,
            },
            ...history,
          ].map((item) => [item.videoId, item]),
        ).values(),
      ];
      console.log(newHistory)
      await AsyncStorage.setItem('@history', JSON.stringify(newHistory));
    }
  });
};