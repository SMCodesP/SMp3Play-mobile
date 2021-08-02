/**
 * This is the code that will run tied to the player.
 *
 * The code here might keep running in the background.
 *
 * You should put everything here that should be tied to the playback but not the UI
 * such as processing media buttons or analytics
 */

import TrackPlayer, { Event } from 'react-native-track-player';
import AsyncStorage from '@react-native-async-storage/async-storage';

module.exports = async function () {
  TrackPlayer.addEventListener(Event.RemotePlay, async () => {
    try {
      await TrackPlayer.play();
    } catch (_) {}
  });

  TrackPlayer.addEventListener(Event.RemotePause, async () => {
    try {
      await TrackPlayer.pause();
    } catch (_) {}
  });

  TrackPlayer.addEventListener(Event.RemoteNext, async () => {
    try {
      await TrackPlayer.skipToNext();
    } catch (_) {}
  });

  TrackPlayer.addEventListener(Event.RemotePrevious, async () => {
    try {
      await TrackPlayer.skipToPrevious();
    } catch (_) {}
  });

  TrackPlayer.addEventListener(Event.RemoteStop, async (...props) => {
    try {
      TrackPlayer.destroy();
    } catch (_) {}
  });

  TrackPlayer.addEventListener(Event.PlaybackTrackChanged, async ({ nextTrack }) => {
    if (nextTrack !== undefined && nextTrack !== null) {
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
      await AsyncStorage.setItem('@history', JSON.stringify(newHistory));
    }
  });
};