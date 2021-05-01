import {Animated} from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.View`
  height: 500px;
  background: ${({theme}) => theme.background};
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`;

export const Artwork = styled.Image`
  width: 85%;
  height: 256px;
  margin-top: 5%;
  margin-bottom: 5%;
  border-radius: 25px;
  align-self: center;
`;

export const ContainerAuthor = styled.View`
  width: 85%;
  align-self: center;
`;

export const Authorname = styled.Text`
  color: ${({theme}) => theme.purple};
  opacity: 0.9;
  font-size: 12px;
  font-weight: bold;
`;

export const Title = styled.Text`
  color: ${({theme}) => theme.foreground};
  font-size: 19px;
  font-weight: bold;
  margin: 0;
`;

export const Controller = styled.View`
  width: 75%;
  padding-bottom: 15px;
  flex-direction: row;
  align-self: center;
  align-items: center;
  justify-content: space-around;
`;

export const ListTrack = styled(Animated.FlatList)`
  margin: 25px;
`;

export const TrackItem = styled.View`
  background: ${({theme}) => theme.background};
  width: 100%;
  height: 75px;
  align-self: center;
  margin-bottom: 10px;
`;
