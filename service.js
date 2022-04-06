/**
 * This is the code that will run tied to the player.
 *
 * The code here might keep running in the background.
 *
 * You should put everything here that should be tied to the playback but not the UI
 * such as processing media buttons or analytics
 */

import TrackPlayer, { Event } from "react-native-track-player";
import AsyncStorage from "@react-native-async-storage/async-storage";

module.exports = async function () {
  TrackPlayer.addEventListener(Event.RemotePlay, async () => {
    try {
      await TrackPlayer.play();
    } catch (_) { }
  });

  TrackPlayer.addEventListener(Event.RemotePause, async () => {
    try {
      await TrackPlayer.pause();
    } catch (_) { }
  });

  TrackPlayer.addEventListener(Event.RemoteNext, () => TrackPlayer.skipToNext());

  TrackPlayer.addEventListener(Event.RemotePrevious, () => TrackPlayer.skipToPrevious());

  TrackPlayer.addEventListener(Event.RemoteStop, async (...props) => {
    try {
      TrackPlayer.destroy();
    } catch (_) { }
  });

  TrackPlayer.addEventListener(
    Event.PlaybackTrackChanged,
    async ({ nextTrack }) => {
      if (nextTrack !== undefined && nextTrack !== null) {
        let track = await TrackPlayer.getTrack(nextTrack);

        const jsonValueVideos = await AsyncStorage.getItem("@videos");
        const videos =
          jsonValueVideos != null ? JSON.parse(jsonValueVideos) || [] : [];
        const jsonValueCreators = await AsyncStorage.getItem("@creators");
        const creators =
          jsonValueCreators != null ? JSON.parse(jsonValueCreators) || [] : [];
        const creator = creators.find(
          (creator) => creator.authorId === track.extra.creator.authorId
        ) || track.extra.creator;

        const newCreators = [
          ...new Map(
            [
              {
                authorId: creator.authorId,
                author: creator.author,
                authorUrl: creator.authorUrl,
                authorBanner: creator.authorBanner,
                authorThumbnail: creator.authorThumbnail,
                subscriberCount: creator.subscriberCount,
                description: creator.description,
                isVerified: creator.isVerified,
              },
              ...creators,
            ].map((item) => [item.authorId, item])
          ).values(),
        ];

        const newVideos = [
          ...new Map(
            [
              ...videos,
              {
                ...track.extra,
                videoId: track.extra.videoId,
                updated_at: Date.now(),
              },
            ].map((item) => [item.videoId, item])
          ).values(),
        ];

        await AsyncStorage.setItem("@creators", JSON.stringify(newCreators));
        await AsyncStorage.setItem("@videos", JSON.stringify(newVideos));
      }
    }
  );
};
