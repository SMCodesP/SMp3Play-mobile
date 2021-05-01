import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';
import {darken} from 'polished';
import {Animated} from 'react-native';

export const Container = styled.View`
  width: 100%;
  height: 85px;
  background: ${({theme}) => theme.background};
  border-top-width: 1px;
  border-top-color: ${({theme}) => theme.comment};
  padding: 0 15px;
  flex-direction: row;
`;

export const ContainerOptions = styled.View`
  flex: 1;
  justify-content: space-around;
  margin-top: 7px;
  flex-direction: row;
`;

export const Title = styled.Text`
  color: ${({theme}) => theme.foreground};
  font-size: 16px;
  font-weight: bold;
`;

export const Authorname = styled.Text`
  color: ${({theme}) => theme.comment};
  font-weight: bold;
  font-size: 11px;
`;

export const Artwork = styled.Image`
  width: 75px;
  height: 75px;
  align-self: center;
  border-radius: 5px;
  opacity: 0.75;
  margin-right: 5px;
`;

export const ProgessContainer = styled.View`
  height: 1px;
  width: 100%;
  flex-direction: row;
`;
export const ProgessBackground = styled.View`
  background: grey;
`;
export const ProgessSneek = styled.View`
  background: ${({theme}) => theme.pink};
`;

export const TrackItem = styled(RectButton)<{
  active: boolean;
}>`
  flex: 1;
  background: ${({theme, active}) =>
    active ? theme.currentLine : darken(0.1, theme.currentLine)};
  border-radius: 10px;
  margin: 5px 10px;
  height: 75px;
  align-self: center;
  padding: 8px 15px 15px 8px;
`;

export const SongName = styled.Text`
  color: ${({theme}) => theme.foreground};
  font-size: 16px;
`;

export const TrackStatus = styled.Text`
  color: ${({theme}) => theme.foreground};
  align-self: flex-end;
  text-transform: uppercase;
  font-size: 10px;
  font-weight: bold;
`;

export const ButtonRemoveSong = styled(RectButton)`
  background: ${({theme}) => theme.red};
`;

export const ContainerRemoveSong = styled(Animated.View)`
  padding: 0 15px;
  flex: 1;
  margin: 5px 0;
  border-radius: 10px;
  background: ${({theme}) => theme.red};
  align-items: center;
  justify-content: center;
`;

export const DeleteText = styled.Text`
  color: ${({theme}) => darken(0.2, theme.red)};
  font-weight: bold;
  font-size: 16px;
`;

export const TitleLoadingQueue = styled.Text`
  color: ${({theme}) => theme.foreground};
  font-size: 22px;
  font-weight: bold;
  text-align: center;
  margin-top: 25px;
`;
