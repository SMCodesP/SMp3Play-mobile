/* eslint-disable radix */
import React, {useContext} from 'react';
import TrackPlayer from 'react-native-track-player';

import {ThemeContext} from 'styled-components';

import {View} from 'react-native';
import Slider from '@react-native-community/slider';
import {Container, Duration} from './styles';

function formatTime(seconds: number) {
  return seconds > 3600
    ? [
        parseInt(String(seconds / 60 / 60)),
        parseInt(String((seconds / 60) % 60)),
        parseInt(String(seconds % 60)),
      ]
        .join(':')
        .replace(/\b(\d)\b/g, '0$1')
    : [parseInt(String((seconds / 60) % 60)), parseInt(String(seconds % 60))]
        .join(':')
        .replace(/\b(\d)\b/g, '0$1');
}

export default function TrackStatus({positionDisplay, duration}: any) {
  const theme = useContext(ThemeContext);

  return (
    <View>
      <Container>
        <Duration>{formatTime(positionDisplay)}</Duration>
        <Slider
          minimumValue={0}
          maximumValue={duration}
          thumbTintColor={theme.fifthText}
          minimumTrackTintColor={theme.fifthText}
          maximumTrackTintColor={theme.primary}
          step={1}
          disabled={false}
          onTouchMove={async () => await TrackPlayer.pause()}
          onSlidingComplete={async (val) => {
            await TrackPlayer.seekTo(val);
            await TrackPlayer.play();
            console.log('Complet: ' + val);
          }}
          value={positionDisplay}
          style={{width: '75%', height: 45}}
        />
        <Duration>{formatTime(duration)}</Duration>
      </Container>
    </View>
  );
}
