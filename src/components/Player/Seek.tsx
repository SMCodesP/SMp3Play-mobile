import React from "react";
import { Slider } from "@miblanchard/react-native-slider";
import { darken, transparentize } from "polished";
import colors from "../../styles/colors";
import TrackPlayer from "react-native-track-player";

const Seek: React.FC<{
  duration: number;
  value: number;
}> = ({ duration, value }) => {
  const slidingStarted = async () => {
    await TrackPlayer.pause();
  };

  const slidingCompleted = async ([value]: any) => {
    await TrackPlayer.seekTo(value);
    await TrackPlayer.play();
  };

  return (
    <Slider
      value={value}
      maximumValue={duration}
      minimumValue={0}
      maximumTrackTintColor={transparentize(0.5, colors.foreground)}
      minimumTrackTintColor={colors.pink}
      thumbTintColor={darken(0.1, colors.pink)}
      trackStyle={{ height: 6 }}
      onSlidingStart={slidingStarted}
      onSlidingComplete={slidingCompleted}
    />
  );
};

export default Seek;
