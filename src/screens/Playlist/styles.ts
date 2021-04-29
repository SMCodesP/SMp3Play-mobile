import styled from 'styled-components/native';
import {Animated} from 'react-native';
import {darken} from 'polished';
import {RectButton} from 'react-native-gesture-handler';

export const ContainerBody = styled.View`
  flex: 1;
  margin-top: 32px;
`;

export const ContainerRemoveSong = styled(Animated.View)`
  padding: 0 15px;
  flex: 1;
  background: ${({theme}) => theme.red};
  align-items: center;
  justify-content: center;
  margin: 1px 0;
`;

export const DeleteText = styled.Text`
  color: ${({theme}) => darken(0.2, theme.red)};
  font-weight: bold;
  font-size: 16px;
`;

export const ContainerPlaylist = styled.View`
  background: ${({theme}) => theme.comment};
  position: relative;
`;

export const TrackItem = styled(RectButton)<{
  active: boolean;
}>`
  background: ${({theme, active}) =>
    active ? theme.currentLine : darken(0.1, theme.currentLine)};
  width: 100%;
  height: 75px;
  align-self: center;
  align-items: center;
  justify-content: center;
  padding: 8px 15px 8px 15px;
`;

export const SongName = styled.Text`
  color: ${({theme}) => theme.foreground};
  font-size: 16px;
`;
